"""Render the public aggregate dashboard preview as a standalone SVG."""

from __future__ import annotations

import json
from pathlib import Path
import sys
from xml.sax.saxutils import escape


def main(source: Path, destination: Path) -> None:
    data = json.loads(source.read_text(encoding="utf-8"))
    meta = data["meta"]
    annual = {year: 0 for year in range(1998, 2025)}
    for item in data["annual"]:
        if item["year"] in annual:
            annual[item["year"]] += item["records"]
    max_year = max(annual.values())

    parts = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-labelledby="title desc">',
        '<title id="title">Corporate Scandal Response Dashboard overview</title>',
        '<desc id="desc">Aggregate research overview with case and record totals, an annual coding chart, top scandal categories, and response actions.</desc>',
        '<rect width="1600" height="900" fill="#f4f7f6"/>',
        '<rect x="38" y="30" width="1524" height="230" rx="22" fill="#102d3a"/>',
        '<text x="78" y="78" fill="#9bdbd3" font-family="Arial,sans-serif" font-size="19" font-weight="700" letter-spacing="4">RESEARCH VISUALIZATION</text>',
        '<text x="78" y="143" fill="#ffffff" font-family="Georgia,serif" font-size="53" font-weight="700">Corporate Scandal</text>',
        '<text x="78" y="204" fill="#f0c39e" font-family="Georgia,serif" font-size="53" font-style="italic">Response Dashboard</text>',
        '<text x="1110" y="95" fill="#b7d4d3" font-family="Arial,sans-serif" font-size="20">1989–2024</text>',
        '<text x="1110" y="135" fill="#b7d4d3" font-family="Arial,sans-serif" font-size="20">AGGREGATE VIEWS ONLY</text>',
    ]

    cards = [
        (38, "CASES", meta["cases"], "Distinct case IDs"),
        (427, "CODED RECORDS", meta["codedRecords"], "Multiple per case"),
        (816, "ACTION LABELS", meta["classifiedRecords"], "Excludes unclassified"),
        (1205, "COMPANIES", meta["companies"], "Full workbook coverage"),
    ]
    for x, label, count, sub in cards:
        parts.extend([
            f'<rect x="{x}" y="280" width="357" height="145" rx="15" fill="#ffffff" stroke="#d9e3e6"/>',
            f'<text x="{x+24}" y="317" fill="#627581" font-family="Arial,sans-serif" font-size="16" font-weight="700" letter-spacing="1">{label}</text>',
            f'<text x="{x+24}" y="375" fill="#087f81" font-family="Georgia,serif" font-size="52" font-weight="700">{count:,}</text>',
            f'<text x="{x+24}" y="406" fill="#6f8088" font-family="Arial,sans-serif" font-size="15">{sub}</text>',
        ])

    panel_specs = [(38, 775, "Coded records by year", "1998–2024"), (832, 360, "Cases by category", "Distinct cases"), (1211, 351, "Response action mix", "Coded entries")]
    for x, width, label, subtitle in panel_specs:
        parts.extend([
            f'<rect x="{x}" y="445" width="{width}" height="415" rx="15" fill="#ffffff" stroke="#d9e3e6"/>',
            f'<text x="{x+25}" y="492" fill="#182d3b" font-family="Georgia,serif" font-size="25" font-weight="700">{label}</text>',
            f'<text x="{x+25}" y="519" fill="#627581" font-family="Arial,sans-serif" font-size="15">{subtitle}</text>',
        ])

    left, top, width, height = 91, 555, 675, 225
    for level in (0, 20, 40, 60, 80):
        y = top + height - level / 80 * height
        parts.append(f'<line x1="{left}" y1="{y:.1f}" x2="{left+width}" y2="{y:.1f}" stroke="#e2ebea"/>')
        parts.append(f'<text x="{left-15}" y="{y+5:.1f}" text-anchor="end" fill="#7b8b93" font-family="Arial,sans-serif" font-size="14">{level}</text>')
    slot = width / len(annual)
    for index, (year, count) in enumerate(annual.items()):
        bar_height = count / max(80, max_year) * height
        x = left + index * slot + slot * .16
        y = top + height - bar_height
        parts.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{slot*.68:.1f}" height="{bar_height:.1f}" rx="3" fill="#38a7a6"/>')
        if index % 5 == 0 or year == 2024:
            parts.append(f'<text x="{x+slot*.34:.1f}" y="806" text-anchor="middle" fill="#647985" font-family="Arial,sans-serif" font-size="14">{year}</text>')

    def bars(entries: list[dict], x: int, y: int, available: int, field: str, color: str, short: bool = False) -> None:
        maximum = entries[0][field]
        for index, entry in enumerate(entries):
            ypos = y + index * 48
            label = entry["name"]
            if short:
                label = {
                    "Settlement & Corrective Measures": "Settlement + corrective",
                    "Public Acknowledgement / Apology": "Public acknowledgement",
                }.get(label, label)
            label = escape(label)
            parts.append(f'<text x="{x}" y="{ypos}" fill="#284653" font-family="Arial,sans-serif" font-size="14" font-weight="700">{label}</text>')
            parts.append(f'<rect x="{x}" y="{ypos+9}" width="{available}" height="11" rx="5" fill="#e9f0f0"/>')
            parts.append(f'<rect x="{x}" y="{ypos+9}" width="{available*entry[field]/maximum:.1f}" height="11" rx="5" fill="{color}"/>')
            parts.append(f'<text x="{x+available+8}" y="{ypos+20}" fill="#284653" font-family="Arial,sans-serif" font-size="14" font-weight="700">{entry[field]}</text>')

    bars(data["categories"][:6], 857, 558, 265, "cases", "#38a7a6")
    bars(data["actions"][:6], 1236, 558, 244, "records", "#de9771", True)
    parts.append('</svg>')
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text("\n".join(parts), encoding="utf-8")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("Expected aggregate JSON and output SVG paths")
    main(Path(sys.argv[1]), Path(sys.argv[2]))
