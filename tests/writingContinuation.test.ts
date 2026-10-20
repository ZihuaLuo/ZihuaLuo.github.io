import assert from 'node:assert/strict';
import test from 'node:test';
import { getWritingContinuation } from '../src/data/writingContinuation.ts';

const essay = (id: string, date: string, tags: string[] = [], category = 'Finance', language = 'en', draft = false) => ({
  id, data: {date: new Date(date), tags, category, language, draft},
});

test('next follows archive order and related articles exclude the current and adjacent entries', () => {
  const latest = essay('latest', '2026-03-03', ['Risk']);
  const next = essay('next', '2026-03-02', ['Risk']);
  const sameTheme = essay('same-theme', '2026-02-01', ['risk'], 'Economic Thinking');
  const sameSeries = essay('same-series', '2026-03-01');
  const unrelated = essay('unrelated', '2026-04-01', ['Learning'], 'Cognition');
  const result = getWritingContinuation(latest, [latest, next, sameSeries, sameTheme, unrelated]);
  assert.equal(result.adjacent?.id, 'next');
  assert.equal(result.direction, 'next');
  assert.deepEqual(result.related.map(({entry}) => entry.id), ['same-theme', 'same-series']);
  assert.deepEqual(result.related[0].sharedTags, ['risk']);
});

test('the oldest essay offers a previous essay instead of a circular next link', () => {
  const newest = essay('newest', '2026-03-03');
  const oldest = essay('oldest', '2026-03-01');
  const result = getWritingContinuation(oldest, [oldest, newest]);
  assert.equal(result.direction, 'previous');
  assert.equal(result.adjacent?.id, 'newest');
  assert.equal(result.related.length, 0);
});

test('recommendations never expose drafts or another language and leave unrelated categories out', () => {
  const current = essay('current', '2026-03-03', ['Risk']);
  const result = getWritingContinuation(current, [
    current, essay('draft', '2026-03-02', ['Risk'], 'Finance', 'en', true),
    essay('other-language', '2026-03-01', ['Risk'], 'Finance', 'zh'),
    essay('unrelated', '2026-03-01', [], 'Cognition'),
  ]);
  assert.equal(result.adjacent, undefined);
  assert.equal(result.related.length, 0);
});

test('equal dates retain the archive tie order without repeating any destination', () => {
  const entries = ['a', 'b', 'c', 'd', 'e'].map(id => essay(id, '2023', ['Judgment']));
  const result = getWritingContinuation(entries[1], entries);
  assert.equal(result.adjacent?.id, 'c');
  const destinations = [result.adjacent?.id, ...result.related.map(({entry}) => entry.id)];
  assert.equal(new Set(destinations).size, destinations.length);
  assert.ok(!destinations.includes('b'));
  assert.equal(result.related.length, 2);
});

test('a one-essay series offers shared-theme reading without inventing a next essay', () => {
  const current = essay('only-business-case', '2026-04-03', ['Risk'], 'Business Cases');
  const first = essay('risk-one', '2026-03-03', ['Risk']);
  const second = essay('risk-two', '2026-03-02', ['Risk']);
  const result = getWritingContinuation(current, [current, first, second]);
  assert.equal(result.adjacent, undefined);
  assert.deepEqual(result.related.map(({entry}) => entry.id), ['risk-one', 'risk-two']);
});
