import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { getProfileAnswer, profileTopics, profileCorpusRevision } from '../src/data/aiProfile.ts';

// Representative wording from the v2 interview answers, plus visitor phrasing.
const routes: Record<string, string> = {
  'Tell me about yourself': 'background',
  'Walk me through your resume': 'background',
  'What is his innovation minor?': 'innovation_minor',
  'What is your Innovation minor and what have you learned from it?': 'innovation_minor',
  "Why does he want a master's degree?": 'graduate_study',
  "With AI making learning more accessible, why do you still want a master's degree?": 'graduate_study',
  'What is his long term career goal?': 'career_goals',
  'Why did he choose TD Asset Management?': 'tough_decision',
  'How does he learn quickly?': 'learning',
  'Tell me about his mutual fund and ETF project': 'fund_similarity',
  'RA5': 'fund_similarity',
  'Tell me about his research with John Maheu': 'fund_similarity',
  'What did he learn from Professor John Maheu about funds?': 'fund_similarity',
  'How did he handle missing fund returns?': 'fund_data_quality',
  'Why not replace missing returns with zero?': 'fund_data_quality',
  'How did he compare funds with different lengths of return history?': 'fund_common_window',
  'What is the difference between a silhouette score and an adjusted Rand index?': 'clustering_validation',
  'Why did you choose K-means as the initial benchmark?': 'clustering_validation',
  'How can two funds have similar return distributions but low correlation?': 'fund_distributions',
  'Why did he use both KDE and Wasserstein distance?': 'fund_distributions',
  'What did he do in the Canadian electricity project?': 'electricity_research',
  'How did he debug his electricity SQL query?': 'electricity_sql',
  'How did he check annual electricity totals?': 'electricity_sql',
  'Tell me about his Finance PhD research': 'phd_research',
  'What did he learn from the food bank research?': 'volunteer_research',
  'Tell me about non-compete research': 'disclosure_research',
  'What would you do if you discovered an error after submitting?': 'post_submission_error',
  "What would you do if your analysis disagreed with the team's view?": 'analysis_disagreement',
  'What if he were asked to present a stronger conclusion than the evidence supports?': 'evidence_integrity',
  'How would you deliver bad news?': 'delivering_bad_news',
  'How would you show leadership without being the team leader?': 'influence_without_authority',
  'How would you delegate an important task?': 'delegating_work',
  'What would he do if someone took credit for his work?': 'fair_credit',
  'Would you help a classmate competing for the same opportunity?': 'helping_competitor',
  'How would he decide whether to keep working or change direction?': 'changing_direction',
  'How would he handle a request to share confidential information?': 'confidentiality',
  'How would you hand over a project?': 'project_handover',
  'What if he was not selected for an opportunity?': 'rejection',
  'What would he do if someone misunderstood what he said?': 'misunderstanding',
  'How would he choose between a proven approach and a new idea?': 'tested_innovation',
  'What is the positive impact of generative AI?': 'ai_benefits',
  'Can you give an example of how he used AI in research?': 'ai_research',
  'How does he make sure AI supports learning rather than replacing it?': 'ai_learning',
  'Would you rely on AI to make an investment decision?': 'ai_investment',
  'What if AI gave you an answer that contradicted your own analysis?': 'ai_disagreement',
  'What misconceptions do people have about Zihua?': 'misconceptions',
};

test('v2 interview questions resolve independently of an unrelated previous topic', () => {
  const failures: Array<{question: string; expected: string; actual?: string}> = [];
  for (const [question, expected] of Object.entries(routes)) {
    const direct = getProfileAnswer(question).topicId;
    const afterContext = getProfileAnswer(question, 'career_goals').topicId;
    if (direct !== expected) failures.push({question, expected, actual:direct});
    if (afterContext !== expected) failures.push({question:`${question} after another topic`, expected, actual:afterContext});
  }
  assert.deepEqual(failures, []);
});

test('v2 profile facts agree across overview, education, minor shortcuts, and career answers', () => {
  assert.equal(profileCorpusRevision, '2026-10-20-interview-v2-visitor-help');
  assert.equal(profileTopics.length, 132);
  assert.equal(new Set(profileTopics.map(t => t.id)).size, profileTopics.length);
  for (const question of ['Tell me about yourself', 'education', 'minors', 'What are his minors?']) {
    const text = getProfileAnswer(question).text;
    for (const minor of ['Economics', 'Mathematics', 'Innovation']) assert.ok(text.includes(minor), `${question}: ${minor}`);
  }
  const career = getProfileAnswer('career goals');
  assert.match(career.text, /portfolio manager/);
  assert.match(career.text, /investment research analyst/);
  assert.match(career.text, /Graduate study/);
  assert.doesNotMatch(career.text, /less about locking himself into one title/);
});

test('new research answers preserve scope and navigate only to public destinations', () => {
  assert.equal(getProfileAnswer('Who is John Maheu?').topicId, 'acknowledgements');
  assert.equal(getProfileAnswer('fund similarity research').link?.href, '/projects/fund-similarity-dashboard/');
  assert.equal(getProfileAnswer('Canadian electricity research').link?.href, '/projects/canadian-provincial-electricity-dashboard.html');
  assert.equal(getProfileAnswer('volunteer engagement research').link?.href, '/ai/?project=retention-lab#ai-lab-title');
  assert.match(getProfileAnswer('common-window fund comparisons').text, /6,863.*120 months/);
  const volunteer = profileTopics.find(t => t.id === 'volunteer_research')!;
  assert.match(volunteer.answer, /private/);
  assert.match(volunteer.detail, /not proof/);
  assert.match(profileTopics.find(t => t.id === 'fund_distributions')!.detail, /does not establish/);
  assert.doesNotMatch(JSON.stringify(profileTopics), /C:\\Users|面试文档|insert takeaway|\[Position\]|\[Name\]|work visa|no overtime pay/);
});

test('follow-ups retain context while substantive example or evidence questions change topics', () => {
  const goal = profileTopics.find(t => t.id === 'career_goals')!;
  for (const question of ['Tell me more', 'Can you give me an example?', 'More detail please', 'Why is that?']) {
    assert.equal(getProfileAnswer(question, 'career_goals').text, goal.detail, question);
  }
  assert.equal(getProfileAnswer('Can you give an example of how he used AI in research?', 'career_goals').topicId, 'ai_research');
  assert.equal(getProfileAnswer('What if the evidence does not support a stronger conclusion?', 'career_goals').topicId, 'evidence_integrity');
});

test('personal income stays private without blocking investment-fund income questions', () => {
  for (const question of ['income', 'What is his monthly income?', 'How much does Zihua earn?', 'salary']) {
    assert.match(getProfileAnswer(question, 'fund_accounting').text, /cannot help with other private or sensitive details/);
  }
  assert.equal(getProfileAnswer('What did he do with fixed income at TD?').topicId, 'asset_management');
});

test('search requests a fresh index when the reviewed corpus revision changes', () => {
  const modal = readFileSync(new URL('../src/components/SearchModal.astro', import.meta.url), 'utf8');
  assert.match(modal, /const searchIndexRevision = profileCorpusRevision/);
});
