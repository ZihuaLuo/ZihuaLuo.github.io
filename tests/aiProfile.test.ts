import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getProfileAnswer, suggestedProfileQuestions, profileTopics } from '../src/data/aiProfile.ts';

const cases = {
  year: 'education', gender: 'public_gender', strengths: 'strengths',
  "Zihua’s Strengths?": 'strengths', 'working style': 'work_style', teammates: 'ideal_teammates',
  thinking: 'thinking', email: 'public_contact', linkedin: 'public_contact', ins: 'public_contact',
};
for (const [question, topic] of Object.entries(cases)) test(`chat resolves ${question}`, () => {
  assert.equal(getProfileAnswer(question).topicId, topic);
});
test('every topic label resolves to its own topic ID', () => {
  for (const topic of profileTopics) {
    assert.equal(getProfileAnswer(topic.label).topicId, topic.id, topic.label);
  }
});
test('suggested questions resolve to their intended topics; FAQ answers are distinct', () => {
  const expectedTopics = new Map([
    ["Zihua's Strengths?", 'strengths'],
    ['His Approach To AI?', 'ai_approach'],
    ['His Working Style?', 'work_style'],
    ['Ideal Teammates?', 'ideal_teammates'],
    ['What Motivates Him?', 'values'],
    ['Ideal Supervisor?', 'ideal_supervisor'],
  ]);
  for (const question of suggestedProfileQuestions) {
    assert.equal(getProfileAnswer(question).topicId, expectedTopics.get(question), question);
  }
  const answers = suggestedProfileQuestions.map(question => getProfileAnswer(question).text);
  assert.equal(new Set(answers).size, answers.length);
});
test('thinking and public contact queries retain the expected section navigation', () => {
  assert.equal(getProfileAnswer('thinking').link?.href, '/writing/');
  for (const query of ['email', 'linkedin', 'ins']) assert.equal(getProfileAnswer(query).link?.href, '/about/#about-connect-title');
  assert.match(getProfileAnswer('year').text, /2026.*Year 5.*McMaster/);
});

test('follow-up questions use the previous topic detail and navigation', () => {
  const topic = profileTopics.find(topic => topic.id === 'thinking');
  assert.ok(topic);
  const answer = getProfileAnswer('Tell me more', topic.id);
  assert.equal(answer.topicId, topic.id);
  assert.equal(answer.text, topic.detail);
  assert.notEqual(answer.text, topic.answer);
  assert.equal(answer.link?.href, '/writing/');
});

test('private questions override previous topic context', () => {
  for (const question of ['salary', 'phone number', 'private address', 'relationship status']) {
    const answer = getProfileAnswer(question, 'strengths');
    assert.equal(answer.topicId, undefined, question);
    assert.equal(answer.link, undefined, question);
    assert.match(answer.text, /cannot help with other private or sensitive details/i, question);
    assert.notEqual(answer.text, profileTopics.find(topic => topic.id === 'strengths')?.detail, question);
  }
});
