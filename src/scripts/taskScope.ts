/** Own timers, animation callbacks and event listeners for one page-local widget. */
export function createTaskScope() {
  const controller = new AbortController();
  const timeouts = new Set<number>();
  const frames = new Set<number>();
  return {
    signal: controller.signal,
    timeout(callback: () => void, delay: number) {
      const id = window.setTimeout(() => {
        timeouts.delete(id);
        if (!controller.signal.aborted) callback();
      }, delay);
      timeouts.add(id);
      return id;
    },
    frame(callback: FrameRequestCallback) {
      const id = window.requestAnimationFrame((timestamp) => {
        frames.delete(id);
        if (!controller.signal.aborted) callback(timestamp);
      });
      frames.add(id);
      return id;
    },
    destroy() {
      controller.abort();
      timeouts.forEach(id => window.clearTimeout(id));
      frames.forEach(id => window.cancelAnimationFrame(id));
      timeouts.clear();
      frames.clear();
    },
  };
}
