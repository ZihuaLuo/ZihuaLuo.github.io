export const LAB_SCAN_DURATION_MS = 6000;
const FIRST_SPAWN_MS = 600;
const SPAWN_DURATION_MS = 2400;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number) => {
  const progress = clamp01(value);
  // Minimum-jerk easing: both speed and acceleration meet the idle state at zero.
  return progress * progress * progress * (10 + progress * (-15 + progress * 6));
};

export const getProjectSpawnTiming = (index: number, projectCount: number) => {
  const duration = projectCount > 1 ? SPAWN_DURATION_MS : LAB_SCAN_DURATION_MS - FIRST_SPAWN_MS;
  const stagger = (LAB_SCAN_DURATION_MS - FIRST_SPAWN_MS - duration) / Math.max(1, projectCount - 1);
  return { start: FIRST_SPAWN_MS + index * stagger, duration };
};

export const getScanProgress = (elapsedMs: number) => clamp01(elapsedMs / LAB_SCAN_DURATION_MS);

export const getProjectSpawnState = (elapsedMs: number, start: number, duration: number) => {
  const progress = clamp01((elapsedMs - start) / duration);
  return {
    visible: elapsedMs >= start,
    progress,
    travel: smooth(progress),
    // The planet, title, atmosphere, and rings share this appearance curve.
    // Growth follows the whole flight instead of reaching full size halfway through it.
    appearance: smooth(progress),
  };
};
