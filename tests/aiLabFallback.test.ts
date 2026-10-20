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
    open = false;
    showModal() { this.open = true; }
    close() { this.open = false; }
    focus() { this.focused = true; }
    setAttribute(key: string, value: string) { this.attributes.set(key, value); }
    querySelectorAll(_selector: string) { return [] as Element[]; }
  }
  const first = new Element(); first.dataset = {projectId:'canadian-electricity', projectTitle:'Canadian Electricity Research'};
  const second = new Element(); second.dataset = {projectId:'two', projectTitle:'Project Two'};
  const third = new Element(); third.dataset = {projectId:'cloudline', projectTitle:'Cloudline'};
  const fourth = new Element(); fourth.dataset = {projectId:'retention-lab', projectTitle:'Volunteer Retention Lab'};
  const fifth = new Element(); fifth.dataset = {projectId:'finance-phd-eda', projectTitle:'Finance PhD Time-to-Degree'};
  const sixth = new Element(); sixth.dataset = {projectId:'corporate-scandal', projectTitle:'Corporate Scandal Research'};
  const seventh = new Element(); seventh.dataset = {projectId:'noncompete-10k', projectTitle:'Non-Compete 10-K Research'};
  const eighth = new Element(); eighth.dataset = {projectId:'fund-similarity', projectTitle:'Fund Similarity Research'};
  const panel = new Element(), title = new Element(), close = new Element(), notice = new Element();
  const dashboardDetail = new Element(), cloudlineDetail = new Element(), retentionDetail = new Element(), financeDetail = new Element(), corporateDetail = new Element(), noncompeteDetail = new Element(), pendingDetail = new Element();
  dashboardDetail.dataset.detailProject = 'canadian-electricity';
  cloudlineDetail.dataset.detailProject = 'cloudline';
  retentionDetail.dataset.detailProject = 'retention-lab';
  financeDetail.dataset.detailProject = 'finance-phd-eda';
  corporateDetail.dataset.detailProject = 'corporate-scandal';
  noncompeteDetail.dataset.detailProject = 'noncompete-10k';
  const fundDetail = new Element(); fundDetail.dataset.detailProject = 'fund-similarity';
  pendingDetail.dataset.detailProject = 'pending';
  panel.querySelectorAll = () => [dashboardDetail, cloudlineDetail, retentionDetail, financeDetail, corporateDetail, noncompeteDetail, fundDetail, pendingDetail];
  const lab = Object.assign(new Element(), {
    querySelector: (selector: string) => ({'[data-webgl-fallback]':notice, '[data-project-detail-panel]':panel, '[data-detail-title]':title, '[data-detail-close]':close})[selector],
    querySelectorAll: () => [first, second, third, fourth, fifth, sixth, seventh, eighth],
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
  assert.equal(dashboardDetail.hidden,true); assert.equal(pendingDetail.hidden,false);
  assert.equal(close.focused,true);
  assert.equal(panel.open,true);
  assert.equal(second.attributes.get('aria-expanded'),'true');
  assert.equal(second.attributes.has('aria-pressed'),false);
  close.dispatchEvent(new Event('click'));
  assert.equal(panel.hidden,true); assert.equal(new URL(location.href).searchParams.has('project'),false);
  assert.equal(second.focused,true);
  assert.equal(panel.open,false);
  assert.equal(second.attributes.get('aria-expanded'),'false');
  first.dispatchEvent(new Event('click'));
  assert.equal(title.textContent,'Canadian Electricity Research'); assert.equal(panel.hidden,false);
  assert.equal(dashboardDetail.hidden,false); assert.equal(pendingDetail.hidden,true);
  third.dispatchEvent(new Event('click'));
  assert.equal(title.textContent,'Cloudline'); assert.equal(cloudlineDetail.hidden,false);
  assert.equal(dashboardDetail.hidden,true); assert.equal(pendingDetail.hidden,true);
  fourth.dispatchEvent(new Event('click'));
  assert.equal(title.textContent,'Volunteer Retention Lab'); assert.equal(retentionDetail.hidden,false);
  assert.equal(cloudlineDetail.hidden,true); assert.equal(pendingDetail.hidden,true);
  fifth.dispatchEvent(new Event('click'));
  assert.equal(title.textContent,'Finance PhD Time-to-Degree'); assert.equal(financeDetail.hidden,false);
  assert.equal(retentionDetail.hidden,true); assert.equal(pendingDetail.hidden,true);
  sixth.dispatchEvent(new Event('click'));
  assert.equal(corporateDetail.hidden,false); assert.equal(financeDetail.hidden,true);
  seventh.dispatchEvent(new Event('click'));
  assert.equal(noncompeteDetail.hidden,false); assert.equal(corporateDetail.hidden,true);
  eighth.dispatchEvent(new Event('click'));
  assert.equal(fundDetail.hidden,false); assert.equal(noncompeteDetail.hidden,true);
  assert.equal(title.textContent,'Fund Similarity Research'); assert.equal(pendingDetail.hidden,true);
  const escape = new Event('cancel',{cancelable:true}); panel.dispatchEvent(escape);
  assert.equal(panel.hidden,true);
  assert.equal(escape.defaultPrevented,true);
  first.dispatchEvent(new Event('click')); assert.equal(panel.open,true);
  document.dispatchEvent(new Event('astro:before-swap'));
  assert.equal(panel.open,false);
  first.dispatchEvent(new Event('click')); assert.equal(panel.hidden,true);
});
