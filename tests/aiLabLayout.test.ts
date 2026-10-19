import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { computeConstellationLayout } from "../src/scripts/aiLabLayout.ts";

test("four readable planets fit the original chart at desktop and mobile widths", () => {
  for (const [width, height, compact] of [[600, 520, false], [390, 464, true], [320, 381, true]] as const) {
    const { targets, worldHeight } = computeConstellationLayout(4, width, height, compact);
    const titleDiameter = 2 * 0.908 * 1.22 * 0.87 * height / worldHeight;
    assert.equal(targets.length, 4);
    assert.equal(worldHeight, compact ? 7.35 : 6.15);
    for (let a = 0; a < targets.length; a += 1) {
      const first = targets[a];
      assert.ok(first.pixelX - titleDiameter / 2 > 0);
      assert.ok(first.pixelX + titleDiameter / 2 < width);
      assert.ok(first.pixelY - titleDiameter / 2 > 0);
      assert.ok(first.pixelY + titleDiameter / 2 < height);
      for (let b = a + 1; b < targets.length; b += 1) {
        const second = targets[b];
        assert.ok(Math.hypot(first.pixelX - second.pixelX, first.pixelY - second.pixelY) > titleDiameter + 6);
      }
    }
  }
});

test("the seven star-map planets keep readable titles and distinct positions", () => {
  const sizes = [0.86, 0.70, 0.67, 0.80, 0.66, 0.64, 0.68];
  for (const [width, height, compact] of [[640, 554, false], [548, 475, true], [351, 418, true], [284, 338, true]] as const) {
    const { targets, worldHeight } = computeConstellationLayout(7, width, height, compact, sizes);
    assert.equal(targets.length, 7);
    assert.equal(worldHeight, compact ? 7.35 : 6.15);
    for (let a = 0; a < targets.length; a += 1) {
      const first = targets[a];
      const radius = first.pixelRadius;
      assert.ok(first.pixelX - radius > 0 && first.pixelX + radius < width);
      assert.ok(first.pixelY - radius > 0 && first.pixelY + radius < height);
      assert.ok(Math.hypot(first.pixelX - width / 2, first.pixelY - height * 0.47) > radius + height * 0.08);
      for (let b = a + 1; b < targets.length; b += 1) {
        const second = targets[b];
        const otherRadius = second.pixelRadius;
        assert.ok(Math.hypot(first.pixelX - second.pixelX, first.pixelY - second.pixelY) > radius + otherRadius + 5);
      }
    }
  }
  const showcase = readFileSync(new URL("../src/components/ai/AILabShowcase.astro", import.meta.url), "utf8");
  const scene = readFileSync(new URL("../src/scripts/aiLabConstellation.ts", import.meta.url), "utf8");
  assert.doesNotMatch(showcase + scene, /data-lab-sectors|data-sector-(?:previous|next|status)|activeSector|getConstellationSectorIndex/);
  assert.match(scene, /system\.root\.visible = spawn\.visible/);
});

test("additional projects share one chart without repeating or overlapping title discs", () => {
  for (const count of [8, 9, 12]) {
    const sizes = Array.from({ length: count }, (_, index) => [0.86, 0.70, 0.67, 0.80, 0.66, 0.64, 0.68][index % 7]);
    for (const [width, height, compact] of [[640, 554, false], [548, 475, true], [351, 418, true], [284, 338, true]] as const) {
      const { targets } = computeConstellationLayout(count, width, height, compact, sizes);
      assert.equal(targets.length, count);
      for (let a = 0; a < targets.length; a += 1) {
        const first = targets[a];
        assert.ok(Math.min(first.pixelX, width - first.pixelX, first.pixelY, height - first.pixelY) > first.pixelRadius + 5);
        for (const second of targets.slice(a + 1)) {
          assert.ok(Math.hypot(first.pixelX - second.pixelX, first.pixelY - second.pixelY) > first.pixelRadius + second.pixelRadius + 4,
            `${count} projects collide at ${width}px`);
        }
      }
    }
  }
});
