export type AnimationFrameState = { elapsed: number; delta: number };

/** Monotonic visible-time clock: resuming never includes a hidden/offscreen interval. */
export class AnimationClock {
  private previous: number | undefined;
  private elapsed = 0;
  advance(timestamp: number): AnimationFrameState {
    const delta = this.previous === undefined ? 0 : Math.max(0, Math.min(100, timestamp - this.previous)) / 1000;
    this.previous = timestamp;
    this.elapsed += delta;
    return { elapsed: this.elapsed, delta };
  }
  pause() { this.previous = undefined; }
}

/** One owned RAF loop per surface, paused when it cannot be seen; no quality downgrade. */
export function createVisibleAnimationLoop(
  element: HTMLElement,
  draw: (frame: AnimationFrameState) => void,
  { continuous = true }: { continuous?: boolean } = {},
) {
  const controller = new AbortController();
  const options = { signal: controller.signal };
  const clock = new AnimationClock();
  let frameId = 0;
  let inView = false;
  let suspended = false;
  let pageHidden = false;
  let disposed = false;
  const active = () => !disposed && element.isConnected && inView && !document.hidden && !pageHidden && !suspended;
  const cancel = () => {
    cancelAnimationFrame(frameId);
    frameId = 0;
    clock.pause();
  };
  const tick = (timestamp: number) => {
    frameId = 0;
    if (!active()) return;
    draw(clock.advance(timestamp));
    if (continuous && active()) frameId = requestAnimationFrame(tick);
  };
  const invalidate = () => {
    if (active() && !frameId) frameId = requestAnimationFrame(tick);
  };
  const sync = () => {
    element.dataset.animationState = active() ? (continuous ? "running" : "static") : "paused";
    if (active()) invalidate();
    else cancel();
  };
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    sync();
  });
  observer.observe(element);
  document.addEventListener("visibilitychange", sync, options);
  window.addEventListener("pagehide", () => { pageHidden = true; sync(); }, options);
  window.addEventListener("pageshow", () => { pageHidden = false; sync(); }, options);
  element.dataset.animationState = "paused";
  return {
    invalidate,
    setPaused(value: boolean) { suspended = value; sync(); },
    destroy() {
      if (disposed) return;
      disposed = true;
      cancel();
      observer.disconnect();
      controller.abort();
      delete element.dataset.animationState;
    },
  };
}
