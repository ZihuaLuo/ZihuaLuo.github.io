import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
const logo = read("../src/components/TheCutLogo.astro");
const mark = read("../src/components/BrandMark.astro");
const header = read("../src/components/Header.astro");
const chat = read("../src/components/ai/FutureChat.astro");
const avatar = read("../src/components/AvatarCard.astro");
const favicon = read("../public/favicon.svg");
const favicon16 = read("../public/favicon-16.svg");
const favicon32 = read("../public/favicon-32.svg");
const seo = read("../src/components/SEO.astro");
const styles = read("../src/styles/global.css");

test("The Cut is an accessible reusable inline SVG with isolated paint IDs", () => {
  assert.match(logo, /size\?: number \| string/);
  assert.match(logo, /className\?: string/);
  assert.match(logo, /viewBox="0 0 64 64"/);
  assert.match(logo, /aria-label=\{decorative \? undefined : "The Cut logo"\}/);
  assert.match(logo, /aria-hidden=\{decorative \? "true" : undefined\}/);
  assert.match(logo, /randomUUID\(\)/);
  assert.doesNotMatch(logo, /<text\b|<image\b|<circle\b|<ellipse\b/);
});

test("every personal-brand instance uses The Cut, including the chat badge and photo fallback", () => {
  assert.match(mark, /<TheCutLogo size="100%" decorative/);
  assert.match(chat, /<TheCutLogo size="100%" decorative/);
  assert.match(avatar, /<TheCutLogo size="100%"/);
  assert.doesNotMatch(logo + mark + chat + avatar + favicon, /HorizonLogo|horizon-logo|\bLZ\b|\bZL\b|apocalypse-corona|apocalypse-orbit/);
  assert.equal(existsSync(new URL("../src/components/HorizonLogo.astro", import.meta.url)), false);
  assert.match(chat, /<ChatRobotIcon/);
});

test("header and chat keep their original slots, text and responsive layout", () => {
  assert.match(mark, /sm: "h-10 w-10"/);
  assert.match(header, /<BrandMark size="sm" dark decorative \/>/);
  assert.match(header, /class="group flex min-w-0 items-center gap-3" aria-label=\{brandName\}/);
  assert.match(header, /const brandName = siteInfo\.credentialedEnglishName/);
  assert.match(header, /const brandLine = "Man Proposes, God Disposes"/);
  assert.match(header, /min-h-\[70px\].*sm:min-h-\[78px\]/);
  assert.match(header, /class="hidden leading-tight sm:block"/);
  assert.match(header, /data-menu-button/);
  assert.match(styles, /@media \(max-width: 639px\)\s*\{\s*\.brand-mark svg\s*\{\s*width: 90%;/);
  assert.match(chat, /width: 2\.45rem;\s*height: 2\.45rem;/);
  assert.match(chat, />APOCALYPSE<\/h2>/);
});

test("16px and 32px assets use size-specific drawings with the same diagonal incision", () => {
  const opening = (svg: string) => svg.match(/data-cut-opening(?:="")? d="([^"]+)"/)?.[1];
  const getPoints = (path: string) => [...path.matchAll(/(?:M|L)([\d.]+) ([\d.]+)/g)].map(m => [Number(m[1]), Number(m[2])]);
  const widths = [64, 32, 16];
  const drawings = [logo, favicon32, favicon16].map((svg, i) => {
    const path = opening(svg);
    assert.ok(path);
    const points = getPoints(path);
    assert.deepEqual(points[0].map(v => v / widths[i]), [14 / 64, 50 / 64]);
    assert.deepEqual(points[2].map(v => v / widths[i]), [50 / 64, 14 / 64]);
    return Math.hypot(points[1][0] - points[3][0], points[1][1] - points[3][1]) / widths[i];
  });
  assert.ok(drawings[2] > drawings[1]);
  assert.ok(drawings[1] > drawings[0]);
  assert.match(favicon16, /width="16" height="16" viewBox="0 0 16 16"/);
  assert.match(favicon32, /width="32" height="32" viewBox="0 0 32 32"/);
  assert.doesNotMatch(favicon16 + favicon32, /<filter|<feGaussianBlur|<animate/);
  for (const svg of [favicon16, favicon32]) assert.ok(favicon.includes(opening(svg)!));
});

test("tab links select the new icon family without changing the page title", () => {
  assert.match(favicon, /@media \(max-width: 20px\)/);
  assert.match(favicon, /\.cut-regular \{ display: none; \}/);
  assert.match(favicon, /\.cut-compact \{ display: inline; \}/);
  for (const asset of ["favicon.svg", "favicon-16.png", "favicon-32.png"]) {
    assert.ok(seo.includes(`/${asset}?v=the-cut-1`));
  }
  assert.match(seo, /<title>\{title\}<\/title>/);
});

test("PNG fallbacks are generated at native favicon sizes", () => {
  for (const size of [16, 32]) {
    const png = readFileSync(new URL(`../public/favicon-${size}.png`, import.meta.url));
    assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
  }
});

test("brand has only restrained hover feedback, no whole-icon blur or looping animation", () => {
  const markStyles = styles.slice(styles.indexOf(".brand-mark {"), styles.indexOf(".finance-hero,"));
  assert.doesNotMatch(markStyles, /drop-shadow|box-shadow|::after/);
  assert.doesNotMatch(logo, /<animate|@keyframes|rotate\(|scale\(/);
  assert.match(logo, /filter: brightness\(1\.1\)/);
  assert.match(logo, /prefers-reduced-motion: reduce/);
});
