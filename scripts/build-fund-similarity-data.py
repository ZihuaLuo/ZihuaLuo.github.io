"""Extract reviewed aggregate outputs; never copy the source fund-level library."""
import argparse
import base64
import csv
import gzip
import hashlib
import io
import json
from pathlib import Path
import re


def read_csv(path):
    return list(csv.DictReader(io.StringIO(path.read_text(encoding="utf-8-sig"))))


def extract(source):
    dashboard = source / "Maheu_Research_Dashboard.htm"
    html = dashboard.read_text(encoding="utf-8")

    def embedded(element):
        match = re.search(r'<script[^>]+id="' + element + r'"[^>]*>(.*?)</script>', html, re.S)
        if not match:
            raise ValueError(f"Missing embedded {element}")
        return json.loads(match.group(1))

    metadata = embedded("meta-data")
    packed = embedded("packed-data")
    coverage_table = next(t for t in metadata["tables"] if t["id"] == "table01")
    coverage = dict(coverage_table["rows"][1:])
    populations = next(t for t in metadata["tables"] if t["id"] == "table02")["rows"][1:]
    common_population = next(r for r in populations if r[0] == "CW120")
    provenance = []

    def rows(filename, embedded_csv=False):
        if embedded_csv:
            item = next(d for d in metadata["datasets"] if d["filename"] == filename)
            content = gzip.decompress(base64.b64decode(packed[item["id"]]))
            result = list(csv.DictReader(io.StringIO(content.decode("utf-8-sig"))))
        else:
            content = (source / filename).read_bytes()
            result = read_csv(source / filename)
        provenance.append({"filename": filename, "sha256": hashlib.sha256(content).hexdigest(), "rows": len(result)})
        return result

    profiles = rows("Historical_Cluster_Profiles.csv")
    composition = rows("Vehicle_Composition.csv")
    vehicles = rows("Vehicle_Overview.csv", True)
    resampling = rows("Maheu_Calendar_Resampling_Comparison.csv", True)
    vehicle_counts = {r["vehicle"]: int(r["n_records"]) for r in vehicles}
    assert vehicle_counts == {"MF": 5980, "ETF": 883}
    common_count = sum(vehicle_counts.values())
    assert int(common_population[1].replace(",", "")) == common_count
    assert "120" in common_population[2] and "2016" in common_population[2] and "2026" in common_population[2]
    assert coverage["Calendar span"] == "Jan 2005–Jun 2026"
    models = []
    for model_id, label, representation in [
        ("KM_M2", "Mean & volatility", "M2"),
        ("KM_SHAPE", "With quantile shape", "M2S_A10"),
    ]:
        clusters = []
        for row in profiles:
            if row["spec_id"] != model_id:
                continue
            label_counts = {r["vehicle"]: int(r["n_group_vehicle"]) for r in composition
                            if r["spec_id"] == model_id and r["display_group"] == row["display_group"]}
            n = int(row["n_records"])
            assert sum(label_counts.values()) == n
            assert label_counts == {"MF": int(row["n_MF"]), "ETF": int(row["n_ETF"])}
            clusters.append({
                "label": row["display_group"], "records": n, "vehicles": label_counts,
                "mean": float(row["mean_monthly_median"]), "sd": float(row["sd_monthly_median"]),
                "mvr": {q: float(row[f"mvr_{q}"]) for q in ["p10", "p25", "median", "p75", "p90"]},
            })
        assert len(clusters) == 4 and sum(r["records"] for r in clusters) == common_count
        assert {v: sum(c["vehicles"][v] for c in clusters) for v in vehicle_counts} == vehicle_counts
        models.append({"id": model_id, "label": label, "representation": representation, "clusters": clusters})
    stability = [{"blockMonths": int(r["block_months"]), "scheme": r["scheme"],
                  "replicates": int(r["n_replicates"]),
                  "p10": float(r["ARI_to_original_P10"]), "median": float(r["ARI_to_original_P50"]),
                  "p90": float(r["ARI_to_original_P90"])} for r in resampling]
    assert len(stability) == 6
    for row in stability:
        assert row["p10"] <= row["median"] <= row["p90"] and row["replicates"] == 100
    return {
        "meta": {
            "title": "Historical Similarity among Mutual Funds and ETFs",
            "completed": "2026-10-18",
            "historicalRecords": int(coverage["Fund records"].replace(",", "")),
            "observedReturns": int(coverage["Observed monthly returns"].replace(",", "")),
            "historicalStart": "2005-01", "historicalEnd": "2026-06", "commonRecords": common_count,
            "commonMonths": 120, "commonStart": "2016-07", "commonEnd": "2026-06",
            "vehicles": vehicle_counts,
            "sourceDashboardSha256": hashlib.sha256(dashboard.read_bytes()).hexdigest(),
        },
        "models": models, "stability": stability, "sources": provenance,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", required=True, type=Path, help="Local RA5 Deliverable directory")
    parser.add_argument("--output", type=Path, default=Path(__file__).resolve().parents[1] / "src/data/fundSimilarity.json")
    args = parser.parse_args()
    snapshot = extract(args.source)
    args.output.write_text(json.dumps(snapshot, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Saved {len(snapshot['models'])} model profiles and {len(snapshot['stability'])} aggregate resampling rows.")
