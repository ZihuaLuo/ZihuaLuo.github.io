import assert from "node:assert/strict";
import test from "node:test";
import { prepareSearchItem, rankSearchItems } from "../src/scripts/searchMatcher.js";

const item = (title: string, searchContent: string, aliases: string[] = []) => prepareSearchItem({
  title, searchContent, aliases, description: "Research dashboard", category: "Project", tags: [], type: "project", date: "2026", url: "/ai/", language: "en",
});

test("search ranks exact project matches before weak body matches", () => {
  const entries = [
    item("Corporate Scandal Research", "corporate scandal response research"),
    item("Other Research", "corporate reporting and unrelated scandal notes"),
  ];
  const result = rankSearchItems(entries, "Corporate Scandal");
  assert.equal(result.matches[0].title, "Corporate Scandal Research");
  assert.equal(result.total, 1);
});

test("search handles punctuation, Chinese aliases, years, and short exact terms", () => {
  const entries = [
    item("Non-Compete 10-K Research", "non compete 10 k annotations", ["竞业禁止"]),
    item("Canadian Electricity Research", "canadian provincial electricity", ["加拿大电力"]),
  ];
  assert.equal(rankSearchItems(entries, "noncompete").total, 0);
  assert.equal(rankSearchItems(entries, "Non-Compete").matches[0].title, "Non-Compete 10-K Research");
  assert.equal(rankSearchItems(entries, "加拿大电力").matches[0].title, "Canadian Electricity Research");
  assert.equal(rankSearchItems(entries, "2026").total, 2);
  assert.equal(rankSearchItems(entries, "ai").total, 0);
  assert.equal("searchContent" in entries[0], false);
});
