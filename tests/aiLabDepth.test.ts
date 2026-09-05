import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// Structural regression guards complement the browser's real WebGL shader/interaction checks.
const scene = readFileSync(new URL("../src/scripts/aiLabConstellation.ts", import.meta.url), "utf8") + readFileSync(new URL("../src/scripts/aiLabShaders.ts", import.meta.url), "utf8");
const projects = readFileSync(new URL("../src/components/ai/AILabShowcase.astro", import.meta.url), "utf8");
const section = readFileSync(new URL("../src/components/AISection.astro", import.meta.url), "utf8");

test("black hole and backdrop are present before the scan without an entrance reveal", () => {
  const initialScene = scene.slice(scene.indexOf("const singularity = createSingularity();"), scene.indexOf("const planetSystems:"));
  assert.match(initialScene, /singularity\.root\.scale\.setScalar\(1\.02\)/);
  assert.equal((scene.match(/singularity\.root\.scale\.setScalar\(/g) ?? []).length, 1);
  assert.doesNotMatch(scene, /singularityReveal/);
  assert.match(section, /<div>\s*<AILabShowcase\s*\/>\s*<\/div>/);
  // Scanning still waits for the lab to enter view and cannot replay on re-entry.
  assert.match(scene, /if \(sequenceStart >= 0\) return;/);
  assert.match(scene, /if \(entries\.some\(\(entry\) => entry\.isIntersecting\)\)\s*\{\s*startSequence\(\);\s*animation\?\.invalidate\(\);\s*observer\.disconnect\(\);/);
});

test("background keeps scattered stars without decorative orbital fields or scan circles", () => {
  assert.doesNotMatch(scene, /createSystemField|createGalaxyBridge|singularity\.field|root\.add\(field\)/);
  const singularity = scene.slice(scene.indexOf("const createSingularity ="), scene.indexOf("const initializeLab ="));
  assert.doesNotMatch(singularity, /RingGeometry\(radius, radius \+ 0\.006/);
  assert.match(projects, /<div class="ai-lab__scan" aria-hidden="true"><\/div>/);
  assert.doesNotMatch(projects, /\.ai-lab__scan span/);
  assert.match(projects, /\.ai-lab__scan::after/);
  assert.match(scene, /deepLayer\.add\(farStars\)/);
  assert.match(scene, /midLayer\.add\(midDust\)/);
  assert.match(scene, /foregroundLayer\.add\(foregroundDust\)/);
  // Local project rings and the actual black hole remain intact.
  assert.match(scene, /createDashedOrbit\(1\.75, primary\)/);
  assert.match(singularity, /TiltedAccretionDisk/);
  assert.match(singularity, /EventHorizon/);
});

test("celestial camera uses moderate perspective, with distinct project Z planes", () => {
  assert.match(scene, /new THREE\.PerspectiveCamera\(36, 1, 0\.1, 100\)/);
  assert.doesNotMatch(scene, /new THREE\.OrthographicCamera/);
  const depths = [...projects.matchAll(/position: \[[-\d.]+, [-\d.]+, ([-\d.]+)\]/g)].map((match) => Number(match[1]));
  assert.equal(depths.length, 3);
  assert.equal(new Set(depths).size, 3);
  assert.ok(Math.max(...depths) - Math.min(...depths) >= 1);
});

test("planet and horizon stay opaque and occlude the selective bloom pass", () => {
  const surface = scene.slice(scene.indexOf("const coreMaterial ="), scene.indexOf("const textTexture ="));
  assert.match(surface, /transparent: false/);
  assert.match(surface, /depthTest: true/);
  assert.match(surface, /depthWrite: true/);
  assert.match(surface, /bloomOccluder = true/);
  const horizon = scene.slice(scene.indexOf("new THREE.SphereGeometry(0.3,"), scene.indexOf("const photonMaterial"));
  assert.match(horizon, /transparent: false/);
  assert.match(horizon, /depthWrite: true/);
  assert.match(scene, /object\.material = bloomOccluderMaterial/);
  assert.match(scene, /bloomOccluders\.forEach/);
});

test("depth pass preserves the restrained particle and bloom budgets", () => {
  const starCounts = [...scene.matchAll(/createBackgroundLayer\((\d+),/g)].map((match) => Number(match[1]));
  assert.deepEqual(starCounts, [390, 140, 24]);
  assert.match(scene, /bloomPass\.strength = 0\.22/);
  assert.match(scene, /bloomPass\.threshold = 0\.88/);
  assert.match(scene, /const count = 42;/);
});

test("rings use volumetric geometry and camera-relative front/rear attenuation", () => {
  assert.match(scene, /new THREE\.TorusGeometry\(1\.465, 0\.325, 12, 320\)/);
  assert.match(scene, /ribbonGeometry\.scale\(1, 1, 0\.07\)/);
  assert.match(scene, /mix\(0\.38, 1\.0, front\)/);
  assert.doesNotMatch(scene, /system\.ringRoot\.rotation\.[xyz]\s*\+=/);
  assert.match(scene, /dFdx\(height\)/);
  assert.match(scene, /float roughness = mix\(0\.8, 0\.56/);
});

test("black-hole disk retains its tilted plane instead of tumbling over time", () => {
  assert.match(scene, /disk\.rotation\.x = THREE\.MathUtils\.degToRad\(-66\)/);
  assert.doesNotMatch(scene, /singularity\.disk\.rotation\.[xyz]\s*\+=/);
  assert.match(scene, /LensedRearDiskLayer/);
});
