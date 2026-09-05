import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { parse } from 'parse5';

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
  const links = [];
  let canonical;
  visit(parse(html), node => {
    const attrs = Object.fromEntries((node.attrs || []).map(attr => [attr.name, attr.value]));
    if (attrs.id) {
      if (ids.has(attrs.id)) errors.push(`${relative(file)}: duplicate id ${attrs.id}`);
      ids.add(attrs.id);
    }
    if (attrs.rel === 'canonical') canonical = attrs.href;
    for (const attr of ['href', 'src', 'poster']) if (attrs[attr]) links.push(attrs[attr]);
  });
  pages.set(relative(file), {ids, links, canonical});
}
const origin = new URL([...pages.values()].find(page => page.canonical)?.canonical || 'http://127.0.0.1:4321').origin;
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
for (const item of index) validateLink(item.url, 'search-index.json');
for (const retired of ['images/chat-super-nono-smile.png', 'images/project-constellation-reference.png']) {
  if (allPaths.has(retired)) errors.push(`Retired development asset shipped: ${retired}`);
}
assert.equal(errors.length, 0, [...new Set(errors)].join('\n'));
const htmlBytes = (await Promise.all([...pages.keys()].map(async file => (await stat(path.join(root, file))).size))).reduce((a,b) => a+b, 0);
console.log(JSON.stringify({pages: pages.size, searchEntries: index.length, checkedLocalLinks: checkedLinks, htmlBytes, errors: errors.length}, null, 2));
