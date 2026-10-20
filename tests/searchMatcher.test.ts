import assert from "node:assert/strict";
import test from "node:test";
import { normalizeSearchValue, prepareSearchItem, rankSearchItems } from "../src/scripts/searchMatcher.js";

const item = (title: string, searchContent: string, aliases: string[] = []) => prepareSearchItem({
  title, searchContent, aliases, description: "Research dashboard", category: "Project", tags: [], type: "project", date: "2026", url: "/ai/", language: "en",
});

test("search ranks exact project matches before weak body matches", () => {
  const entries = [
    item("Corporate Scandal Research", "corporate scandal response research"),
    item("Other Research", "corporate scandal response notes"),
  ];
  const result = rankSearchItems(entries, "Corporate Scandal");
  assert.equal(result.matches[0].title, "Corporate Scandal Research");
  assert.equal(result.matches[1].title, "Other Research");
  assert.equal(result.total, 2);
});

test("search handles punctuation, Chinese aliases, years, and short exact terms", () => {
  const entries = [
    item("Non-Compete 10-K Research", "non compete 10 k annotations", ["竞业禁止"]),
    item("Canadian Electricity Research", "canadian provincial electricity", ["加拿大电力"]),
    item("AI Research", "artificial intelligence methods"),
    item("Chairperson Research", "chairperson hiring notes"),
  ];
  assert.equal(rankSearchItems(entries, "noncompete").total, 0);
  assert.equal(rankSearchItems(entries, "Non-Compete").matches[0].title, "Non-Compete 10-K Research");
  assert.equal(rankSearchItems(entries, "加拿大电力").matches[0].title, "Canadian Electricity Research");
  assert.equal(rankSearchItems(entries, "2026").total, 4);
  assert.equal(rankSearchItems(entries, "ai").matches[0].title, "AI Research");
  assert.equal(rankSearchItems(entries, "ai").total, 1);
  assert.equal(normalizeSearchValue("—?!"), "");
  assert.equal(rankSearchItems(entries, "—?!").total, 0);
  assert.equal("searchContent" in entries[0], false);
});

test("query lowercasing is locale-stable", () => {
  assert.equal(normalizeSearchValue("I"), "i");
});

test("all ranked matches remain available beyond the initial result limit", () => {
  const entries = Array.from({ length: 52 }, (_, index) => ({
    ...item(`Fund research ${String(index).padStart(2, '0')}`, 'fund research'),
    url: `/projects/fund-${index}/`,
  }));
  const firstBatch = rankSearchItems(entries, 'fund');
  const complete = rankSearchItems(entries, 'fund', entries.length);
  assert.equal(firstBatch.total, 52);
  assert.equal(firstBatch.matches.length, 12);
  assert.equal(complete.matches.length, 52);
  assert.deepEqual(complete.matches.slice(0, 12), firstBatch.matches);
  assert.equal(new Set(complete.matches.map(match => match.url)).size, 52);
  assert.equal(rankSearchItems(entries, 'no matching phrase', entries.length).matches.length, 0);
});
