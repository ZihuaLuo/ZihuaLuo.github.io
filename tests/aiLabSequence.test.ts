import assert from "node:assert/strict";
import test from "node:test";
import { getProjectSpawnState, getProjectSpawnTiming, getScanProgress, LAB_SCAN_DURATION_MS } from "../src/scripts/aiLabSequence.ts";

test("three complete projects launch in order and finish with the six-second scan", () => {
  const timings = Array.from({ length: 3 }, (_, index) => getProjectSpawnTiming(index, 3));
  assert.deepEqual(timings.map(({ start }) => start), [600, 2100, 3600]);
  for (const { start, duration } of timings) {
    assert.equal(getProjectSpawnState(start - 1, start, duration).visible, false);
    assert.equal(getProjectSpawnState(start, start, duration).travel, 0);
    assert.deepEqual(getProjectSpawnState(LAB_SCAN_DURATION_MS, start, duration), {
      visible: true, progress: 1, travel: 1, appearance: 1,
    });
  }
  assert.equal(timings[2].start + timings[2].duration, LAB_SCAN_DURATION_MS);
});

test("scan progresses once and stays finished instead of wrapping", () => {
  assert.deepEqual([-100, 0, 1500, 3000, 4500, 6000, 12000, 60000].map(getScanProgress),
    [0, 0, 0.25, 0.5, 0.75, 1, 1, 1]);
});

test("a single appearance curve reveals the entire project during its journey", () => {
  const { start, duration } = getProjectSpawnTiming(0, 3);
  let previous = { travel: 0, appearance: 0 };
  for (let elapsed = start; elapsed <= start + duration; elapsed += 60) {
    const state = getProjectSpawnState(elapsed, start, duration);
    assert.ok(state.travel >= previous.travel && state.travel <= 1);
    assert.ok(state.appearance >= previous.appearance && state.appearance <= 1);
    assert.equal(state.appearance, state.travel);
    previous = state;
  }
  const departing = getProjectSpawnState(start + duration * 0.25, start, duration);
  assert.ok(departing.appearance > 0 && departing.travel < 1);
});

test("flight speed and acceleration ease continuously into and out of rest", () => {
  const travel = (progress: number) => getProjectSpawnState(progress * 1000, 0, 1000).travel;
  assert.equal(travel(0.5), 0.5);
  const step = 0.0001;
  for (const edge of [0, 1]) {
    const speed = (travel(edge + step) - travel(edge - step)) / (2 * step);
    const acceleration = (travel(edge + step) - 2 * travel(edge) + travel(edge - step)) / (step * step);
    assert.ok(Math.abs(speed) < 0.00001);
    assert.ok(Math.abs(acceleration) < 0.01);
  }
  // Symmetric acceleration/deceleration avoids the old rush-then-long-crawl arrival.
  for (const progress of [0.1, 0.25, 0.4]) {
    assert.ok(Math.abs(travel(progress) + travel(1 - progress) - 1) < 1e-12);
  }
});

test("different project counts still finish within the same scan", () => {
  for (const count of [1, 2, 3, 6]) {
    for (let index = 0; index < count; index += 1) {
      const { start, duration } = getProjectSpawnTiming(index, count);
      assert.ok(start + duration <= LAB_SCAN_DURATION_MS);
    }
    const last = getProjectSpawnTiming(count - 1, count);
    assert.equal(last.start + last.duration, LAB_SCAN_DURATION_MS);
  }
});
