import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { computeConstellationLayout, CONSTELLATION_CAMERA_FOV } from "../src/scripts/aiLabLayout.ts";

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
  assert.ok(CONSTELLATION_CAMERA_FOV >= 30 && CONSTELLATION_CAMERA_FOV <= 45);
  assert.match(scene, /new THREE\.PerspectiveCamera\(CONSTELLATION_CAMERA_FOV, 1, 0\.1, 100\)/);
  assert.doesNotMatch(scene, /new THREE\.OrthographicCamera/);
  const depths = computeConstellationLayout(4, 600, 520, false).targets.map((target) => target.z);
  assert.equal(depths.length, 4);
  assert.equal(new Set(depths).size, 4);
  assert.ok(Math.max(...depths) - Math.min(...depths) >= 0.4);
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
  assert.match(scene, /candidate\.mesh\.material = bloomOccluderMaterial/);
  assert.match(scene, /bloomOccluders\.forEach/);
  assert.equal((scene.match(/scene\.traverse\(/g) ?? []).length, 1);
});

test("depth pass preserves the bloom thresholds and accretion stream count", () => {
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
  assert.match(scene, /LensedRearDiskLayer/);
});
