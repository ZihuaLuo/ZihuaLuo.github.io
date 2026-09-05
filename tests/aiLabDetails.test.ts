import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const showcase = readFileSync(new URL("../src/components/ai/AILabShowcase.astro", import.meta.url), "utf8");
const scene = readFileSync(new URL("../src/scripts/aiLabConstellation.ts", import.meta.url), "utf8");

test("all three project cards retain their titles and share a coming-soon message", () => {
  assert.deepEqual([...showcase.matchAll(/title: "([^"]+)"/g)].map((match) => match[1]),
    ["Agent Research Workflow", "Volunteer Retention Lab", "Disclosure Intelligence"]);
  assert.match(showcase, /data-detail-title>\{projects\[0\]\.title\}/);
  assert.match(scene, /if \(title\) title\.textContent = project\.title/);
  assert.match(showcase, />COMING SOON<\/p>/);
  assert.match(showcase, />Project details will be updated here\.<\/p>/);
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
