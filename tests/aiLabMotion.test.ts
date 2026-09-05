import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { Vector3 } from "three";
import { createProjectFlightPath, getMotionBlend, updateProjectFlightPath } from "../src/scripts/aiLabMotion.ts";
import { getProjectSpawnState } from "../src/scripts/aiLabSequence.ts";

const origin = new Vector3(0, 0.23, -0.02);
const targets = [new Vector3(-1.9, 1.8, 0.5), new Vector3(2.1, 1.6, -0.35), new Vector3(-0.65, -1.7, 0.75)];

test("all trajectories start exactly in the black hole and end at the unchanged project positions", () => {
  for (const target of targets) {
    const path = createProjectFlightPath(origin, target);
    assert.deepEqual(path.getPointAt(0).toArray(), origin.toArray());
    assert.deepEqual(path.getPointAt(1).toArray(), target.toArray());
    assert.notEqual(path.v0, origin);
    assert.notEqual(path.v3, target);
  }
});

test("departure follows one bounded arc without looping, doubling back, or overshooting", () => {
  for (const target of targets) {
    const path = createProjectFlightPath(origin, target);
    const radial = target.clone().sub(origin);
    const total = radial.length();
    radial.normalize();
    let lastProjection = -1;
    let lastDistance = -1;
    for (let index = 0; index <= 240; index++) {
      const position = path.getPointAt(getProjectSpawnState(index, 0, 240).travel).sub(origin);
      const projection = position.dot(radial);
      const distance = position.length();
      assert.ok(projection >= lastProjection - 1e-10);
      assert.ok(projection <= total + 1e-10);
      assert.ok(distance >= lastDistance - 1e-10);
      assert.ok(position.clone().addScaledVector(radial, -projection).length() < 0.56);
      lastProjection = projection;
      lastDistance = distance;
    }
  }
});

test("equal arc-length steps do not acquire extra speed changes from the Bezier curvature", () => {
  for (const target of targets) {
    const path = createProjectFlightPath(origin, target);
    const steps = Array.from({ length: 100 }, (_, i) => path.getPointAt((i + 1) / 100).distanceTo(path.getPointAt(i / 100)));
    assert.ok(Math.max(...steps) / Math.min(...steps) < 1.005);
  }
});

test("flight and settling are frame-rate independent at 30, 60 and 120 Hz", () => {
  const path = createProjectFlightPath(origin, targets[0]);
  for (const fps of [30, 60, 120]) {
    const sampled = Array.from({ length: 3 }, (_, i) => {
      const frame = fps * (i + 1) / 2;
      return path.getPointAt(getProjectSpawnState(frame / fps * 1000, 0, 2400).travel);
    });
    sampled.forEach((point, i) => {
      assert.ok(point.distanceTo(path.getPointAt(getProjectSpawnState((i + 1) * 500, 0, 2400).travel)) < 1e-12);
    });
    let blend = 0;
    for (let frame = 0; frame < fps; frame++) blend += (1 - blend) * getMotionBlend(1 / fps);
    assert.ok(Math.abs(blend - (1 - Math.exp(-1 / 0.18))) < 1e-12);
  }
});

test("retargeting refreshes the cached curve and remains finite for coincident endpoints", () => {
  const path = createProjectFlightPath(origin, targets[0]);
  const oldLength = path.getLength();
  updateProjectFlightPath(path, origin, targets[2]);
  assert.deepEqual(path.getPointAt(1).toArray(), targets[2].toArray());
  assert.notEqual(path.getLength(), oldLength);
  updateProjectFlightPath(path, origin, origin);
  for (const progress of [0, 0.5, 1]) assert.ok(path.getPointAt(progress).distanceTo(origin) < 1e-12);
});

test("renderer uses a single pose writer and waits until arrival before enabling selection", () => {
  const scene = readFileSync(new URL("../src/scripts/aiLabConstellation.ts", import.meta.url), "utf8");
  assert.match(scene, /root\.position\.copy\(singularity\.root\.position\)/);
  assert.match(scene, /system\.flightPath\.getPointAt\(travel, system\.root\.position\)/);
  assert.equal((scene.match(/system\.root\.scale\.setScalar\(/g) ?? []).length, 1);
  assert.doesNotMatch(scene, /system\.root\.position\.(copy|lerp)|arcStrength|stableScale|animateProjectSpawn/);
  assert.match(scene, /planetSystems\[index\]\.reveal < 1/);
});
