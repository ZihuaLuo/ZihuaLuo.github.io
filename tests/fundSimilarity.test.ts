import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { searchProjects } from "../src/data/searchProjects.ts";

const data = JSON.parse(readFileSync(new URL("../src/data/fundSimilarity.json", import.meta.url), "utf8"));

test("both RA5 cluster representations reconcile to the same fund and vehicle population", () => {
  assert.equal(data.meta.commonRecords, 6863);
  assert.equal(data.meta.commonMonths, 120);
  assert.equal(data.models.length, 2);
  for (const model of data.models) {
    assert.equal(model.clusters.length, 4);
    assert.equal(model.clusters.reduce((sum: number, c: {records: number}) => sum + c.records, 0), 6863);
    for (const [vehicle, expected] of Object.entries(data.meta.vehicles)) {
      assert.equal(model.clusters.reduce((sum: number, c: {vehicles: Record<string, number>}) => sum + c.vehicles[vehicle], 0), expected);
    }
    for (const c of model.clusters) {
      assert.equal(c.vehicles.MF + c.vehicles.ETF, c.records);
      const quantiles = [c.mvr.p10, c.mvr.p25, c.mvr.median, c.mvr.p75, c.mvr.p90];
      assert.deepEqual(quantiles, [...quantiles].sort((a, b) => a - b));
    }
  }
  // Independent spot checks against the delivered aggregate CSV.
  assert.equal(data.models[0].clusters[0].records, 631);
  assert.equal(data.models[0].clusters[0].vehicles.ETF, 44);
  assert.ok(Math.abs(data.models[0].clusters[0].mvr.median - 0.21777443914796427) < 1e-12);
  assert.equal(data.models[1].clusters[3].records, 300);
});

test("calendar comparison retains both representations and empirical intervals for all block lengths", () => {
  assert.equal(data.stability.length, 6);
  for (const block of [3, 6, 12]) {
    assert.deepEqual(data.stability.filter((r: {blockMonths: number}) => r.blockMonths === block).map((r: {scheme: string}) => r.scheme).sort(), ["M2", "M2S_A10"]);
  }
  for (const r of data.stability) {
    assert.equal(r.replicates, 100);
    assert.ok(r.p10 <= r.median && r.median <= r.p90);
  }
  assert.ok(Math.abs(data.stability.find((r: {blockMonths: number; scheme: string}) => r.blockMonths === 6 && r.scheme === "M2").median - 0.26565378246574994) < 1e-12);
});

test("RA5 publication ships only small aggregate data and exposes a searchable direct dashboard", () => {
  const serialized = JSON.stringify(data);
  assert.ok(serialized.length < 15000);
  assert.doesNotMatch(serialized, /fund_name|fund_id|ticker|portfolio_label|\\Users\\|base64|packed-data/i);
  assert.ok(data.sources.every((s: {sha256: string; rows: number}) => /^[a-f0-9]{64}$/.test(s.sha256) && s.rows <= 16));
  const project = searchProjects.find((p) => p.id === "fund-similarity");
  assert.ok(project?.aliases.includes("RA5"));
  assert.equal(project?.direct?.url, "/projects/fund-similarity-dashboard/");
  assert.equal(searchProjects.find((p) => p.id === "disclosure-intelligence"), undefined);
});
