import { CubicBezierCurve3, Vector3 } from "three";

export const ACCRETION_ORBIT_SECONDS = 14;

// Use the shared visible-time clock so refresh rate and hidden tabs cannot change the spin.
export const getAccretionRotation = (elapsedSeconds: number, reducedMotion = false) =>
  reducedMotion ? 0 : Math.max(0, elapsedSeconds) * (Math.PI * 2 / ACCRETION_ORBIT_SECONDS);

export const updateProjectFlightPath = (path: CubicBezierCurve3, origin: Vector3, target: Vector3) => {
  const dx = target.x - origin.x;
  const dy = target.y - origin.y;
  const planarDistance = Math.hypot(dx, dy);
  const bend = Math.min(planarDistance * 0.22, 0.55);
  const bendX = planarDistance > 0 ? -dy / planarDistance * bend : 0;
  const bendY = planarDistance > 0 ? dx / planarDistance * bend : 0;

  // All projects depart the actual singularity, with one gentle tangential sweep.
  // Control points stay between the endpoints: no loops, overshoot, or arrival reversal.
  path.v0.copy(origin);
  path.v1.copy(origin).lerp(target, 0.26);
  path.v1.x += bendX;
  path.v1.y += bendY;
  path.v2.copy(origin).lerp(target, 0.72);
  path.v2.x += bendX * 0.55;
  path.v2.y += bendY * 0.55;
  path.v3.copy(target);
  path.updateArcLengths();
  return path;
};

export const createProjectFlightPath = (origin: Vector3, target: Vector3) => {
  const path = new CubicBezierCurve3();
  path.arcLengthDivisions = 160;
  return updateProjectFlightPath(path, origin, target);
};

// Layout retargeting and hover settling should feel the same at 30, 60, and 120 Hz.
export const getMotionBlend = (deltaSeconds: number, settlingSeconds = 0.18) =>
  -Math.expm1(-Math.max(0, deltaSeconds) / settlingSeconds);
