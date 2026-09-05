import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { ACCRETION_ORBIT_SECONDS, getAccretionRotation } from "../src/scripts/aiLabMotion.ts";

const scene = readFileSync(new URL("../src/scripts/aiLabConstellation.ts", import.meta.url), "utf8");
const shader = readFileSync(new URL("../src/scripts/aiLabShaders.ts", import.meta.url), "utf8");

test("halo makes a smooth visible-time orbit and keeps spinning after the scan", () => {
  assert.equal(getAccretionRotation(0), 0);
  assert.equal(getAccretionRotation(ACCRETION_ORBIT_SECONDS / 2), Math.PI);
  assert.equal(getAccretionRotation(ACCRETION_ORBIT_SECONDS), Math.PI * 2);
  assert.ok(getAccretionRotation(30) > getAccretionRotation(20));
  const step = getAccretionRotation(1);
  for (const t of [6, 14, 28, 120]) assert.ok(Math.abs(getAccretionRotation(t + 1) - getAccretionRotation(t) - step) < 1e-12);
});

test("halo rotation is static with reduced motion and independent of frame count", () => {
  for (const t of [0, 1, 14, 100]) assert.equal(getAccretionRotation(t, true), 0);
  for (const fps of [30, 60, 120]) assert.equal(getAccretionRotation(fps * 8 / fps), getAccretionRotation(8));
});

test("only the light-flow child spins; fixed plane, event horizon and lens are not rotated", () => {
  for (const part of ["diskPlane", "streak", "stream"]) assert.ok(scene.includes(`diskFlow.add(${part})`));
  assert.match(scene, /disk\.add\(diskFlow\)/);
  assert.match(scene, /singularity\.diskFlow\.rotation\.z = accretionRotation/);
  assert.doesNotMatch(scene, /singularity\.(?:disk|root|photonRing)\.rotation\.[xyz]\s*(?:=|\+=)/);
  assert.match(scene, /rearDiskMaterial\.uniforms\.uRotation\.value = accretionRotation/);
  assert.match(shader, /mat2\(spinCos, -spinSin, spinSin, spinCos\) \* vDiskPosition/);
});
