import assert from 'node:assert/strict';
import { test } from 'node:test';
import { initializeLabFallback } from '../src/scripts/aiLabFallback.ts';

test('no-WebGL project buttons support deep links, selection, close, and cleanup', t => {
  class Element extends EventTarget {
    dataset: Record<string,string> = {};
    hidden = true;
    textContent = '';
    attributes = new Map();
    focused = false;
    focus() { this.focused = true; }
    setAttribute(key: string, value: string) { this.attributes.set(key, value); }
  }
  const first = new Element(); first.dataset = {projectId:'one', projectTitle:'Project One'};
  const second = new Element(); second.dataset = {projectId:'two', projectTitle:'Project Two'};
  const panel = new Element(), title = new Element(), close = new Element(), notice = new Element();
  const lab = Object.assign(new Element(), {
    querySelector: (selector: string) => ({'[data-webgl-fallback]':notice, '[data-project-detail-panel]':panel, '[data-detail-title]':title, '[data-detail-close]':close})[selector],
    querySelectorAll: () => [first, second],
  });
  const location = {href:'https://example.com/ai/?project=two'};
  const document = new EventTarget();
  for (const [key, value] of Object.entries({document, window:{location, history:{state:null, replaceState: (_:unknown, __:string, url:URL) => {location.href=url.href;}}}})) {
    const previous = Object.getOwnPropertyDescriptor(globalThis,key);
    Object.defineProperty(globalThis,key,{value,configurable:true,writable:true});
    t.after(()=>previous?Object.defineProperty(globalThis,key,previous):Reflect.deleteProperty(globalThis,key));
  }
  initializeLabFallback(lab as unknown as HTMLElement);
  assert.equal(notice.hidden,false); assert.equal(panel.hidden,false); assert.equal(title.textContent,'Project Two');
  assert.equal(close.focused,true);
  close.dispatchEvent(new Event('click'));
  assert.equal(panel.hidden,true); assert.equal(new URL(location.href).searchParams.has('project'),false);
  assert.equal(second.focused,true);
  first.dispatchEvent(new Event('click'));
  assert.equal(title.textContent,'Project One'); assert.equal(panel.hidden,false);
  const escape = Object.assign(new Event('keydown'),{key:'Escape'}); lab.dispatchEvent(escape);
  assert.equal(panel.hidden,true);
  document.dispatchEvent(new Event('astro:before-swap'));
  first.dispatchEvent(new Event('click')); assert.equal(panel.hidden,true);
});
