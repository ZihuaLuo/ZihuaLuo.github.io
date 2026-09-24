import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { searchProjects } from "../src/data/searchProjects.ts";

const showcase = readFileSync(new URL("../src/components/ai/AILabShowcase.astro", import.meta.url), "utf8");
const searchPage = readFileSync(new URL("../src/pages/search-index.json.ts", import.meta.url), "utf8");
const searchModal = readFileSync(new URL("../src/components/SearchModal.astro", import.meta.url), "utf8");

test("search covers every visible AI Lab planet and only public direct pages", () => {
  const visibleIds = [...showcase.matchAll(/^\s+id: "([^"]+)",/gm)].map((match) => match[1]);
  assert.deepEqual(searchProjects.map((project) => project.id), visibleIds);
  assert.equal(new Set(searchProjects.map((project) => project.id)).size, visibleIds.length);
  const direct = searchProjects.flatMap((project) => project.direct ? [project.direct] : []);
  assert.equal(direct.length, 5);
  assert.equal(new Set(direct.map((page) => page.url)).size, direct.length);
  assert.equal(searchProjects.find((project) => project.id === "retention-lab")?.direct, undefined);
  assert.doesNotMatch(JSON.stringify(searchProjects), /Data Dashboard\.html|RA2 - Nooshin|\\Users\\/i);
  assert.match(searchPage, /\.\.\.projectItems/);
  assert.match(searchModal, /dashboard: "Open dashboard"/);
  assert.match(searchModal, /game: "Play game"/);
});
