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
  let canonical;
  visit(parse(html), node => {
    const attrs = Object.fromEntries((node.attrs || []).map(attr => [attr.name, attr.value]));
    if (attrs.id) {
      if (ids.has(attrs.id)) errors.push(`${relative(file)}: duplicate id ${attrs.id}`);
      ids.add(attrs.id);
      const classes = attrs.class?.split(/\s+/) || [];
      if (classes.includes('experience-entry') || classes.includes('education-profile--timeline')) experienceCards.add(attrs.id);
      if ('data-credit-card' in attrs) creditCards.add(attrs.id);
    }
    if (attrs.rel === 'canonical') canonical = attrs.href;
    for (const attr of ['href', 'src', 'poster']) if (attrs[attr]) links.push(attrs[attr]);
  });
  pages.set(relative(file), {ids, links, canonical, experienceCards, creditCards});
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
const indexedChatTopics = new Set(index.filter(item => item.type === 'chatbot').map(item => new URL(item.url, origin).searchParams.get('ask')).filter(Boolean));
for (const topic of profileTopics) if (!indexedChatTopics.has(topic.id)) errors.push(`search-index.json: missing chatbot topic ${topic.id}`);
for (const id of indexedChatTopics) if (!profileTopics.some(topic => topic.id === id)) errors.push(`search-index.json: extra chatbot topic ${id}`);
for (const retired of ['images/chat-super-nono-smile.png', 'images/project-constellation-reference.png']) {
  if (allPaths.has(retired)) errors.push(`Retired development asset shipped: ${retired}`);
}
assert.equal(errors.length, 0, [...new Set(errors)].join('\n'));
const htmlBytes = (await Promise.all([...pages.keys()].map(async file => (await stat(path.join(root, file))).size))).reduce((a,b) => a+b, 0);
console.log(JSON.stringify({pages: pages.size, searchEntries: index.length, checkedLocalLinks: checkedLinks, htmlBytes, errors: errors.length}, null, 2));
