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

test("all seven planets occupy distinct readable positions around the black hole", () => {
  const sizes = [0.72, 0.72, 0.70, 0.72, 0.69, 0.69, 0.71];
  for (const [width, height, compact] of [[540, 467, false], [351, 418, true], [320, 381, true]] as const) {
    const { targets, worldHeight } = computeConstellationLayout(7, width, height, compact);
    assert.equal(targets.length, 7);
    assert.equal(worldHeight, compact ? 7.35 : 6.15);
    for (let a = 0; a < targets.length; a += 1) {
      const first = targets[a];
      const radius = 0.908 * 1.22 * sizes[a] * height / worldHeight;
      assert.ok(first.pixelX - radius > 0 && first.pixelX + radius < width);
      assert.ok(first.pixelY - radius > 0 && first.pixelY + radius < height);
      assert.ok(Math.hypot(first.pixelX - width / 2, first.pixelY - height * 0.47) > radius + height * 0.08);
      for (let b = a + 1; b < targets.length; b += 1) {
        const second = targets[b];
        const otherRadius = 0.908 * 1.22 * sizes[b] * height / worldHeight;
        assert.ok(Math.hypot(first.pixelX - second.pixelX, first.pixelY - second.pixelY) > radius + otherRadius + 5);
      }
    }
  }
  const showcase = readFileSync(new URL("../src/components/ai/AILabShowcase.astro", import.meta.url), "utf8");
  const scene = readFileSync(new URL("../src/scripts/aiLabConstellation.ts", import.meta.url), "utf8");
  assert.doesNotMatch(showcase + scene, /data-lab-sectors|data-sector-(?:previous|next|status)|activeSector|getConstellationSectorIndex/);
  assert.match(scene, /system\.root\.visible = spawn\.visible/);
});
