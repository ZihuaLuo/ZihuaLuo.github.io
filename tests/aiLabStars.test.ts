import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const scene = readFileSync(new URL("../src/scripts/aiLabConstellation.ts", import.meta.url), "utf8") + readFileSync(new URL("../src/scripts/aiLabShaders.ts", import.meta.url), "utf8");
const showcase = readFileSync(new URL("../src/components/ai/AILabShowcase.astro", import.meta.url), "utf8");

test("card grows one size into the desktop gutter and stays within mobile width", () => {
  assert.match(showcase, /width: min\(108%, 40rem\)/);
  assert.match(showcase, /@media \(max-width: 1040px\) \{\s*\.ai-lab \{ width: min\(100%, 40rem\);/);
  assert.match(showcase, /\.ai-lab__viewport \{ aspect-ratio: 0\.84;/);
});

test("sparse distant stars twinkle independently without adding particles or foreground flashes", () => {
  assert.match(scene, /const brightStar = depth < -3 && index % 13 === 0/);
  assert.deepEqual([...scene.matchAll(/createBackgroundLayer\((\d+),/g)].map((match) => Number(match[1])), [390, 140, 24]);
  assert.match(scene, /sin\(uTime \* \(1\.8 \+ seed \* 1\.1\) \+ seed \* 6\.283185\)/);
  assert.match(scene, /step\(0\.18, aSize\) \* step\(0\.42, seed\) \* uTwinkle/);
  assert.match(scene, /mix\(0\.08, 3\.0, smoothstep\(0\.58, 0\.94, wave\)\)/);
  assert.match(scene, /uTwinkle: \{ value: 0 \}/);
  assert.match(scene, /stars\.material\.uniforms\.uTwinkle\.value = 1/);
  assert.match(scene, /depthOpacity \* vTwinkle/);
});

test("reduced motion freezes the star-glint clock and leaves project particles unchanged", () => {
  assert.match(scene, /farStars\.material\.uniforms\.uTime\.value = reduceMotion \? 0 : time/);
  assert.match(scene, /midDust\.material\.uniforms\.uTime\.value = reduceMotion \? 0 : time/);
  assert.match(scene, /if \(!reduceMotion\) \{\s*farStars\.rotation\.z/);
  assert.match(scene, /stars\.material\.uniforms\.uTwinkle\.value = reduceMotion \? 0 : 1/);
  assert.doesNotMatch(scene, /system\.[^;]*uTwinkle/);
});

test("background points are ten percent smaller even at the point-size clamp limits", () => {
  assert.match(scene, /uPointSizeScale: \{ value: 1 \}/);
  assert.match(scene, /stars\.material\.uniforms\.uPointSizeScale\.value = 0\.9/);
  assert.match(scene, /gl_PointSize = clamp\([^;]+1\.0, 6\.0\) \* uPointSizeScale/);
});

test("all background depths keep a camera-aligned clear area around the black hole", () => {
  assert.match(scene, /for \(const stars of \[farStars, midDust, foregroundDust\]\)/);
  assert.match(scene, /uClearCenter\.value\.copy\(singularity\.root\.position\)/);
  assert.match(scene, /uClearRadius\.value\.set\(1\.45, 0\.85\)/);
  assert.match(scene, /viewMatrix \* vec4\(uClearCenter, 1\.0\)/);
  assert.match(scene, /smoothstep\(1\.0, 1\.15, separation\)/);
  assert.match(scene, /depthOpacity \* vTwinkle \* vClearSpace/);
  // The planet rings and black-hole accretion disk do not enable the exclusion mask.
  assert.doesNotMatch(scene, /(?:system|singularity)\.[^;]*uniforms\.uClearRadius/);
});
