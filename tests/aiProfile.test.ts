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
test('all topic labels and FAQ prompts resolve; FAQ answers are distinct', () => {
  for (const question of [...profileTopics.map(topic => topic.label), ...suggestedProfileQuestions]) {
    assert.ok(getProfileAnswer(question).topicId, question);
  }
  const answers = suggestedProfileQuestions.map(question => getProfileAnswer(question).text);
  assert.equal(new Set(answers).size, answers.length);
});
test('thinking and public contact queries retain the expected section navigation', () => {
  assert.equal(getProfileAnswer('thinking').link?.href, '/writing/');
  for (const query of ['email', 'linkedin', 'ins']) assert.equal(getProfileAnswer(query).link?.href, '/about/#about-connect-title');
  assert.match(getProfileAnswer('year').text, /2026.*Year 5.*McMaster/);
});
