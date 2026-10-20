import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { parse } from 'parse5';
import { profileTopics } from '../src/data/aiProfile.ts';
import { searchProjects } from '../src/data/searchProjects.ts';

// Validate the deployable artifact, not merely the source templates.
const root = path.resolve('dist');
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
const walk = async directory => (await Promise.all((await readdir(directory, {withFileTypes: true})).map(entry =>
  entry.isDirectory() ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
const files = await walk(root);
const relative = file => path.relative(root, file).split(path.sep).join('/');
const allPaths = new Set(files.map(relative));
const pages = new Map();
const errors = [];
const visit = (node, fn) => { fn(node); for (const child of node.childNodes || []) visit(child, fn); };
for (const file of files.filter(file => file.endsWith('.html'))) {
  const html = await readFile(file, 'utf8');
  const ids = new Set();
  const experienceCards = new Set();
  const creditCards = new Set();
  const links = [];
  const headings = [];
  const controls = [];
  let canonical;
  let description;
  visit(parse(html), node => {
    const attrs = Object.fromEntries((node.attrs || []).map(attr => [attr.name, attr.value]));
    if (/^h[1-6]$/.test(node.tagName || '')) headings.push(Number(node.tagName.slice(1)));
    if (['button', 'input', 'dialog'].includes(node.tagName) || ['tab', 'tabpanel', 'radiogroup'].includes(attrs.role)) {
      let label = node.parentNode;
      while (label && label.tagName !== 'label') label = label.parentNode;
      controls.push({tag: node.tagName, attrs, labelled: Boolean(label)});
    }
    if (attrs.id) {
      if (ids.has(attrs.id)) errors.push(`${relative(file)}: duplicate id ${attrs.id}`);
      ids.add(attrs.id);
      const classes = attrs.class?.split(/\s+/) || [];
      if (classes.includes('experience-entry') || classes.includes('education-profile--timeline')) experienceCards.add(attrs.id);
      if ('data-credit-card' in attrs) creditCards.add(attrs.id);
    }
    if (attrs.rel === 'canonical') canonical = attrs.href;
    if (node.tagName === 'meta' && attrs.name === 'description') description = attrs.content;
    for (const attr of ['href', 'src', 'poster']) if (attrs[attr]) links.push(attrs[attr]);
  });
  pages.set(relative(file), {ids, links, canonical, description, experienceCards, creditCards, headings, controls});
}
const origin = new URL([...pages.values()].find(page => page.canonical)?.canonical || 'http://127.0.0.1:4321').origin;
const homeUrl = `${origin}${base}/`;
const homePage = pages.get('index.html');
if (homePage?.canonical !== homeUrl) errors.push(`index.html: expected canonical ${homeUrl}`);
if (pages.get('about/index.html')?.canonical !== homeUrl) errors.push('about/index.html: expected canonical home URL');
const homeHtml = await readFile(path.join(root, 'index.html'), 'utf8');
let homeRobots;
const homeSchemas = [];
visit(parse(homeHtml), node => {
  const attrs = Object.fromEntries((node.attrs || []).map(attr => [attr.name, attr.value]));
  if (node.tagName === 'meta' && attrs.name === 'robots') homeRobots = attrs.content;
  if (node.tagName === 'script' && attrs.type === 'application/ld+json') {
    try { homeSchemas.push(JSON.parse((node.childNodes || []).map(child => child.value || '').join(''))); }
    catch { errors.push('index.html: invalid JSON-LD'); }
  }
});
if (homeRobots?.split(',').map(value => value.trim()).includes('noindex')) errors.push('index.html: noindex blocks the home page');
if (!homeSchemas.some(schema => schema['@type'] === 'WebSite' && schema.name === 'Zihua Luo' && schema.url === homeUrl)) {
  errors.push('index.html: missing WebSite identity markup');
}
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
if (!sitemap.includes(`<loc>${homeUrl}</loc>`)) errors.push('sitemap.xml: missing canonical home URL');
let checkedLinks = 0;
function validateLink(link, source) {
  let url;
  try { url = new URL(link, `${origin}${base}/${source.replace(/index\.html$/, '')}`); } catch { errors.push(`${source}: invalid URL ${link}`); return; }
  if (!['http:', 'https:'].includes(url.protocol) || url.origin !== origin) return;
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch { errors.push(`${source}: malformed URL ${link}`); return; }
  if (base && !pathname.startsWith(`${base}/`)) { errors.push(`${source}: missing BASE_PATH ${link}`); return; }
  const local = pathname.slice(base.length).replace(/^\//, '');
  const target = [local, `${local.replace(/\/$/, '')}/index.html`.replace(/^\//, ''), `${local}.html`].find(candidate => allPaths.has(candidate));
  checkedLinks++;
  if (!target) { errors.push(`${source}: missing target ${link}`); return; }
  if (url.hash && pages.has(target) && !url.hash.startsWith('#:~:text=')) {
    const anchor = decodeURIComponent(url.hash.slice(1));
    if (!pages.get(target).ids.has(anchor)) errors.push(`${source}: missing anchor ${link}`);
  }
}
for (const [file, page] of pages) for (const link of page.links) validateLink(link, file);
const index = JSON.parse(await readFile(path.join(root, 'search-index.json'), 'utf8'));
for (const item of index) {
  validateLink(item.url, 'search-index.json');
  if (typeof item.searchContent !== 'string') errors.push(`search-index.json: missing searchContent for ${item.url}`);
}
const writingPages = [...pages.keys()]
  .filter(file => /^writing\/[^/]+\/index\.html$/.test(file))
  .map(file => `${base}/${file.replace(/index\.html$/, '')}`);
// Guard the semantics of the controls whose keyboard behaviour is checked in-browser.
for (const file of ['ai/index.html', 'credits/index.html', 'experience/index.html']) {
  let previous = 0;
  for (const level of pages.get(file)?.headings || []) {
    if (level > previous + 1) errors.push(`${file}: heading jumps from h${previous} to h${level}`);
    previous = level;
  }
}
const aiPage = pages.get('ai/index.html');
const projectDialog = aiPage?.controls.find(({attrs}) => 'data-project-detail-panel' in attrs);
if (projectDialog?.tag !== 'dialog') errors.push('ai/index.html: project details must use a native dialog');
if (aiPage?.controls.filter(({attrs}) => 'data-project-node' in attrs).length !== searchProjects.length) errors.push('ai/index.html: project opener coverage does not match the project directory');
for (const {tag, attrs} of aiPage?.controls || []) {
  if (!('data-project-node' in attrs)) continue;
  if (tag !== 'button' || attrs['aria-haspopup'] !== 'dialog' || attrs['aria-controls'] !== projectDialog?.attrs.id || 'aria-pressed' in attrs) {
    errors.push(`ai/index.html: invalid project opener ${attrs['data-project-id']}`);
  }
}
function validateRadioChoices(file, marker, name, expectedCount) {
  const page = pages.get(file);
  const choices = page?.controls.filter(({attrs}) => marker in attrs) || [];
  if (choices.length !== expectedCount || choices.filter(({attrs}) => 'checked' in attrs).length !== 1) errors.push(`${file}: expected one selected ${name} choice`);
  for (const {tag, attrs, labelled} of choices) {
    if (tag !== 'input' || attrs.type !== 'radio' || attrs.name !== name || !labelled || 'aria-pressed' in attrs) errors.push(`${file}: ${name} requires labelled native radios`);
    if (attrs['aria-controls'] && !page.ids.has(attrs['aria-controls'])) errors.push(`${file}: missing radio-controlled content`);
  }
}
validateRadioChoices('projects/fund-similarity-dashboard/index.html', 'data-model-choice', 'cluster-representation', 2);
const noncompeteData = JSON.parse(await readFile(new URL('../src/data/noncompete.json', import.meta.url), 'utf8'));
validateRadioChoices('projects/noncompete-10k-dashboard/index.html', 'data-period', 'filing-period', noncompeteData.periods.length + 1);
for (const file of pages.keys()) if (/^writing\/[^/]+\/index\.html$/.test(file)) validateRadioChoices(file, 'data-reading-choice', 'reading-surface', 2);
const experiencePage = pages.get('experience/index.html');
for (const {attrs} of experiencePage?.controls.filter(({attrs}) => attrs.role === 'tab') || []) {
  const panel = experiencePage.controls.find(({attrs: candidate}) => candidate.id === attrs['aria-controls']);
  if (panel?.attrs.role !== 'tabpanel' || panel.attrs['aria-labelledby'] !== attrs.id) errors.push('experience/index.html: tab and panel are not linked');
}
const indexedWritingPages = new Set(index.filter(item => item.type === 'writing').map(item => item.url));
for (const url of writingPages) {
  if (!indexedWritingPages.has(url)) errors.push(`search-index.json: missing writing page ${url}`);
}
if (indexedWritingPages.size !== writingPages.length) {
  errors.push(`search-index.json: writing coverage ${indexedWritingPages.size}/${writingPages.length}`);
}
for (const project of searchProjects) {
  const planetUrl = `${base}/ai/?project=${encodeURIComponent(project.id)}#ai-lab-title`;
  if (!index.some(item => item.type === 'project' && item.title === project.title && item.url === planetUrl)) {
    errors.push(`search-index.json: missing planet ${project.id}`);
  }
  if (project.direct) {
    const directUrl = `${base}${project.direct.url}`;
    const file = project.direct.url.replace(/^\//, '').replace(/\/$/, '/index.html');
    const page = pages.get(file);
    if (page?.canonical !== `${origin}${directUrl}`) errors.push(`${file}: missing or incorrect project canonical`);
    if (!page?.description?.trim()) errors.push(`${file}: missing project description`);
    if (!sitemap.includes(`<loc>${origin}${directUrl}</loc>`)) errors.push(`sitemap.xml: missing public project ${directUrl}`);
    if (page?.headings[0] !== 1) errors.push(`${file}: missing leading h1`);
    let previous = 0;
    for (const level of page?.headings || []) {
      if (level > previous + 1) errors.push(`${file}: heading jumps from h${previous} to h${level}`);
      previous = level;
    }

    if (!index.some(item => item.type === project.direct.kind && item.url === directUrl)) {
      errors.push(`search-index.json: missing direct page ${project.direct.url}`);
    }
  }
}
for (const [type, file, cardKey] of [
  ['experience', 'experience/index.html', 'experienceCards'],
  ['acknowledgement', 'credits/index.html', 'creditCards'],
]) {
  const expected = pages.get(file)?.[cardKey];
  if (!expected) {
    errors.push(`search-index.json: missing ${file} for ${type} coverage`);
    continue;
  }
  const indexed = new Set(index.filter(item => item.type === type).map(item => new URL(item.url, origin).hash.slice(1)));
  for (const id of expected) if (!indexed.has(id)) errors.push(`search-index.json: missing ${type} card ${id}`);
  for (const id of indexed) if (!expected.has(id)) errors.push(`search-index.json: extra ${type} card ${id}`);
}
if (/projects\/[^<]*(?:volunteer|retention)/i.test(sitemap)) errors.push('sitemap.xml: private retention dashboard must not be published');
const canadaHtml = await readFile(path.join(root, 'projects/canadian-provincial-electricity-dashboard.html'), 'utf8');
if (canadaHtml.includes('data:application/zip;base64,')) errors.push('Canadian dashboard: ZIP must remain a separate download');
for (const id of ['kpiGen', 'kpiCons', 'kpiAvail']) {
  if (new RegExp(`id="${id}"[^<]*>[^<]*<\\/div><div class="k-note">million MWh`).test(canadaHtml)) errors.push(`Canadian dashboard: duplicate million scaling for ${id}`);
}
const indexedChatTopics = new Set(index.filter(item => item.type === 'chatbot').map(item => new URL(item.url, origin).searchParams.get('ask')).filter(Boolean));
for (const topic of profileTopics) if (!indexedChatTopics.has(topic.id)) errors.push(`search-index.json: missing chatbot topic ${topic.id}`);
for (const id of indexedChatTopics) if (!profileTopics.some(topic => topic.id === id)) errors.push(`search-index.json: extra chatbot topic ${id}`);
for (const retired of ['images/chat-super-nono-smile.png', 'images/project-constellation-reference.png']) {
  if (allPaths.has(retired)) errors.push(`Retired development asset shipped: ${retired}`);
}
assert.equal(errors.length, 0, [...new Set(errors)].join('\n'));
const htmlBytes = (await Promise.all([...pages.keys()].map(async file => (await stat(path.join(root, file))).size))).reduce((a,b) => a+b, 0);
console.log(JSON.stringify({pages: pages.size, searchEntries: index.length, checkedLocalLinks: checkedLinks, htmlBytes, errors: errors.length}, null, 2));
