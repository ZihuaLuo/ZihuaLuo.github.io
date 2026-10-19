export const CONSTELLATION_CAMERA_FOV = 36;

export const computeConstellationLayout = (
  projectCount: number,
  width: number,
  height: number,
  compact: boolean,
  projectSizes: readonly number[] = [],
) => {
  const worldHeight = compact ? 7.35 : 6.15;
  const worldWidth = worldHeight * width / height;
  // Offset star clusters, rather than matching rows or evenly spaced orbital slots.
  const slots = compact
    ? [[0.22, 0.35], [0.74, 0.19], [0.20, 0.73], [0.79, 0.75], [0.47, 0.87], [0.84, 0.46], [0.34, 0.115]]
    : [[0.22, 0.35], [0.75, 0.18], [0.18, 0.73], [0.78, 0.76], [0.45, 0.86], [0.84, 0.47], [0.42, 0.14]];
  const depths = [0.45, -0.38, 0.18, 0.32, -0.28, 0.05, -0.18];
  const scale = projectCount <= slots.length ? 1 : Math.sqrt(slots.length / projectCount) * 0.92;
  const cameraDistance = worldHeight / (2 * Math.tan(CONSTELLATION_CAMERA_FOV * Math.PI / 360));
  const radiusFor = (index: number) => 0.908 * 1.22 * (projectSizes[index] ?? 0.72) * scale
    * height / worldHeight * cameraDistance / (cameraDistance - depths[index % depths.length]);
  const positions = slots.map(([x, y]) => ({ pixelX: x * width, pixelY: y * height }));

  if (projectCount > slots.length) {
    // Place future projects in remaining space without repeating a seven-planet page.
    // Largest first keeps the readable title discs apart and leaves the black hole clear.
    const placed: Array<{ pixelX: number; pixelY: number; radius: number }> = [];
    const ordered = Array.from({ length: projectCount }, (_, index) => index)
      .sort((a, b) => radiusFor(b) - radiusFor(a));
    const holeX = width / 2;
    const holeY = (0.5 - 0.23 / worldHeight) * height;
    const holeRadiusX = 1.22 * height / worldHeight;
    const holeRadiusY = 0.54 * height / worldHeight;
    for (const index of ordered) {
      const radius = radiusFor(index);
      let best = { pixelX: 0, pixelY: 0, clearance: -Infinity };
      for (let row = 0; row < 25; row += 1) {
        for (let column = 0; column < 25; column += 1) {
          const pixelX = (0.08 + column * 0.035 + (row % 2) * 0.009) * width;
          const pixelY = (0.08 + row * 0.035) * height;
          const dx = pixelX - holeX;
          const dy = pixelY - holeY;
          const distance = Math.hypot(dx, dy);
          const holeRadius = distance === 0 ? holeRadiusX : distance / Math.hypot(dx / holeRadiusX, dy / holeRadiusY);
          let clearance = Math.min(pixelX, width - pixelX, pixelY, height - pixelY) - radius - 7;
          clearance = Math.min(clearance, distance - holeRadius - radius - 5);
          for (const other of placed) {
            clearance = Math.min(clearance, Math.hypot(pixelX - other.pixelX, pixelY - other.pixelY) - radius - other.radius - 6);
          }
          if (clearance > best.clearance) best = { pixelX, pixelY, clearance };
        }
      }
      positions[index] = best;
      placed.push({ ...best, radius });
    }
  }

  const targets = Array.from({ length: projectCount }, (_, index) => {
    const { pixelX, pixelY } = positions[index];
    return {
      x: (pixelX / width - 0.5) * worldWidth,
      y: (0.5 - pixelY / height) * worldHeight,
      z: depths[index % depths.length],
      pixelX,
      pixelY,
      scale,
      pixelRadius: radiusFor(index),
    };
  });

  return { targets, worldHeight };
};
