import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getProfileAnswer } from '../src/data/aiProfile.ts';
import { searchProjects } from '../src/data/searchProjects.ts';

test('resume requests explain availability and offer a real contact link', () => {
  for (const question of [
    "Where can I download Zihua's Resume?", 'Can I get his CV?',
    'Is a downloadable résumé available?', 'Can you send me his resume PDF?',
    "Where is Zihua's curriculum vitae?", 'resume', 'cv',
    '哪里可以下载Zihua的简历？', '能把简历发给我吗？',
  ]) {
    for (const previous of [undefined, 'strengths', 'education']) {
      const answer = getProfileAnswer(question, previous);
      assert.equal(answer.topicId, 'resume_request', question);
      assert.match(answer.text, /does not currently provide a downloadable resume/);
      assert.equal(answer.link?.href, '/#about-connect-title');
      assert.doesNotMatch(answer.link!.href, /\.pdf|\.docx/);
    }
  }
  assert.equal(getProfileAnswer('Can I download it?', 'resume_request').topicId, 'resume_request');
  assert.equal(getProfileAnswer('Tell me more', 'resume_request').link?.href, '/#about-connect-title');
  assert.equal(getProfileAnswer('Walk me through his resume').topicId, 'background');
});

test('contact and opportunity questions never invent availability or send a message', () => {
  for (const question of ['How can I contact him?', 'How to connect with Zihua?', 'I want to email Zihua', '怎么联系Zihua？']) {
    assert.equal(getProfileAnswer(question).topicId, 'public_contact', question);
    assert.equal(getProfileAnswer(question).link?.href, '/#about-connect-title');
  }
  for (const question of ['I want to hire Zihua', 'Can I collaborate with him?', 'Is he available for research collaboration?', '想找他合作']) {
    const answer = getProfileAnswer(question);
    assert.equal(answer.topicId, 'collaboration_contact', question);
    assert.match(answer.text, /cannot confirm his current availability/);
    assert.equal(answer.link?.href, '/#about-connect-title');
  }
  for (const question of ['Can you send him a message?', 'Can you send my CV to Zihua?', 'Can you schedule a call with Zihua?', 'Please arrange a meeting', '帮我转告Zihua']) {
    const answer = getProfileAnswer(question);
    assert.equal(answer.topicId, 'message_request', question);
    assert.match(answer.text, /cannot send or forward messages/);
    assert.equal(answer.link?.href, '/#about-connect-title');
  }
});

test('project actions open the published destination while private research stays an overview', () => {
  for (const project of searchProjects) {
    const answer = getProfileAnswer(`Open ${project.title}`, 'resume_request');
    assert.equal(answer.link?.href, project.direct?.url ?? `/ai/?project=${project.id}#ai-lab-title`, project.title);
  }
  assert.equal(getProfileAnswer('Play Cloudline').link?.href, '/projects/cloudline.html');
  assert.equal(getProfileAnswer('打开加拿大电力仪表盘').link?.href, '/projects/canadian-provincial-electricity-dashboard.html');
  const privateDashboard = getProfileAnswer('Can I access the Volunteer Retention Dashboard?');
  assert.match(privateDashboard.text, /not publicly available because of data privacy/);
  assert.equal(privateDashboard.link?.href, '/ai/?project=retention-lab#ai-lab-title');
  assert.equal(getProfileAnswer('Where can I view dashboards?').link?.href, '/ai/#ai-lab-title');
});

test('unpublished materials and basic site help provide an honest next step', () => {
  for (const question of ['Where can I download the raw data?', 'Can I get the source code?', 'Where is the GitHub repository?', '哪里下载原始数据？']) {
    const answer = getProfileAnswer(question);
    assert.equal(answer.topicId, 'research_materials', question);
    assert.match(answer.text, /may not be shareable/);
    assert.equal(answer.link?.href, '/#about-connect-title');
  }
  for (const question of ['How do I use this website?', 'How do I search the site?', '怎么使用这个网站？']) {
    const answer = getProfileAnswer(question);
    assert.equal(answer.topicId, 'website_help', question);
    assert.match(answer.text, /Search button/);
  }
  assert.equal(getProfileAnswer('Where is the website GitHub repository?').link?.href, 'https://github.com/ZihuaLuo/ZihuaLuo.github.io');
  assert.equal(getProfileAnswer('What is his phone number?', 'resume_request').link, undefined);
  assert.equal(getProfileAnswer('他的家庭住址是什么？').link, undefined);
  assert.equal(getProfileAnswer('How did he handle missing fund returns?').topicId, 'fund_data_quality');
  for (const question of ['Where did he get the data for fund research?', 'How does he access raw data?']) {
    assert.notEqual(getProfileAnswer(question).topicId, 'research_materials', question);
  }
});
