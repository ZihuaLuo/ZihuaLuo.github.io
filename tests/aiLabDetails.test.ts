import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const showcase = readFileSync(new URL("../src/components/ai/AILabShowcase.astro", import.meta.url), "utf8");
const scene = readFileSync(new URL("../src/scripts/aiLabConstellation.ts", import.meta.url), "utf8");

test("the Canadian electricity planet shows one overview preview and links to the full dashboard", () => {
  assert.deepEqual([...showcase.matchAll(/title: "([^"]+)"/g)].map((match) => match[1]),
    ["Canadian Electricity Research", "Volunteer Retention Lab", "Fund Similarity Research", "Cloudline", "Finance PhD Time-to-Degree", "Corporate Scandal Research", "Non-Compete 10-K Research"]);
  assert.match(showcase, /data-detail-title>\{projects\[0\]\.title\}/);
  assert.match(scene, /if \(title\) title\.textContent = project\.title/);
  assert.match(showcase, /data-detail-project="canadian-electricity"/);
  assert.match(showcase, /canadian-electricity-dashboard-overview\.png/);
  assert.equal((showcase.match(/<img\b/g) || []).length, 7);
  assert.match(showcase, /\/projects\/canadian-provincial-electricity-dashboard\.html/);
  assert.match(scene, /detail\.dataset\.detailProject !== \(\["canadian-electricity", "retention-lab", "fund-similarity", "cloudline", "finance-phd-eda", "corporate-scandal", "noncompete-10k"\]/);
  assert.match(showcase, />COMING SOON<\/p>/);
  assert.match(showcase, />Project details will be updated here\.<\/p>/);
});

test("Corporate Scandal links to an aggregate-only dashboard and reconciles its charts", () => {
  const data = JSON.parse(readFileSync(new URL("../src/data/corporateScandal.json", import.meta.url), "utf8"));
  const page = readFileSync(new URL("../src/pages/projects/corporate-scandal-dashboard.astro", import.meta.url), "utf8");
  const preview = readFileSync(new URL("../public/images/corporate-scandal-overview.svg", import.meta.url), "utf8");
  assert.match(showcase, /data-detail-project="corporate-scandal"/);
  assert.match(showcase, /\/projects\/corporate-scandal-dashboard\//);
  assert.match(showcase, /corporate-scandal-overview\.svg/);
  assert.match(page, /Aggregate views only/);
  assert.match(preview, /Corporate Scandal Response Dashboard overview/);
  assert.equal(data.meta.cases, 130);
  assert.equal(data.meta.codedRecords, 678);
  assert.equal(data.categories.reduce((sum: number, row: {cases: number}) => sum + row.cases, 0), data.meta.cases);
  assert.equal(data.categories.reduce((sum: number, row: {records: number}) => sum + row.records, 0), data.meta.codedRecords);
  assert.equal(data.actions.reduce((sum: number, row: {records: number}) => sum + row.records, 0), data.meta.codedRecords);
  assert.equal(data.annual.reduce((sum: number, row: {records: number}) => sum + row.records, 0), data.meta.datedRecords);
  assert.doesNotMatch(JSON.stringify(data), /"(?:company|gvkey|description|case|journal|article)":/i);
});

test("Non-Compete planet opens an aggregate dashboard backed by reconciled annotation counts", () => {
  const data = JSON.parse(readFileSync(new URL("../src/data/noncompete.json", import.meta.url), "utf8"));
  const page = readFileSync(new URL("../src/pages/projects/noncompete-10k-dashboard.astro", import.meta.url), "utf8");
  const preview = readFileSync(new URL("../public/images/noncompete-10k-overview.svg", import.meta.url), "utf8");
  assert.match(showcase, /data-detail-project="noncompete-10k"/);
  assert.match(showcase, /\/projects\/noncompete-10k-dashboard\//);
  assert.match(showcase, /noncompete-10k-overview\.svg/);
  assert.match(page, /Aggregate views only/);
  assert.match(preview, /Non-Compete 10-K Coding Dashboard overview/);
  assert.equal(data.periods.reduce((total: number, row: {filings: number}) => total + row.filings, 0), data.meta.filings);
  assert.equal(data.periods.reduce((total: number, row: {annotationRows: number}) => total + row.annotationRows, 0), data.meta.annotationRows);
  assert.equal(data.annual.reduce((total: number, row: {filings: number}) => total + row.filings, 0), data.meta.filings);
  assert.doesNotMatch(JSON.stringify(data), /"(?:file|comment|keyword|passage|company|person)":/i);
});

test("Finance PhD planet links to the standalone public-safe analysis report", () => {
  const report = readFileSync(new URL("../src/assets/finance-phd-eda-report.html", import.meta.url), "utf8");
  const preview = readFileSync(new URL("../public/images/finance-phd-eda-overview.svg", import.meta.url), "utf8");
  assert.match(showcase, /data-detail-project="finance-phd-eda"/);
  assert.match(showcase, /\/projects\/finance-phd-eda-report\.html/);
  assert.match(showcase, /finance-phd-eda-overview\.svg/);
  assert.match(report, /Finance PhD Time-to-Degree Exploratory Analysis/);
  assert.match(report, /public charts and tables omit student and supervisor names/i);
  assert.doesNotMatch(report, /<script[^>]+src=/i);
  assert.match(preview, /1,900/);
});

test("volunteer retention exposes only an illustrative overview without access to private data", () => {
  const preview = readFileSync(new URL("../public/images/volunteer-retention-overview.svg", import.meta.url), "utf8");
  const detail = showcase.match(/data-detail-project="retention-lab"[\s\S]*?(?=<div class="ai-lab__project-detail")/)?.[0];
  assert.ok(detail);
  assert.match(detail, /volunteer-retention-overview\.svg/);
  assert.match(detail, /PRIVATE DATA · OVERVIEW ONLY/);
  assert.match(detail, /The source dashboard and underlying data are private/);
  assert.match(detail, /full dashboard cannot be shown publicly/);
  assert.doesNotMatch(detail, /<a\b|<iframe\b|Data Dashboard\.html/);
  assert.match(scene, /context\.fillText\("PRIVATE DATA", centerX, 578, 520\)/);
  assert.match(preview, /ILLUSTRATIVE PREVIEW/);
  assert.match(preview, /DATA WITHHELD/);
  assert.doesNotMatch(preview, /Food Bank|57\.0%|1,553|<script\b/i);
});

test("Cloudline planet links to a self-contained playable game and shows one real overview", () => {
  const game = readFileSync(new URL("../src/assets/cloudline.html", import.meta.url), "utf8");
  assert.match(showcase, /data-detail-project="cloudline"/);
  assert.match(showcase, /\/projects\/cloudline\.html/);
  assert.match(showcase, /cloudline-overview\.png/);
  assert.match(game, /id="cloudline-game"/);
  assert.match(game, /Three\.js r160\.1, MIT license, bundled/);
  assert.doesNotMatch(game, /<script[^>]+src=/i);
  assert.doesNotMatch(game, /https:\/\/cdn\.jsdelivr\.net|https:\/\/cdnjs\.cloudflare\.com/);
});

test("outdated descriptions, technologies, metrics and verification claims are not shipped in the cards", () => {
  assert.doesNotMatch(showcase, /\b(?:statement|summary|detail|tags|metric):/);
  assert.doesNotMatch(showcase + scene, /data-detail-(?:number|category|statement|summary|copy|metric|tags)|data-project-(?:statement|summary|tags|metric)|PROJECT FILE \/ VERIFIED/);
});

test("project selection, accessible dialog and close handling remain available", () => {
  assert.match(showcase, /role="dialog" aria-modal="true" aria-labelledby="ai-lab-detail-title"/);
  assert.match(showcase, /data-detail-close>Close<\/button>/);
  assert.match(scene, /fillDetailPanel\(planetSystems\[index\]\.definition\)/);
  assert.match(scene, /closeButton\.addEventListener\("click", closeProject, eventOptions\)/);
  assert.match(scene, /selectProject\(projectIndex, false\)/);
});

test("closing a pointer-opened card does not reveal clipped keyboard controls", () => {
  assert.match(scene, /let projectTrigger: HTMLElement = canvas/);
  assert.match(scene, /selectProject\(index, true, button\)/);
  assert.match(scene, /projectTrigger\.focus\(\{ preventScroll: true \}\)/);
  assert.doesNotMatch(scene, /selectedButton\?\.focus/);
});
