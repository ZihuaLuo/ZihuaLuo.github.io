export const computeConstellationLayout = (projectCount: number, width: number, height: number, compact: boolean) => {
  const worldHeight = compact ? 7.35 : 6.15;
  const worldWidth = worldHeight * width / height;
  const fourSlots = compact
    ? [[0.25, 0.245], [0.75, 0.285], [0.285, 0.735], [0.735, 0.755]]
    : [[0.245, 0.265], [0.755, 0.245], [0.29, 0.735], [0.735, 0.765]];
  const sixSlots = compact
    ? [[0.245, 0.18], [0.755, 0.18], [0.275, 0.82], [0.735, 0.82], [0.795, 0.505], [0.205, 0.495]]
    : [[0.245, 0.185], [0.755, 0.185], [0.275, 0.815], [0.735, 0.815], [0.795, 0.505], [0.205, 0.495]];
  // Seven readable planets surround the central black hole in one unchanged chart.
  const sevenSlots = compact
    ? [[0.20, 0.17], [0.80, 0.17], [0.19, 0.50], [0.81, 0.50], [0.30, 0.82], [0.70, 0.82], [0.50, 0.17]]
    : [[0.20, 0.18], [0.80, 0.18], [0.19, 0.50], [0.81, 0.50], [0.30, 0.82], [0.70, 0.82], [0.50, 0.18]];
  const slots = projectCount > 6 ? sevenSlots : projectCount > 4 ? sixSlots : fourSlots;
  const depths = [0.28, -0.2, 0.14, -0.12, 0.08, -0.06, 0.05];
  const targets = Array.from({ length: projectCount }, (_, index) => {
    const [normalizedX, normalizedY] = slots[index] ?? slots[index % slots.length];
    return {
      x: (normalizedX - 0.5) * worldWidth,
      y: (0.5 - normalizedY) * worldHeight,
      z: depths[index % depths.length],
      pixelX: normalizedX * width,
      pixelY: normalizedY * height,
    };
  });

  return { targets, worldHeight };
};
