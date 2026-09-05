import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const showcase = readFileSync(new URL("../src/components/ai/AILabShowcase.astro", import.meta.url), "utf8");
const scene = readFileSync(new URL("../src/scripts/aiLabConstellation.ts", import.meta.url), "utf8");

test("top-right status starts stable and permits only two concise labels", () => {
  assert.match(showcase, /class="ai-lab__status" data-lab-status>STABLE<\/span>/);
  assert.match(scene, /const setStatus = \(value: "SCANNING" \| "STABLE"\)/);
  assert.deepEqual([...scene.matchAll(/setStatus\("([^"]+)"\)/g)].map((match) => match[1]),
    ["STABLE", "SCANNING", "STABLE"]);
  assert.doesNotMatch(scene + showcase, /SINGULARITY \/ STABLE|SCANNING \/ (?:PLANET|DEEP SPACE)|AWAITING SIGNAL/);
});

test("scanning is limited to the one-shot sequence, including reduced-motion handling", () => {
  const start = scene.slice(scene.indexOf("const startSequence ="), scene.indexOf("const render ="));
  assert.match(start, /if \(sequenceStart >= 0\) return/);
  assert.match(start, /if \(reduceMotion\) \{\s+setStatus\("STABLE"\)/);
  assert.match(start, /else \{\s+setStatus\("SCANNING"\)/);
  assert.match(scene, /if \(elapsedMs >= LAB_SCAN_DURATION_MS && !stableAnnounced\) \{\s+stableAnnounced = true;\s+lab\.dataset\.labStage = "galaxy";\s+setStatus\("STABLE"\)/);
});

test("both labels share the enlarged type and a persistent chatbot-style dot", () => {
  assert.match(showcase, /\.ai-lab__status \{[^}]*font-size: 0\.56rem;[^}]*white-space: nowrap;/s);
  assert.match(showcase, /\.ai-lab__status::before \{[^}]*width: 0\.36rem;[^}]*border-radius: 50%;[^}]*background: #22d3ee;/s);
  // The marker is CSS-generated, so updating textContent cannot erase it.
  assert.match(scene, /status\.textContent = value/);
});

test("decorative corner and center copy is removed while status stays top-right", () => {
  assert.doesNotMatch(showcase + scene,
    /SYSTEM INDEX|ai-lab__index|DEEP SPACE ENGINE|SYSTEM STATUS|PROJECTS ONLINE|SCANNING DEEP SPACE|DRAG TO EXPLORE|data-lab-instruction|ai-lab__instruction|ai-lab__system-footer/);
  assert.match(showcase, /\.ai-lab__telemetry \{[^}]*inset: 0\.9rem 1rem auto;[^}]*justify-content: flex-end;/s);
  assert.match(showcase, /data-lab-status/);
  assert.match(showcase, /Open project: \{project\.title\}/);
});
