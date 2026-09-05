import assert from 'node:assert/strict';
import { test, type TestContext } from 'node:test';
import { AnimationClock, createVisibleAnimationLoop } from '../src/scripts/animationLifecycle.ts';
import { createTaskScope } from '../src/scripts/taskScope.ts';

test('visible clock resumes without jumping and caps stalled frames', () => {
  const clock = new AnimationClock();
  assert.deepEqual(clock.advance(1000), {elapsed: 0, delta: 0});
  assert.equal(clock.advance(1016).delta, .016);
  clock.pause();
  assert.equal(clock.advance(90000).elapsed, .016);
  assert.equal(clock.advance(99000).delta, .1);
});

function setup(t: TestContext) {
  const frames = new Map<number, FrameRequestCallback>();
  const timers = new Map<number, () => void>();
  let id = 0;
  let observe: (entries: {isIntersecting: boolean}[]) => void;
  let disconnected = false;
  const document = Object.assign(new EventTarget(), { hidden: false });
  const window = Object.assign(new EventTarget(), {
    requestAnimationFrame: (fn: FrameRequestCallback) => { frames.set(++id, fn); return id; },
    cancelAnimationFrame: (id: number) => frames.delete(id),
    setTimeout: (fn: () => void) => { timers.set(++id, fn); return id; },
    clearTimeout: (id: number) => timers.delete(id),
  });
  const replacements = { document, window, requestAnimationFrame: window.requestAnimationFrame, cancelAnimationFrame: window.cancelAnimationFrame,
    IntersectionObserver: class {
      constructor(fn: typeof observe) { observe = fn; }
      observe() {}
      disconnect() { disconnected = true; }
    },
  };
  for (const [key, value] of Object.entries(replacements)) {
    const previous = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { value, configurable: true, writable: true });
    t.after(() => previous ? Object.defineProperty(globalThis, key, previous) : Reflect.deleteProperty(globalThis, key));
  }
  const element = {isConnected: true, dataset: {}} as HTMLElement;
  return {frames, timers, document, window, element, visible: (value: boolean) => observe([{isIntersecting: value}]), disconnected: () => disconnected,
    flush: (time = 1000) => { const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn(time)); },
  };
}

test('RAF pauses offscreen, in background, and behind a dialog; destroy is final', t => {
  const env = setup(t);
  let draws = 0;
  const loop = createVisibleAnimationLoop(env.element, () => draws++);
  assert.equal(env.frames.size, 0);
  env.visible(true); env.flush();
  assert.equal(draws, 1); assert.equal(env.frames.size, 1);
  env.visible(false); assert.equal(env.frames.size, 0);
  env.visible(true); env.document.hidden = true; env.document.dispatchEvent(new Event('visibilitychange'));
  assert.equal(env.frames.size, 0);
  env.document.hidden = false; env.document.dispatchEvent(new Event('visibilitychange'));
  assert.equal(env.frames.size, 1);
  loop.setPaused(true); assert.equal(env.frames.size, 0);
  loop.setPaused(false); assert.equal(env.frames.size, 1);
  env.window.dispatchEvent(new Event('pagehide')); assert.equal(env.frames.size, 0);
  env.window.dispatchEvent(new Event('pageshow')); assert.equal(env.frames.size, 1);
  loop.destroy(); loop.destroy(); loop.invalidate();
  assert.equal(env.frames.size, 0); assert.equal(env.disconnected(), true);
  env.document.dispatchEvent(new Event('visibilitychange')); assert.equal(env.frames.size, 0);
});

test('reduced-motion scene renders on demand, not continuously', t => {
  const env = setup(t);
  let draws = 0;
  const loop = createVisibleAnimationLoop(env.element, () => draws++, {continuous: false});
  env.visible(true); env.flush();
  assert.equal(draws, 1); assert.equal(env.frames.size, 0);
  loop.invalidate(); loop.invalidate(); assert.equal(env.frames.size, 1);
  env.flush(); assert.equal(draws, 2); assert.equal(env.frames.size, 0);
  loop.destroy();
});

test('page-local task scope cancels pending typing, timers, and listeners', t => {
  const env = setup(t);
  let calls = 0;
  const scope = createTaskScope();
  scope.timeout(() => calls++, 100);
  scope.frame(() => calls++);
  env.window.addEventListener('test', () => calls++, {signal: scope.signal});
  scope.destroy();
  assert.equal(env.timers.size, 0); assert.equal(env.frames.size, 0);
  env.window.dispatchEvent(new Event('test')); assert.equal(calls, 0);
});
