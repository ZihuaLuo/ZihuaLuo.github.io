import { creditEntries, creditEntryAnchor, type CreditEntry } from "./credits.ts";

export type ProfileTopic = {
  id: string;
  label: string;
  keywords: string[];
  phrases?: string[];
  answer: string;
  detail: string;
};

export type ProfileLink = {
  href: string;
  label: string;
};

export type ProfileAnswer = {
  text: string;
  topicId?: string;
  link?: ProfileLink;
};

export const suggestedProfileQuestions = [
  "Zihua's Strengths?",
  "His Approach To AI?",
  "His Working Style?",
  "Ideal Teammates?",
  "What Motivates Him?",
  "Ideal Supervisor?",
];

const profileOverview =
  "A simple way to describe Zihua is that he likes turning difficult questions into useful work. His background brings together finance, research, data, and applied AI. He is completing an Honours Bachelor of Commerce at McMaster University, has worked with TD Asset Management and CIBC Mellon, and has supported several university research projects. Across all of those experiences, he has been curious, dependable, and thoughtful about the people who will actually use his work.";

const privateInformationResponse =
  "I can share a few public basics about Zihua, such as his age, gender, and university, but I cannot help with other private or sensitive details. You can ask about his experience, personality, strengths, growth areas, preferred teammates or supervisor, feedback style, career goals, research, technical skills, values, or approach to AI.";

const assistantScopeResponse =
  "I'm Zihua's dedicated assistant. I'm here to help visitors learn about him, including his experience, personality, thinking, work style, projects, and approach to AI. You could try asking, \"What is Zihua like to work with?\" or \"What motivates him?\"";

export const profileTopics: ProfileTopic[] = [
  {
    id: "background",
    label: "background",
    keywords: ["background", "profile", "overview", "introduce", "biography", "bio"],
    phrases: ["who is zihua", "tell me about zihua", "professional story", "career story"],
    answer: profileOverview,
    detail:
      "What connects his experiences is a practical way of thinking. Fund reporting and valuation work taught him to be precise and accountable. Research taught him how to bring structure to messy information. AI has become another tool in that process, but he still believes a person should understand the reasoning and own the final result.",
  },
  {
    id: "thinking",
    label: "thinking and writing",
    keywords: ["thinking", "thought", "thoughts", "idea", "ideas", "writing", "essay", "essays", "article", "articles", "reflection", "reflections"],
    phrases: ["his thinking", "zihuas thinking", "how does he think", "what does he think about", "where can i read his writing", "show me his writing"],
    answer:
      "Zihua's thinking is best explored through his Writing section. It brings together his reflections on cognition, economic thinking, finance, and business cases, and shows how he works through evidence, trade-offs, incentives, and judgment rather than reducing his perspective to a single slogan.",
    detail:
      "Across his writing, Zihua tends to start with a practical question, challenge the first intuitive answer, and look for the incentives, constraints, or missing evidence underneath it. The archive is the clearest way to see how that reasoning develops across different subjects.",
  },
  {
    id: "current",
    label: "current focus",
    keywords: ["current", "today", "now", "present", "focus"],
    phrases: ["what is he doing", "current role", "current focus"],
    answer:
      "Right now, Zihua is completing his final year at McMaster University's DeGroote School of Business while continuing research work in finance. He is especially interested in bringing financial analysis, careful research, and AI tools together to solve real investment and decision-making problems.",
    detail:
      "He does not see finance, research, and AI as separate interests. He is trying to build enough depth in each one to connect sound judgment, reliable data, and clear communication in the same piece of work.",
  },
  {
    id: "education",
    label: "education",
    keywords: ["education", "school", "college", "university", "degree", "gpa", "course", "study", "mcmaster", "degroote", "student"],
    phrases: ["academic background", "what did he study", "what does he study", "where does he study"],
    answer:
      "Zihua is completing an Honours Bachelor of Commerce with Internship at McMaster University's DeGroote School of Business and expects to graduate in Spring 2027. His major is Finance, and his minors are Mathematics and Economics. He has a 3.89 out of 4.00 cumulative GPA, made the Dean's Honour List from 2022 to 2025, and ranked in DeGroote's top 10% during those years.",
    detail:
      "Economics is his favorite university subject. His coursework also includes financial modelling, big data in finance, financial risk management, statistics, linear algebra, and multivariable calculus. It is a good reflection of how he learns. He likes strong fundamentals, quantitative tools, and enough breadth to connect ideas across disciplines.",
  },
  {
    id: "credentials",
    label: "professional credentials",
    keywords: ["cfa", "frm", "credential", "certification", "charterholder", "qualification", "exam"],
    phrases: ["professional credentials", "finance exams"],
    answer:
      "Zihua became an FRM Charterholder in January 2025 and passed the CFA Level II exam in June 2026. He is proud of those milestones, but the titles are not the main point for him. What matters is being able to use financial and risk concepts to investigate real problems and make better decisions.",
    detail:
      "Preparing for those exams alongside school, internships, and research also taught him a lot about discipline. He tends to connect abstract ideas to real capital-markets cases because that is how the knowledge becomes useful rather than something he has simply memorized.",
  },
  {
    id: "asset_management",
    label: "asset-management experience",
    keywords: ["td", "asset", "management", "valuation", "oversight", "mrfp", "statement", "fund"],
    phrases: ["td asset management", "fund valuation oversight", "financial reporting"],
    answer:
      "At TD Asset Management, Zihua worked on investment-fund financial statements, valuation oversight, and MRFP reporting across fixed income, derivatives, fund-of-funds, and other multi-asset products. Much of the job came down to careful review. He checked NAV figures, valuation records, disclosures, and supporting schedules, then followed exceptions until the correction was actually confirmed.",
    detail:
      "That role strengthened his sense of ownership. During busy reporting periods, he used Excel-based exception reviews to focus on unusual movements and kept track of several deadlines at once. If he raised an issue, he checked the revised material himself instead of assuming someone else had fixed it.",
  },
  {
    id: "fund_accounting",
    label: "fund-accounting experience",
    keywords: ["cibc", "mellon", "nav", "accounting", "reconciliation", "custodian", "broker", "institutional"],
    phrases: ["cibc mellon", "fund accountant", "institutional funds"],
    answer:
      "At CIBC Mellon, Zihua helped deliver daily NAVs for eight institutional funds with more than $3 billion in assets under management. The deadlines were tight, so he had to stay calm while reconciling pricing, FX, cash, accruals, corporate actions, and positions. He also worked with custodians and brokers to investigate breaks and explain the results clearly to clients.",
    detail:
      "One issue required him to trace a discrepancy across systems that used different formats and cutoff times. He eventually found a late corporate-action adjustment, coordinated the correction, and confirmed the result in time for the NAV delivery. It is a good example of how he combines technical care with calm communication.",
  },
  {
    id: "research",
    label: "research experience",
    keywords: ["research", "dataset", "database", "professor", "phd", "publication", "scandal", "volunteer", "retention"],
    phrases: ["research assistant", "research projects", "data research"],
    answer:
      "Zihua's research has covered a surprisingly wide range of questions, from finance PhD outcomes and food-bank volunteer engagement to non-compete disclosures and corporate scandals. The common thread is hands-on data work. He builds datasets from several sources, cleans and checks the records, studies the patterns, and turns the findings into dashboards or visual reports that people can use.",
    detail:
      "Some of those projects involved more than 30 years of SEC filings, over 2,000 news articles, or more than 30 volunteer-engagement visualizations. He learned not to begin by building everything at once. He starts with the decision or research question, creates the smallest useful analysis, gets feedback, and expands from there.",
  },
  {
    id: "ai_approach",
    label: "approach to AI",
    keywords: ["ai", "artificial", "llm", "model", "prompt", "codex", "claude", "automation", "agent"],
    phrases: ["approach ai", "use ai", "think about ai", "thinking about ai", "thoughts on ai", "views on ai", "opinion on ai", "prompt the ai", "ai philosophy"],
    answer:
      "Zihua is excited about AI, but he does not trust it blindly. He usually breaks a large task into smaller pieces, tests the process on a realistic sample, and checks the output himself. If a case is unclear, he would rather pause for human judgment than scale a workflow that is fast but unreliable.",
    detail:
      "A research database project changed the way he works with AI. One broad prompt produced plenty of output, but the quality was inconsistent. He started treating the workflow more like coaching a junior analyst: explain one task clearly, inspect the evidence, give specific feedback, and keep a record of what works. His view is simple. AI can make the work faster, but a person still needs to understand the logic and take responsibility for the result.",
  },
  {
    id: "ai_reliability",
    label: "AI reliability and validation",
    keywords: ["reliable", "reliability", "accurate", "accuracy", "validate", "validation", "verify", "hallucination"],
    phrases: ["trust ai output", "check ai output", "ensure ai accuracy", "ensure ai output", "ai outputs are reliable", "reliable ai output", "validate ai", "quality control for ai"],
    answer:
      "Zihua never treats an AI output as the final answer. He starts with a realistic sample, compares the result with the original source, refines the instructions, and only scales the workflow after it performs consistently. He then checks for missing values, duplicates, unusual classifications, and formatting problems, while sending ambiguous cases to a person for review.",
    detail:
      "He used this process while building a research database. After the full dataset was complete, he traced selected records back to their sources to confirm accuracy and completeness. For him, AI quality comes from several layers of control, not from confidence in a single prompt.",
  },
  {
    id: "ai_prompting",
    label: "AI prompting workflow",
    keywords: ["prompt", "prompting", "instruction", "iterate", "iteration", "workflow"],
    phrases: ["prompt ai", "prompt the ai", "prompt to code", "write prompts", "use codex", "manage ai"],
    answer:
      "Zihua approaches prompting like managing a junior analyst. He explains the context and objective, divides the work into small tasks, reviews each result, and gives specific feedback about what is correct and what needs to change. Once a step works across several examples, he saves the prompt and applies the same tested process more broadly.",
    detail:
      "His first attempt at an AI-assisted research database asked the model to do too much at once, so the output was inconsistent. He rebuilt the process around one field, one rule, or one record type at a time and kept a progress log. That made the final workflow faster, more consistent, and easier to audit.",
  },
  {
    id: "human_advantage",
    label: "human advantage in an AI world",
    keywords: ["human", "humans", "replace", "replacement", "judgment", "will", "uncertainty", "unknown"],
    phrases: ["advantage of humans", "humans outperform ai", "ai replace people", "what humans do better", "human judgment"],
    answer:
      "Zihua thinks the human advantage is not simply being faster or more accurate. It is the willingness to act without certainty, take responsibility, and move beyond what past data can prove. AI can identify patterns, but people still decide which future is worth pursuing and accept the consequences of that choice.",
    detail:
      "This is why he sees judgment, imagination, conviction, and accountability as especially important. At the edge of an unfamiliar problem, someone still has to decide what matters, make a thoughtful assumption, and own the result. He wants AI to expand that human capacity rather than replace it.",
  },
  {
    id: "ai_risks",
    label: "AI risks and limitations",
    keywords: ["risk", "risks", "danger", "disadvantage", "limitation", "herding", "bias", "accountability"],
    phrases: ["risk of ai", "ai risk", "negative impact of ai", "disadvantage of ai", "ai limitation", "challenge of ai"],
    answer:
      "One risk Zihua watches closely is convergence. If many teams rely on similar models trained on similar information, their views can become alike without anyone examining the assumptions. In finance, that could reinforce crowded decisions and make market stress worse precisely when historical models are least dependable.",
    detail:
      "He also sees accountability as a hard boundary. An AI system can recommend an action, but it cannot accept legal or ethical responsibility when that action fails. His preferred safeguard is to keep a human decision-maker in the loop, test different scenarios and models, welcome competing views, and make ownership explicit.",
  },
  {
    id: "ai_ethics",
    label: "ethical use of AI",
    keywords: ["ethical", "ethics", "integrity", "plagiarism", "responsible", "responsibility", "academic"],
    phrases: ["ethical ai", "use ai ethically", "academic integrity", "responsible ai", "copy ai output"],
    answer:
      "Zihua uses AI as a learning and working partner, not as a substitute for his own reasoning. In academic work, he may ask for a framework or challenge an idea, but he checks the response, identifies gaps, and rebuilds the final analysis from his own understanding. The same principle applies professionally: AI can assist the process, while a person remains responsible for the evidence and conclusion.",
    detail:
      "He draws a clear line at presenting unexamined AI output as original work. His preferred process is to question the model, test its claims, add his own logic, and document how the result was validated. That preserves integrity while still benefiting from the tool's speed.",
  },
  {
    id: "strengths",
    label: "strengths",
    keywords: ["strength", "advantage", "best", "excel", "capability", "skill", "talent"],
    phrases: ["what is he good at", "what are zihuas strengths", "top strengths", "sets him apart", "stand out"],
    answer:
      "I would point to three things. Zihua learns quickly, stays steady when the pressure rises, and thinks carefully about what the person using his work actually needs. That last point matters. He does not stop at producing numbers. He asks what decision those numbers should support.",
    detail:
      "Those qualities work well together. Curiosity helps him ask better questions, discipline helps him finish the job, and empathy keeps the analysis relevant to the audience. People who have worked with him would also notice his attention to detail, reliability, ownership, and willingness to improve.",
  },
  {
    id: "personality",
    label: "personality",
    keywords: ["personality", "character", "person", "traits", "optimistic", "curious", "mindset", "attitude"],
    phrases: ["what is he like", "describe him", "personal qualities"],
    answer:
      "Zihua comes across as curious, optimistic, thoughtful, and quietly ambitious. He sets demanding goals for himself, but he is also willing to listen and change course. He asks for feedback, reflects honestly when something does not go well, and cares about whether his work is genuinely useful to other people.",
    detail:
      "He is analytical, but not detached. He enjoys breaking down hard problems and building systems, while also paying attention to personalities, trust, and how people feel. One belief that appears often in his choices is that action matters more than simply saying the right thing.",
  },
  {
    id: "work_style",
    label: "working style",
    keywords: ["working", "work", "style", "collaborative", "organized", "result", "team", "teammate"],
    phrases: ["working style", "work style", "strong teammate", "on a team", "team member"],
    answer:
      "Zihua likes teams to be open, organized, and focused on the result. He prefers clear responsibilities and regular check-ins, but he also wants people to feel comfortable raising concerns or suggesting a different approach. When he takes ownership of an issue, he follows it through instead of stopping at the first handoff.",
    detail:
      "As a teammate, he brings structure without losing empathy. If someone is struggling or disagrees with the direction, he first tries to understand why. From there, he looks for common ground and keeps the conversation focused on a solution, while still protecting the quality and timing of the final work.",
  },
  {
    id: "ideal_teammates",
    label: "preferred teammates",
    keywords: ["ideal", "prefer", "preferred", "teammates", "coworkers", "colleagues", "supportive", "accountable"],
    phrases: ["ideal team", "ideal teammate", "kind of teammates", "teammates does he prefer", "look for in teammates", "expect from a team"],
    answer:
      "Zihua works best with teammates who are collaborative, supportive, reliable, and accountable. He likes people who can discuss problems openly, ask for help without feeling judged, and follow through once responsibilities are agreed. He also values a result-oriented mindset because a good team still needs to deliver thoughtful work on time.",
    detail:
      "He does not expect everyone to think or work the same way. Different perspectives are useful when people explain their reasoning and stay committed to the shared goal. The team environment he enjoys most combines psychological safety with clear ownership.",
  },
  {
    id: "ideal_supervisor",
    label: "preferred supervisor",
    keywords: ["supervisor", "manager", "boss", "mentor", "guidance", "expectation"],
    phrases: ["ideal supervisor", "ideal manager", "kind of supervisor", "manager does he prefer", "expect from a supervisor", "work for a manager"],
    answer:
      "Zihua appreciates a supervisor who communicates expectations clearly, gives timely and specific feedback, and explains the reasoning behind important decisions. He also values someone who supports learning, especially when a new assignment stretches his technical or analytical skills.",
    detail:
      "He does not need constant direction. He prefers to investigate independently, bring focused questions, and take ownership of the work. The best relationship for him is one where the supervisor sets a high standard, makes room for questions, and offers candid guidance that helps him improve.",
  },
  {
    id: "workplace_priorities",
    label: "workplace priorities",
    keywords: ["workplace", "environment", "culture", "priority", "priorities", "important", "value"],
    phrases: ["important at work", "looks for in a job", "work environment", "workplace culture", "values at work", "three important things"],
    answer:
      "Three things matter most to Zihua at work: meaningful learning, a collaborative environment, and a constructive feedback culture. He wants work that develops his judgment through real responsibility, colleagues who help one another succeed, and feedback that is clear enough to act on.",
    detail:
      "He is attracted to environments where questions are welcome but accountability remains high. For him, a strong workplace is not one that avoids difficulty. It is one where people can face difficult work together, learn quickly, and improve the quality of the result.",
  },
  {
    id: "team_contribution",
    label: "contribution to a team",
    keywords: ["contribution", "contribute", "support", "dependable", "flexible", "reliable", "helpful"],
    phrases: ["contribute to the team", "bring to the team", "value to a team", "help his teammates", "role on a team"],
    answer:
      "Zihua wants to be the person a team can reliably build around. He takes care of his own responsibilities, pays attention when someone else is overloaded, and is willing to step into detailed or repetitive work when it protects the final result. His contribution is often quiet but practical: fewer loose ends, clearer information, and smoother execution.",
    detail:
      "He once described himself as a dependable screw in a complex machine. The point was not to make himself small, but to emphasize reliability. He wants teammates to know that if he accepts responsibility for something, he will follow it through carefully and speak up early if the plan needs to change.",
  },
  {
    id: "weaknesses",
    label: "weaknesses and growth areas",
    keywords: ["weakness", "weaknesses", "flaw", "disadvantage", "improve", "overthink", "overanalyze"],
    phrases: ["areas for improvement", "growth areas", "what is he working on", "biggest weakness", "top weaknesses"],
    answer:
      "Zihua has worked on three recurring tendencies. He used to pack his schedule too tightly, sometimes offered help before checking his own deadlines, and could overanalyze major decisions while looking for a perfect answer. He now leaves buffer time, sets clearer boundaries around extra work, and uses decision criteria and deadlines to keep analysis from turning into hesitation.",
    detail:
      "These lessons came from real situations. An unexpected system issue once collided with a lunch meeting because he had left no margin in the day. He has also learned that being supportive is only useful when his own commitments remain protected. He treats weaknesses as processes that can be redesigned, not fixed labels about his personality.",
  },
  {
    id: "burnout",
    label: "energy and burnout management",
    keywords: ["burnout", "overwhelmed", "energy", "rest", "balance", "overwork", "exhausted"],
    phrases: ["avoid burnout", "manage burnout", "work life balance", "protect his energy", "too much work"],
    answer:
      "Zihua thinks burnout often comes from losing control of priorities, not only from working long hours. He maps the non-negotiable deadlines first, leaves flexible blocks for unexpected work, and says no to commitments that do not support the most important goal at that moment.",
    detail:
      "He learned this while balancing six courses, professional exams, internships, research, and recruiting. Structure helped, but flexibility mattered just as much. His current system is designed to protect quality and energy instead of assuming every day will unfold exactly as planned.",
  },
  {
    id: "ownership",
    label: "ownership and dependability",
    keywords: ["ownership", "dependable", "reliable", "follow-through", "responsibility", "manager", "describe"],
    phrases: ["manager describe him", "take ownership", "follow through", "work reputation", "what colleagues say"],
    answer:
      "A manager would likely describe Zihua as detail-oriented, dependable, curious, and willing to take ownership. When he identifies an issue, he does not simply record it and move on. He tracks the correction, reviews the revised material, and confirms that the problem has actually been resolved.",
    detail:
      "At TD Asset Management, that meant managing review comments and outstanding items through busy reporting cycles. When something was unfamiliar, he first checked process documents, prior files, and review notes, then raised a focused question early if the evidence was still unclear. That balance of independence and escalation is central to how he works.",
  },
  {
    id: "conflict_resolution",
    label: "conflict resolution",
    keywords: ["conflict", "disagree", "disagreement", "difficult", "uncooperative", "noncooperation", "tension"],
    phrases: ["handle conflict", "team conflict", "difficult teammate", "coworker not cooperating", "resolve disagreement", "conflicting priorities"],
    answer:
      "When conflict appears, Zihua first tries to understand the reason behind it. He prefers a private conversation, listens for the other person's concern, and looks for common ground before debating the solution. If cooperation still breaks down, he protects the deadline, documents what has happened, and involves the wider team or supervisor when necessary.",
    detail:
      "In one group project, he took the most difficult analysis section but later had to finish references, formatting, and slides when others would not help. The project was delivered, but the experience changed his view of teamwork. Dividing tasks is not enough; people also need a shared commitment to the quality of the whole result.",
  },
  {
    id: "giving_feedback",
    label: "giving difficult feedback",
    keywords: ["feedback", "criticism", "correct", "mistake", "colleague", "respectful"],
    phrases: ["give feedback", "difficult feedback", "correct a teammate", "tell someone they are wrong", "changed someone opinion"],
    answer:
      "Zihua gives difficult feedback privately and focuses on the process rather than the person. He checks the evidence first, explains why the issue matters, and works through the correction with the other person. His goal is to protect the result without making the conversation feel personal or punitive.",
    detail:
      "At CIBC Mellon, he found a settlement mismatch in another intern's reconciliation report that could have affected NAV. He verified the data, reviewed it with the colleague, and helped trace the issue to a late trade entry. They corrected it before the client deadline, and he shared a small process improvement to reduce the chance of repetition.",
  },
  {
    id: "receiving_feedback",
    label: "receiving feedback",
    keywords: ["feedback", "advice", "skeptical", "listen", "receptive", "coachability"],
    phrases: ["receive feedback", "respond to feedback", "disagreed with feedback", "act on feedback", "open to feedback"],
    answer:
      "Zihua may test advice rather than accepting it automatically, but he is willing to act on feedback even when he is initially skeptical. He looks for a small, practical experiment that can reveal whether the suggestion has value, then keeps what works.",
    detail:
      "A friend once suggested building a simple to-do list because he was forgetting deadlines. He doubted it would add much beyond existing calendar tools, but tried it anyway. That small experiment eventually became an automated Excel productivity system with priorities, sorting, and progress tracking.",
  },
  {
    id: "adaptability",
    label: "adaptability",
    keywords: ["adaptability", "adapt", "change", "unexpected", "quick", "rotation", "new role"],
    phrases: ["last minute change", "think on his feet", "adapt quickly", "different roles", "new team", "handle change"],
    answer:
      "Zihua adapts by identifying what matters most when the original plan no longer fits. In a case competition, earlier speakers used more time than expected and left him only about 40 seconds. He cut secondary detail, reorganized his section around the essential message, and helped the team finish within the limit.",
    detail:
      "When entering a new role, he does something similar at a larger scale. He first learns what the team is trying to achieve, reviews existing materials, shadows experienced colleagues, and asks why the process works that way. Then he applies transferable skills without assuming that an old team's habits belong in the new one.",
  },
  {
    id: "leadership",
    label: "leadership",
    keywords: ["leadership", "leader", "lead", "motivate", "manage", "championship", "representative"],
    phrases: ["leadership style", "led a team", "motivate a team"],
    answer:
      "Zihua's leadership style is inclusive, but it is not vague. He gives people room to speak, then helps the group agree on clear goals and move toward a decision. In an FWD finance trainee program, that approach helped his team work through competing presentation ideas and finish as the winning group before management.",
    detail:
      "He has also worked in fast-moving student environments with more than 30 cross-faculty representatives serving over 1,000 incoming students. When plans change, his instinct is to keep everyone aligned, stay calm, and support the people under the most pressure without losing sight of the shared deadline.",
  },
  {
    id: "problem_solving",
    label: "problem solving",
    keywords: ["problem", "solve", "issue", "challenge", "investigate", "root", "ambiguous", "decision"],
    phrases: ["problem solving", "solve problems", "approach a challenge", "difficult task"],
    answer:
      "Zihua usually starts by slowing the problem down. He confirms what is actually wrong, gathers the underlying records, and tests the most likely explanations one at a time. If an assumption could affect the quality of the work, he raises it early. He also checks the result after a fix instead of assuming the problem is over.",
    detail:
      "He has used that approach in NAV reconciliations, financial-reporting reviews, research datasets, and process improvement. He likes to investigate independently first, ask focused questions when he reaches a real gap, and document the reasoning clearly enough that someone else can follow it.",
  },
  {
    id: "unfamiliar_tasks",
    label: "unfamiliar tasks and independence",
    keywords: ["unfamiliar", "unknown", "independent", "resources", "new", "learn", "figure"],
    phrases: ["task he does not know", "unfamiliar task", "limited resources", "work independently", "outside his job", "outside his comfort zone"],
    answer:
      "When Zihua receives an unfamiliar task, he first learns the structure of the problem before trying to produce an answer. He reviews reliable background material, studies several representative examples, builds a repeatable process, and records what he learns. If a remaining gap could affect accuracy, he asks a focused question instead of guessing.",
    detail:
      "His first research project on non-compete disclosures required him to work through long SEC filings without prior experience. He studied 10-K structures, compared sample filings, learned where relevant language usually appeared, and created a step-by-step method for recording evidence. The result was both a completed assignment and a reusable research workflow.",
  },
  {
    id: "deadline_communication",
    label: "deadline and scope communication",
    keywords: ["deadline", "urgent", "priority", "priorities", "scope", "late", "overdue", "escalate"],
    phrases: ["unachievable deadline", "everything is urgent", "miss a deadline", "communicate a delay", "too many deadlines", "adjust scope"],
    answer:
      "Zihua tries to identify deadline risk before it becomes a missed commitment. He reviews which items are truly time-sensitive, estimates what can be completed without lowering quality, and raises the issue early with a concrete proposal. He would rather renegotiate scope transparently than deliver unreliable work in silence.",
    detail:
      "While working full-time at CIBC Mellon and part-time on SEC research, several deliverables once converged in the same week. He explained the constraint to his professor and proposed screening a smaller group of firms first. The adjusted scope kept both roles on track without compromising accuracy.",
  },
  {
    id: "quality_accuracy",
    label: "quality and accuracy",
    keywords: ["quality", "accuracy", "accurate", "detail", "check", "review", "control", "consistent"],
    phrases: ["ensure quality", "ensure accuracy", "double check", "attention to detail", "quality control", "avoid errors"],
    answer:
      "For Zihua, accuracy means more than getting an isolated number right. He checks whether figures, supporting schedules, valuation records, disclosures, and different drafts agree with one another. He documents exceptions, follows them through correction, and performs a final review to confirm that the entire package is complete and consistent.",
    detail:
      "That mindset was central to his fund reporting work at TD Asset Management. A small inconsistency could weaken the reliability of information prepared for investors, so he used variance analysis, balance checks, cross-document comparisons, and issue logs. He sees accuracy as one of the main ways an analyst earns trust.",
  },
  {
    id: "communication",
    label: "communication",
    keywords: ["communication", "communicate", "explain", "present", "client", "audience", "trust", "feedback"],
    phrases: ["communication style", "complex concept", "build trust", "different audiences"],
    answer:
      "Zihua adjusts the way he explains something to the person in front of him. With institutional clients, he keeps valuation issues clear and avoids unnecessary jargon. As a tutor or mentor, he might use a step-by-step explanation, a big-picture view, or a practical example depending on what helps that person understand.",
    detail:
      "One example is how he explains a financial swap. He compares it to two students exchanging help in the subjects where each is strongest. The analogy makes the basic purpose intuitive before adding the technical detail. For him, explaining something clearly is a sign that you understand it well.",
  },
  {
    id: "client_trust",
    label: "client communication and trust",
    keywords: ["client", "customer", "trust", "transparent", "expectations", "institutional"],
    phrases: ["build trust", "build client trust", "earn client trust", "communicate with clients", "client relationship", "customer experience", "handle a client issue"],
    answer:
      "Zihua builds trust by being transparent about the issue, the next step, and the expected timing. He avoids unnecessary jargon, gives the other person enough context to understand the impact, and follows up after the correction instead of assuming the conversation is finished.",
    detail:
      "At CIBC Mellon, he investigated a NAV discrepancy, verified settlement data with the custodian, and explained the situation to an institutional client in clear terms. He coordinated the adjustment, delivered the corrected report before the client's own deadline, and checked afterward that everything aligned.",
  },
  {
    id: "time_management",
    label: "time management",
    keywords: ["time", "schedule", "priority", "deadline", "productivity", "organized", "burnout", "busy"],
    phrases: ["time management", "manage priorities", "multiple deadlines", "stay organized"],
    answer:
      "Zihua relies on a simple system when several priorities compete for attention. He breaks larger goals into weekly and daily steps, keeps a few focused tasks ready for short gaps in the day, and uses an Excel-based tracker to see what matters most. He also leaves buffer time because unexpected work is part of the plan, not an exception to it.",
    detail:
      "Balancing internships, research, coursework, and professional exams taught him that working longer is not the same as managing time well. He decides what is non-negotiable, says no when something does not support the main goal, and protects enough flexibility to maintain quality without burning out.",
  },
  {
    id: "resilience",
    label: "resilience and adaptability",
    keywords: ["resilience", "pressure", "adapt", "change", "setback", "failure", "mistake", "weakness", "recover"],
    phrases: ["under pressure", "learn from failure", "last minute change", "outside comfort zone"],
    answer:
      "Pressure tends to make Zihua more structured rather than less. He has balanced demanding internships, research, six-course semesters, networking, and professional exams. When a plan fails, he does not try to hide it. He looks for the lesson and changes the process so the same problem is less likely to happen again.",
    detail:
      "Once, he lost his place during an executive presentation that he had prepared very carefully. He realized that memorizing every sentence had actually made it harder to recover. Now he builds presentations around key messages, adds recovery cues to his slides, and rehearses a backup plan. Overscheduling taught him something similar: leave room for real life instead of expecting every day to unfold perfectly.",
  },
  {
    id: "learning",
    label: "learning and growth",
    keywords: ["learn", "learning", "growth", "improve", "feedback", "curiosity", "quickly", "training"],
    phrases: ["learn quickly", "growth mindset", "respond to feedback", "keep learning"],
    answer:
      "Zihua learns best when he understands why something works, not just how to repeat it. He asks focused questions, keeps organized notes, and tries the idea on a real task as soon as he can. He also takes feedback seriously, even when his first reaction is to be skeptical, and often turns a useful lesson into a tool or repeatable workflow.",
    detail:
      "At CIBC Mellon, he shadowed experienced fund accountants and kept his own log of recurring issues and solutions. Over time, that helped him troubleshoot more independently. In another example, a friend's suggestion to keep a to-do list eventually became an automated personal productivity system after he gave the idea a fair try.",
  },
  {
    id: "initiative",
    label: "initiative",
    keywords: ["initiative", "proactive", "ownership", "improve", "started", "identified", "built"],
    phrases: ["take initiative", "proactive example", "without being asked", "saw an opportunity", "created a process"],
    answer:
      "Zihua sees initiative as noticing a useful gap and carrying the solution into practice. At a startup, he found that monthly budgeting was scattered across spreadsheets and emails, so he designed standardized Excel templates, automated formulas, dashboards, and a monthly review process with department heads.",
    detail:
      "No one had assigned him a formal systems project. He identified the problem, built the tools, and helped introduce the workflow. Better visibility into budgets and actual spending contributed to three targeted cost-saving measures and roughly a 30% reduction in monthly operating expenses.",
  },
  {
    id: "process_efficiency",
    label: "process improvement and efficiency",
    keywords: ["efficiency", "efficient", "automate", "automation", "process", "workflow", "repetitive", "exception"],
    phrases: ["improve efficiency", "process improvement", "make work easier", "reduce manual work", "operational efficiency", "save time"],
    answer:
      "Zihua improves efficiency by removing repetitive comparison while preserving the points that require judgment. During a busy reporting cycle at TD Asset Management, he built an Excel exception-review view that brought key balances, NAV figures, prior-period amounts, and supporting data together and highlighted unusual differences automatically.",
    detail:
      "The tool used lookups, variance calculations, filters, and conditional formatting. It did not replace the established review process. It helped him spend less time switching between files and more time investigating high-risk items, documenting issues, and confirming corrections.",
  },
  {
    id: "creative_problem_solving",
    label: "creative problem solving",
    keywords: ["creative", "creativity", "innovation", "invent", "idea", "solution", "prototype"],
    phrases: ["creative solution", "think outside the box", "built a tool", "sell an idea", "innovative example"],
    answer:
      "Zihua's creative side usually appears through practical tools. He built an Excel grade calculator that lets students enter assignment and test results, choose a target grade, and immediately see what they need on the final exam. It turned a vague source of anxiety into a clear and manageable goal.",
    detail:
      "He has applied the same instinct in business settings. At DBJ Technology, he combined market research, Power BI dashboards, a direct-to-consumer performance report, and new merchandising ideas. Several recommendations were implemented, and summer monthly sales increased by about 10%.",
  },
  {
    id: "changed_opinion",
    label: "a professional opinion that changed",
    keywords: ["opinion", "changed", "perspective", "efficiency", "automate", "rethink"],
    phrases: ["changed his mind", "opinion he changed", "professional opinion", "used to believe", "reconsidered"],
    answer:
      "Zihua used to equate efficiency with automating as much as possible. An AI-assisted research project changed that view because a large one-shot request produced fast but inconsistent output and created more review work. He now defines efficiency as a reliable, verifiable, and repeatable process that reduces rework.",
    detail:
      "He improved the project by separating it into smaller tasks, validating samples, refining decision rules, and adding manual review for ambiguous cases. The lesson has shaped more than his AI work. Speed is valuable only when the result can be trusted and repeated.",
  },
  {
    id: "project_reflection",
    label: "project reflection and improvement",
    keywords: ["repeat", "redo", "retrospective", "reflection", "prototype", "improve", "dashboard"],
    phrases: ["do differently", "repeat a project", "improve a past project", "improve about a past project", "what would he improve", "what would he change", "lesson from a project"],
    answer:
      "If Zihua repeated his volunteer-retention dashboard, he would begin with the professor's key research questions and decisions before producing many visualizations. He would build a small prototype, collect feedback on the metrics and filters, and only then expand the dashboard.",
    detail:
      "The original project produced more than 30 visualizations and a useful final deliverable, but some early charts were interesting rather than essential. The experience taught him to start with what the stakeholder needs to understand, not simply with everything the data makes possible.",
  },
  {
    id: "presentation_setback",
    label: "a presentation setback",
    keywords: ["presentation", "setback", "blank", "mistake", "failed", "failure", "recover"],
    phrases: ["time he failed", "time he made a mistake", "presentation went wrong", "plan did not work", "learned from a setback", "biggest failure"],
    answer:
      "During his final internship presentation at TD Asset Management, Zihua lost his train of thought in front of senior executives. He had prepared intensely, but he had memorized the script so closely that missing one part made it difficult to recover. He finished the presentation, reflected on what happened, and changed how he prepares.",
    detail:
      "He now organizes presentations around a few core messages, places recovery cues on the slides, and practices how to pause and continue if something unexpected happens. The lesson was that preparation is not about controlling every word. It is about understanding the material well enough to stay useful when the plan breaks.",
  },
  {
    id: "stretch_assignment",
    label: "a stretch assignment",
    keywords: ["stretch", "challenging", "assignment", "scope", "senior", "reconciliation", "complex"],
    phrases: ["most challenging assignment", "challenging task", "beyond his experience", "outside his normal scope", "stretch project", "difficult assignment"],
    answer:
      "At CIBC Mellon, Zihua was asked to investigate a reconciliation discrepancy for a large client, a task normally handled by a more senior analyst. He broke the process into possible failure points, compared internal and custodian records, and coordinated with the valuation team despite different formats and cut-off times. He traced the issue to a late corporate-action adjustment and helped correct it before the NAV deadline.",
    detail:
      "The assignment stretched both his technical knowledge and his confidence. Instead of pretending to know everything, he used a structured investigation, kept stakeholders aligned, and escalated focused questions when needed. It showed him that unfamiliar responsibility becomes manageable when the evidence and next steps are clear.",
  },
  {
    id: "tough_decision",
    label: "a difficult decision",
    keywords: ["decision", "difficult", "tough", "tradeoff", "choose", "choice", "frm"],
    phrases: ["tough decision", "difficult decision", "hard choice", "important tradeoff", "decision under pressure", "decision he made"],
    answer:
      "During a semester with six courses, an internship, recruiting, and FRM Part II preparation, Zihua had to decide whether to postpone the exam. He compared the short-term relief with the role the qualification played in his longer-term plan. He chose to continue, but only after reducing lower-value commitments and redesigning his schedule around the most important work.",
    detail:
      "He used early mornings for FRM study, evenings for coursework, and attended networking events selectively. He passed the exam, maintained strong grades, and preserved meaningful professional relationships. The experience taught him that following through does not mean ignoring constraints. It means making the tradeoffs explicit and changing the system around the commitment.",
  },
  {
    id: "high_pressure_nav",
    label: "delivering under pressure",
    keywords: ["pressure", "deadline", "nav", "cutoff", "fast", "stress", "volatile"],
    phrases: ["worked under pressure", "deliver under pressure", "high pressure situation", "tight cutoff", "two hour deadline", "pressure at work"],
    answer:
      "At CIBC Mellon, Zihua helped calculate and deliver daily NAVs for eight institutional funds with more than three billion dollars in assets under management. The team had roughly two hours after market close to reconcile prices, FX, cash flows, accruals, and corporate actions. He stayed effective by running exception reports early, flagging material breaks immediately, and keeping colleagues updated in real time.",
    detail:
      "Once the exceptions were cleared, he tied out NAV per share, AUM, and daily profit and loss before assembling the client reporting package. The experience taught him that calm under pressure comes from a reliable sequence of checks and open communication, not from trying to work faster in isolation.",
  },
  {
    id: "competing_commitments",
    label: "competing commitments",
    keywords: ["competing", "commitments", "priorities", "juggle", "multitask", "workload", "schedule"],
    phrases: ["juggled multiple priorities", "competing priorities", "many commitments", "manage multiple projects", "several priorities at once", "overlapping commitments"],
    answer:
      "Zihua has balanced a full-time role at CIBC Mellon, research work with different professors, CFA Level II preparation, and financial planning for a startup. He kept the workload manageable by separating fixed deadlines from flexible work, creating smaller milestones, and using short blocks of time for focused tasks that did not require a full working session.",
    detail:
      "He also kept detailed notes and reviewed them regularly so that switching between fund accounting, research, and study did not create repeated relearning. When the volume threatened quality, he communicated early and proposed a narrower near-term scope. The goal was not to appear busy. It was to keep every important commitment dependable.",
  },
  {
    id: "tight_deadline_due_diligence",
    label: "a tight-deadline analysis",
    keywords: ["jpmorgan", "diligence", "deadline", "bloomberg", "project", "analysis", "exam"],
    phrases: ["tight deadline project", "urgent group project", "due diligence project", "deadline before an exam", "deliver analysis quickly"],
    answer:
      "A university due-diligence project on JPMorgan was due only a few days before one of Zihua's CFA exams. He clarified the requirements, divided the analysis into smaller sections with internal deadlines, and coordinated ownership across the team. Instead of relying on convenient search results, he used Bloomberg to obtain financial statements and current ratios, then checked the figures and formatting before the presentation.",
    detail:
      "The team delivered on time and was proud of the final presentation. What mattered most was the discipline of working backward from the deadline while protecting source quality. Zihua learned that urgency should simplify the process, not lower the standard of evidence.",
  },
  {
    id: "supporting_teammate",
    label: "supporting a teammate under pressure",
    keywords: ["teammate", "overwhelmed", "support", "motivate", "crying", "morale", "stress"],
    phrases: ["motivate a teammate", "teammate was overwhelmed", "support a struggling teammate", "team morale", "someone under pressure", "motivate a team under pressure"],
    answer:
      "During an intensive team project, one teammate became visibly overwhelmed while everyone was working late to finish the presentation. Zihua checked in privately, offered to cover her section, and reassured the group that the work was still on track. He did not force a solution on her, but made it clear that support was available.",
    detail:
      "She chose to continue, and the team completed the work together. The moment reinforced his view that motivation is not always a speech or a reward. Sometimes it is noticing pressure early, offering practical help, and helping people see that the situation is difficult but still manageable.",
  },
  {
    id: "influence_without_authority",
    label: "influencing without authority",
    keywords: ["influence", "authority", "persuade", "alignment", "departments", "buy-in", "leadership"],
    phrases: ["influence without authority", "gain buy in", "lead without authority", "persuade other teams", "influence stakeholders", "no formal authority"],
    answer:
      "At a startup, Zihua coordinated monthly financial planning with four departments even though he did not manage those teams. He gathered their budget information, summarized the shared facts, and structured the discussion around variances, upcoming needs, and practical tradeoffs. Giving each department room to explain its constraints helped the group reach decisions without turning the meeting into a contest for resources.",
    detail:
      "His approach to influence is to make the problem easier to see and the decision easier to discuss. He uses evidence, asks what each person needs, and connects the recommendation to a shared outcome. That creates more durable support than relying on title or pressure.",
  },
  {
    id: "data_driven_recommendation",
    label: "a data-driven recommendation",
    keywords: ["recommendation", "revenue", "sales", "dashboard", "evidence", "data", "implemented"],
    phrases: ["used data to influence a decision", "data driven recommendation", "recommendation was implemented", "improved sales", "business recommendation", "used analysis to make a decision"],
    answer:
      "When revenue was declining during his DBJ Technology internship, Zihua was asked to bring a younger customer's perspective to the problem. He combined market research with Power BI analysis of sales trends and customer behavior, then proposed practical changes such as a direct-to-customer performance view and a redesigned bookstore layout. Several ideas were implemented, and monthly sales increased by about 10% during the summer campaign.",
    detail:
      "The recommendation worked because it connected evidence with actions the team could actually test. Zihua did not present the dashboard as the solution by itself. He used it to show where behavior was changing, explain why the proposed actions matched those patterns, and give management a way to monitor the outcome.",
  },
  {
    id: "cross_functional_alignment",
    label: "cross-functional collaboration",
    keywords: ["cross-functional", "department", "alignment", "budget", "stakeholders", "collaboration", "functions"],
    phrases: ["cross functional team", "worked across departments", "align different teams", "cross functional collaboration", "multiple departments", "different functions"],
    answer:
      "Zihua coordinated monthly planning conversations across four departments at a startup. Before each meeting, he collected the latest budget and operating information and turned it into a short common view, so people were not debating different versions of the facts. During the meeting, he invited each department to explain its needs and kept the conversation focused on shared constraints and agreed next steps.",
    detail:
      "The process improved budget alignment and reduced conflict around resource allocation. It also taught him that cross-functional work depends on translation. Finance may see a variance, while another team sees a capacity or customer problem. A useful collaborator helps both sides understand the connection.",
  },
  {
    id: "diverse_collaboration",
    label: "working with a diverse group",
    keywords: ["diverse", "different", "faculty", "culture", "inclusive", "representatives", "perspectives"],
    phrases: ["diverse group", "people different from him", "different backgrounds", "diverse team", "cross cultural team", "different communication styles"],
    answer:
      "As a DeGroote faculty representative, Zihua worked with more than 30 representatives from different programs to support over 1,000 incoming students. The group had different priorities and communication styles, so he listened for the concern behind each position, looked for common ground, and kept planning conversations focused on the student experience.",
    detail:
      "Events often required real-time schedule changes and volunteer reallocation. His own experience as an international student made him especially attentive to quieter voices and people who lacked context. The team delivered the orientation program successfully and helped DeGroote win the Faculty Cup.",
  },
  {
    id: "resource_constraints",
    label: "working with limited resources",
    keywords: ["resource", "resources", "limited", "constraint", "startup", "budget", "cost"],
    phrases: ["limited resources", "resource constrained", "small budget", "do more with less", "worked at a startup", "budget constraints"],
    answer:
      "At an early-stage startup, Zihua found overlapping software subscriptions, expensive facility arrangements, and advertising that was not producing enough value. He compared usage, cost, and output quality, reduced the software set from 17 subscriptions to five, suggested lower-cost university meeting spaces, and helped develop a student ambassador approach to promotion.",
    detail:
      "He treated limited resources as a design constraint rather than a reason to lower expectations. The broader budgeting and review process helped the company identify several cost-saving measures and reduce monthly operating expenses by roughly 30%. His principle was to protect the capabilities that mattered while removing duplication and weak returns.",
  },
  {
    id: "going_above_beyond",
    label: "going beyond the assigned task",
    keywords: ["extra", "beyond", "initiative", "ownership", "additional", "follow-through", "proactive"],
    phrases: ["above and beyond", "went the extra mile", "beyond his responsibilities", "more than expected", "exceeded expectations", "additional responsibility"],
    answer:
      "At TD Asset Management, Zihua did more than record comments during fund-reporting reviews. He tracked outstanding items, followed up on corrections, and reviewed the revised materials to confirm that changes were reflected consistently before finalization. He also built an exception-review view that reduced time spent moving between files and made unusual balances easier to investigate.",
    detail:
      "The extra effort was not about making the work look more elaborate. It closed the loop between identifying an issue and knowing it was resolved. He tends to go beyond the immediate handoff when a small amount of additional ownership can materially improve reliability for the team.",
  },
  {
    id: "incomplete_information",
    label: "decisions with incomplete information",
    keywords: ["incomplete", "information", "uncertainty", "assumption", "data", "decision", "unknown"],
    phrases: ["incomplete information", "not enough data", "decision with limited information", "make a decision under uncertainty", "missing information", "ambiguous data"],
    answer:
      "When information is incomplete, Zihua separates what is known, what is assumed, and what could materially change the decision. He looks for the smallest reliable source that can close the most important gap, tests more than one explanation, and makes the uncertainty visible instead of hiding it behind a precise-looking number.",
    detail:
      "His reconciliation work required this approach when internal records and custodian data disagreed. He compared timestamps, settlement records, pricing feeds, and corporate actions until the evidence supported a root cause. If time still required a decision, he would state the remaining assumption, choose the reversible path where possible, and define what should be checked next.",
  },
  {
    id: "missed_teammate_deadline",
    label: "a teammate missing a deadline",
    keywords: ["teammate", "deadline", "late", "missed", "underperforming", "accountability", "delay"],
    phrases: ["teammate misses a deadline", "team member is late", "underperforming teammate", "teammate falls behind", "someone does not deliver", "missed their deadline"],
    answer:
      "If a teammate were falling behind, Zihua would first speak with them privately to understand whether the issue was clarity, capacity, or capability. He would agree on a realistic recovery plan, make ownership and timing explicit, and offer targeted help if it protected the shared deadline. He would also keep the wider team informed about material delivery risk without turning the situation into blame.",
    detail:
      "If the commitment continued to slip, he would redistribute critical work, document the agreed actions, and involve the project lead early enough to preserve options. His difficult group-project experience taught him that empathy and accountability have to coexist. Supporting someone should help the team recover, not make responsibility disappear.",
  },
  {
    id: "manager_disagreement",
    label: "disagreeing with a manager",
    keywords: ["manager", "supervisor", "disagree", "challenge", "pushback", "decision", "respect"],
    phrases: ["disagree with his manager", "manager makes a wrong decision", "challenge a supervisor", "push back on a manager", "different view from his boss", "supervisor disagreement"],
    answer:
      "If Zihua disagreed with a manager, he would first make sure he understood the manager's objective and constraints. He would bring the concern privately, support it with evidence, and offer a practical alternative rather than simply objecting. If the final decision remained within legal, ethical, and risk limits, he would support it professionally and focus on execution.",
    detail:
      "He is comfortable saying that he may be missing context. That keeps the conversation curious instead of adversarial. If the issue affected reporting integrity, client risk, or another hard boundary, he would document the concern and use the appropriate escalation path rather than quietly proceeding.",
  },
  {
    id: "conflicting_stakeholders",
    label: "conflicting stakeholder requests",
    keywords: ["stakeholders", "conflicting", "requests", "priorities", "departments", "tradeoff", "alignment"],
    phrases: ["conflicting stakeholder requests", "two stakeholders disagree", "competing stakeholder priorities", "different requests from stakeholders", "departments want different things", "resource allocation conflict"],
    answer:
      "If two stakeholders wanted different outcomes, Zihua would clarify the decision each person is trying to make, the deadline, and the consequence of delay. He would place the requests against shared criteria such as client impact, risk, effort, and strategic priority, then show the tradeoff clearly enough for the right owner to decide.",
    detail:
      "His startup budget meetings used this kind of structure across four departments. A common data view and a focused agenda helped people explain their needs without debating separate facts. If alignment still could not be reached, he would escalate the choice with options and implications, not just pass the conflict upward.",
  },
  {
    id: "sudden_scope_change",
    label: "a sudden change in scope",
    keywords: ["scope", "change", "last-minute", "requirements", "priority", "unexpected", "replan"],
    phrases: ["scope changes at the last minute", "requirements suddenly change", "priority changes suddenly", "last minute request", "project changes direction", "unexpected new requirement"],
    answer:
      "If the scope changed late, Zihua would pause long enough to identify what is genuinely new, what work can still be reused, and which original commitments are now at risk. He would confirm the revised success criteria, propose a new sequence of work, and communicate any tradeoff in timing or depth before the team commits to the change.",
    detail:
      "His case-competition experience gave him a compressed version of this problem when he had only 40 seconds left instead of the planned speaking time. He kept the essential message, removed secondary detail, and finished within the limit. The same principle scales to larger projects: protect the purpose first, then rebuild the plan around it.",
  },
  {
    id: "critical_error",
    label: "a critical error before a deadline",
    keywords: ["error", "mistake", "critical", "deadline", "incorrect", "mismatch", "fix"],
    phrases: ["finds an error before a deadline", "major error at the last minute", "critical mistake", "incorrect report before delivery", "last minute error", "error in someone else's work"],
    answer:
      "If Zihua found a material error just before delivery, he would verify it quickly, stop the affected output from moving forward, and alert the people who need to act. He would separate the immediate correction from the later process review so the team can protect the deadline without losing the lesson.",
    detail:
      "At CIBC Mellon, he noticed a settlement mismatch in another intern's reconciliation that could have produced an incorrect NAV. He checked the records, raised it privately, traced it with the colleague to a late trade entry, and helped correct the report before the client deadline. Afterward, he shared a process step that could reduce a repeat issue.",
  },
  {
    id: "quality_speed_tradeoff",
    label: "balancing speed and quality",
    keywords: ["speed", "quality", "fast", "accuracy", "tradeoff", "deadline", "minimum"],
    phrases: ["speed versus quality", "balance speed and accuracy", "move fast without errors", "quality under a deadline", "sacrifice quality", "fast and accurate"],
    answer:
      "Zihua does not treat speed and quality as complete opposites. He protects a small set of non-negotiable checks, uses exception-based review to focus attention where risk is highest, and simplifies lower-value detail when time is limited. If the requested scope cannot be delivered reliably, he raises that constraint and proposes a narrower version that can be trusted.",
    detail:
      "Daily NAV deadlines taught him to run exception reports early and escalate material breaks immediately. His research work taught him the same lesson in another form: a fast automated result that needs extensive correction is not truly efficient. The best process reduces both elapsed time and avoidable rework.",
  },
  {
    id: "dissatisfied_client",
    label: "handling a dissatisfied client",
    keywords: ["client", "complaint", "dissatisfied", "upset", "angry", "trust", "service"],
    phrases: ["dissatisfied client", "angry client", "client complains", "client is unhappy", "difficult customer", "handle a complaint"],
    answer:
      "If a client were dissatisfied, Zihua would listen first and restate the concern to make sure the real issue was understood. He would separate facts from assumptions, explain what can be done now, and give a realistic update time. If the team made an error, he would acknowledge it directly and focus the conversation on correction rather than defensiveness.",
    detail:
      "His institutional reporting experience showed him that trust grows through clarity and follow-through. When resolving a NAV discrepancy, he explained the issue without unnecessary jargon, coordinated the adjustment across the relevant parties, delivered the corrected report before the client's deadline, and confirmed afterward that the figures aligned.",
  },
  {
    id: "unethical_request",
    label: "responding to an unethical request",
    keywords: ["unethical", "ethics", "integrity", "request", "plagiarism", "misleading", "compliance"],
    phrases: ["asked to do something unethical", "unethical request", "ethical dilemma", "violate a policy", "misrepresent information", "integrity at work"],
    answer:
      "If Zihua were asked to do something unethical, he would clarify the request, explain the specific integrity or risk concern, and decline the problematic action. He would look for a compliant alternative that still addresses the underlying business need. If the concern remained unresolved, he would document it and use the appropriate escalation channel.",
    detail:
      "His approach to generative AI reflects this boundary. When AI could have produced an easy answer for a difficult school project, he used it only to explore frameworks and challenge ideas, then rebuilt the work from his own reasoning. He applies the same principle professionally: tools can assist, but they do not remove personal accountability.",
  },
  {
    id: "new_team_entry",
    label: "joining a new team",
    keywords: ["new", "team", "join", "rotation", "onboarding", "first", "adapt"],
    phrases: ["join a new team", "first weeks in a role", "first 30 days", "first ninety days", "new rotation", "onboard quickly"],
    answer:
      "When Zihua joins a new team, he first learns what the group is responsible for, how success is measured, and where mistakes would matter most. He reviews existing process material, observes experienced colleagues, and asks focused questions about the reasoning behind the workflow. Then he takes ownership of a small recurring task and builds from reliable execution.",
    detail:
      "At CIBC Mellon, this meant learning NAV calculations, reconciliation systems, and reporting standards within weeks while keeping detailed notes on recurring issues. He avoids assuming that a method from a previous team will transfer unchanged. He brings useful skills forward, but lets the new team's purpose determine how they are applied.",
  },
  {
    id: "difficult_conversation",
    label: "a difficult workplace conversation",
    keywords: ["conversation", "difficult", "sensitive", "private", "feedback", "respect", "colleague"],
    phrases: ["difficult conversation", "sensitive conversation", "confront a colleague", "address a problem with someone", "uncomfortable conversation", "deliver difficult feedback"],
    answer:
      "Zihua prepares for a difficult conversation by checking the facts and deciding what outcome the conversation needs to achieve. He speaks privately, describes the observed issue and its impact, and gives the other person room to explain. He tries to leave with a concrete next step rather than simply proving that his concern was correct.",
    detail:
      "When he found a settlement mismatch in a colleague's report, he avoided criticizing the person in front of the team. They reviewed the data together, identified a late trade entry, and fixed the report before release. The respectful approach protected both the client result and the working relationship.",
  },
  {
    id: "setting_boundaries",
    label: "setting boundaries and saying no",
    keywords: ["boundary", "boundaries", "decline", "refuse", "overcommitted", "capacity", "no"],
    phrases: ["say no at work", "decline extra work", "too many commitments", "set boundaries", "already at capacity", "overcommitted"],
    answer:
      "When Zihua is at capacity, he does not want to give a quick yes that later becomes an unreliable commitment. He clarifies the urgency and value of the request, shows what is already due, and offers a realistic option such as a later date, a smaller scope, or help finding another owner. That keeps the boundary constructive rather than abrupt.",
    detail:
      "He developed this habit after realizing that offering help too quickly could put his own deadlines at risk. He still wants to be supportive, but now checks his commitments before accepting more work. For him, dependability includes being honest about capacity early enough for the team to plan.",
  },
  {
    id: "skeptical_stakeholder",
    label: "persuading a skeptical stakeholder",
    keywords: ["skeptical", "persuade", "convince", "stakeholder", "objection", "buy-in", "recommendation"],
    phrases: ["skeptical stakeholder", "convince someone", "persuade someone", "stakeholder rejects his idea", "get support for an idea", "overcome objections"],
    answer:
      "If a stakeholder were skeptical, Zihua would first ask what evidence or risk was driving the hesitation. He would connect the recommendation to that person's decision criteria, show a small and testable version where possible, and be candid about uncertainty. The goal would be to make the next step safe enough to evaluate, not to pressure someone into agreement.",
    detail:
      "At DBJ Technology, he supported sales recommendations with market research, customer-behavior analysis, and Power BI dashboards rather than relying on enthusiasm alone. The team implemented several ideas and saw stronger summer sales. That experience reinforced the value of combining a clear story with evidence and measurable follow-up.",
  },
  {
    id: "project_off_track",
    label: "recovering a project that is off track",
    keywords: ["project", "off-track", "stalled", "recover", "milestone", "scope", "progress"],
    phrases: ["project is off track", "project falls behind", "recover a delayed project", "work is not progressing", "project going wrong", "get a project back on track"],
    answer:
      "If a project were off track, Zihua would identify whether the problem came from scope, ownership, information, or execution. He would return to the intended decision or deliverable, separate essential work from optional work, assign clear next actions, and create a near-term checkpoint that shows whether the recovery plan is working.",
    detail:
      "His volunteer dashboard reflection shaped this approach. Producing many charts created activity, but not every chart advanced the professor's main questions. He would now build a small prototype around the core metrics, collect feedback early, and expand only after the direction is confirmed.",
  },
  {
    id: "team_idea_rejected",
    label: "handling disagreement over an idea",
    keywords: ["idea", "rejected", "disagreement", "vote", "team", "compromise", "presentation"],
    phrases: ["his idea is rejected", "team chooses another idea", "team makes a decision", "decision he disagrees with", "disagreement over an approach", "team decision he disagrees with", "different presentation ideas", "compromise with a teammate"],
    answer:
      "In an FWD finance trainee project, Zihua wanted the presentation to emphasize client benefits while a teammate preferred the technical design of the insurance plan. Rather than defending one approach indefinitely, he opened the question to the team, compared the strengths of both, and helped combine them into a presentation that covered the product and the customer value.",
    detail:
      "The team won the program championship after presenting to management. The experience showed him that a disagreement can improve the result when the group evaluates ideas against the shared goal. He is willing to let go of ownership over a specific proposal if the final solution becomes stronger.",
  },
  {
    id: "managing_up",
    label: "managing up and escalating early",
    keywords: ["manage", "up", "escalate", "supervisor", "update", "risk", "capacity"],
    phrases: ["manage up", "keep a manager informed", "escalate an issue", "communicate risk to a supervisor", "ask a manager for help", "update leadership"],
    answer:
      "Zihua manages up by bringing a concise view of the issue, what he has already checked, the remaining risk, and a proposed next step. He tries to escalate early enough that the manager still has options, while avoiding questions he could answer through existing materials or a reasonable first investigation.",
    detail:
      "When full-time fund work and research deadlines converged, he explained the constraint to his professor and proposed screening a smaller set of firms first. The revised scope protected accuracy in both roles. At TD Asset Management, he used the same principle by raising unfamiliar reporting questions before assumptions could affect final quality.",
  },
  {
    id: "delegating_work",
    label: "delegating and assigning work",
    keywords: ["delegate", "delegating", "assign", "ownership", "workload", "responsibility", "lead"],
    phrases: ["delegate work", "assign tasks", "divide responsibilities", "decide who does what", "share workload", "delegate under pressure"],
    answer:
      "When dividing work, Zihua would match tasks to people's strengths, confirm the expected output, and set internal checkpoints before the external deadline. He also wants each person to understand how their section connects to the final result, because a team can complete every individual task and still produce an inconsistent deliverable.",
    detail:
      "His group-project experience taught him not to treat delegation as a one-time split of the assignment. The team needs progress visibility, shared quality standards, and a plan for integration. As a leader, he prefers clear ownership with enough communication to catch gaps early.",
  },
  {
    id: "values",
    label: "values and social impact",
    keywords: ["value", "values", "principle", "motivate", "purpose", "society", "give", "donation", "impact"],
    phrases: ["what motivates him", "give back", "social impact", "personal values"],
    answer:
      "One belief that matters to Zihua is that good intentions should lead to action. He wants professional growth to increase his ability to contribute, and he has connected important career milestones with support for human-rights and children's-welfare initiatives. He does not see ambition and social responsibility as competing ideas.",
    detail:
      "You can also see that value in smaller choices. He has mentored new students, tutored people who lacked confidence, helped students file tax returns, and built tools that made a team's work easier. Larger opportunities appeal to him partly because they create more room to learn, contribute, and give back.",
  },
  {
    id: "mentoring",
    label: "mentoring and empathy",
    keywords: ["mentor", "mentoring", "tutor", "teaching", "student", "empathy", "inclusive", "support"],
    phrases: ["help other people", "academic tutor", "orientation program"],
    answer:
      "Zihua has spent a lot of time helping other students, including work as a DeGroote first-year mentor, academic tutor, faculty orientation representative, and community tax volunteer. He listens first and adjusts his guidance to the person. In his tutoring work, many students improved their finance and business exam results to above 80%.",
    detail:
      "He does not use the same advice for everyone. One mentee needed help finding community on campus, while another wanted to talk about courses, internships, and finance careers. He tries to understand what would help that particular person feel more confident and take the next step.",
  },
  {
    id: "career_goals",
    label: "career goals",
    keywords: ["career", "future", "goal", "goals", "ambition", "years", "aspire", "become"],
    phrases: ["career goal", "long term goal", "five years", "ten years", "future plans", "person he wants to be"],
    answer:
      "Zihua's long-term goal is less about locking himself into one title and more about becoming capable enough to handle larger problems and create wider impact. He is building depth in finance, mathematics, research, data, and AI so that future choices come from strength rather than fear of uncertainty.",
    detail:
      "He compares career development to climbing a mountain. Staring only at the summit can make the journey feel overwhelming, so he focuses on the next useful step: a demanding course, a real project, a professional conversation, or a skill that expands his options. He wants each step to compound into better judgment and a greater ability to contribute.",
  },
  {
    id: "internship_purpose",
    label: "purpose of internships",
    keywords: ["internship", "intern", "platform", "exposure", "opportunity", "experience"],
    phrases: ["why internships", "goal of an internship", "value of internship", "what internships mean", "seeking an internship"],
    answer:
      "Zihua sees an internship as more than a credential or a technical-skills exercise. It is a chance to learn from talented people, face real constraints, understand how a larger organization works, and test his judgment in situations where the result matters to other people.",
    detail:
      "At TD Asset Management, he actively spoke with professionals beyond his immediate responsibilities to understand more of the asset-management business. Experiences like that reinforce his belief that larger platforms offer not only resources, but also a responsibility to learn quickly and use future capability to contribute more broadly.",
  },
  {
    id: "cfa_journey",
    label: "CFA motivation and learning",
    keywords: ["cfa", "equity", "derivatives", "charter", "exam"],
    phrases: ["why cfa", "why did he take the cfa", "pursue the cfa", "cfa motivation", "cfa journey", "cfa learning", "favorite cfa subject", "difficult cfa subject", "cfa level ii"],
    answer:
      "Zihua pursued the CFA program because he wanted a systematic understanding of capital markets, not simply another credential. Preparing while working and doing research strengthened his discipline, and the curriculum helped him connect financial statements, valuation, portfolio decisions, and market behavior. He passed the CFA Level II exam in June 2026.",
    detail:
      "Equity Investments is his favorite area because it combines financial modelling with judgment about business quality, competition, and investor expectations. Derivatives was more challenging because the models initially felt abstract, so he connected options, swaps, and futures to real hedging decisions and built small Excel calculations until the logic became intuitive.",
  },
  {
    id: "frm_journey",
    label: "FRM motivation and learning",
    keywords: ["frm", "risk", "var", "stress", "operational", "liquidity", "credit"],
    phrases: ["why frm", "frm journey", "frm learning", "favorite frm subject", "difficult frm subject", "risk certification"],
    answer:
      "Zihua pursued the FRM because he sees risk management as the other half of every investment decision. Returns matter, but so do downside scenarios, liquidity, controls, and the ability to respond when assumptions fail. He became an FRM Charterholder in January 2025 after preparing alongside six university courses and recruiting work.",
    detail:
      "Market Risk Management was his favorite area because VaR, stress testing, and scenario analysis connect models to real decisions under volatility. Operational Risk was more difficult because it depends heavily on governance, process, and human judgment. Studying real failures helped him learn to look beyond numbers and see risk as a broader business system.",
  },
  {
    id: "finance_motivation",
    label: "motivation for finance",
    keywords: ["finance", "financial", "capital", "market", "allocation", "motivation", "passion"],
    phrases: ["why finance", "passion for finance", "study finance", "drawn to finance", "finance interests him"],
    answer:
      "Zihua is drawn to finance because it is a system for allocating limited resources toward their most valuable uses. He is fascinated by how prices, incentives, information, and competing decisions interact, and by how capital can turn an idea or invention into something that reaches people at scale.",
    detail:
      "He often thinks about finance through two lenses. Markets continually test whether resources are being used well, while long-term capital can make innovation practical. That combination of disciplined allocation and real-world possibility is what keeps him interested in the field.",
  },
  {
    id: "risk_motivation",
    label: "motivation for risk management",
    keywords: ["risk", "downside", "sustainable", "volatility", "liquidity", "protect"],
    phrases: ["why risk management", "interested in risk", "risk career", "manage risk", "risk mindset"],
    answer:
      "Risk management appeals to Zihua because it protects the long-term success of a decision. It asks not only whether an opportunity can work, but what could go wrong, how severe the downside might be, and what preparation would make the decision sustainable across different market conditions.",
    detail:
      "His FRM studies gave him a structured view of market, credit, liquidity, and operational risk. His internships made those ideas concrete through valuation breaks, reconciliations, controls, and strict reporting deadlines. He wants to combine analytical opportunity-seeking with disciplined downside awareness.",
  },
  {
    id: "research_motivation",
    label: "motivation for research",
    keywords: ["research", "professor", "academic", "evidence", "open-ended", "question"],
    phrases: ["why research", "why research assistant", "enjoy research", "research interests him", "research motivation"],
    answer:
      "Zihua enjoys research because it begins with an open question rather than a known answer. He likes deciding what evidence is needed, testing whether the data is reliable, and gradually building an explanation that can withstand scrutiny. Working with professors has also taught him how much judgment sits behind good data work.",
    detail:
      "He is comfortable starting with foundational tasks such as collection, cleaning, validation, and documentation because they determine whether later analysis is trustworthy. His goal is to become increasingly independent while still producing work that genuinely moves the professor's research forward.",
  },
  {
    id: "consulting_motivation",
    label: "motivation for consulting",
    keywords: ["consulting", "consultant", "client", "industry", "advisory", "project"],
    phrases: ["why consulting", "interested in consulting", "consulting career", "consulting appeals"],
    answer:
      "Consulting appeals to Zihua because it combines a steep learning curve, close teamwork, and visible client impact. He enjoys entering an unfamiliar problem, structuring it with a team, testing assumptions, and turning a complicated situation into practical recommendations.",
    detail:
      "The variety matters to him because it builds a broad toolkit across analysis, risk, communication, and implementation. The most satisfying outcome would not be a polished presentation by itself, but seeing a client understand the reasoning and use the recommendation to make a better decision.",
  },
  {
    id: "international_experience",
    label: "international and cross-cultural experience",
    keywords: ["international", "culture", "cultural", "canada", "adaptation", "belonging", "inclusive", "immigrant"],
    phrases: ["international student", "cross cultural", "adapted to canada", "cultural barriers", "inclusive teammate"],
    answer:
      "Studying abroad made Zihua more independent and more attentive to whether people feel included. He had to navigate language differences, unfamiliar systems, homesickness, and the practical challenges of building a life in Canada. Those experiences made him more willing to explain context, invite quieter voices into a conversation, and help newer students find their footing.",
    detail:
      "He remembers arriving at residence late at night in the rain without a room key and having to find help on his own. He also experienced group discussions where cultural references made it difficult to participate. Rather than withdrawing, he became more active in mentoring and orientation programs so other students would have an easier entry into the community.",
  },
  {
    id: "excel",
    label: "Excel and workflow automation",
    keywords: ["excel", "vba", "macro", "formula", "spreadsheet", "lookup", "pivot"],
    phrases: ["excel skills", "use excel", "excel model", "excel automation", "built in excel"],
    answer:
      "Zihua uses Excel for financial analysis, reconciliation, workflow tracking, and practical automation. He is comfortable with pivots, lookup functions, variance flags, conditional formatting, data validation, and VBA macros. He tends to build tools that reduce repeated work and make the next decision easier to see.",
    detail:
      "Examples include fund-reporting exception reviews, pricing and FX sensitivity checks, budgeting dashboards, a grade calculator, and a personal task system with automated sorting and progress tracking. His focus is not the formula by itself. It is whether the spreadsheet stays understandable, reliable, and useful over time.",
  },
  {
    id: "business_intelligence",
    label: "Power BI and dashboards",
    keywords: ["powerbi", "dashboard", "visualization", "visualizations", "visualize", "powerquery", "bi"],
    phrases: ["power bi", "build dashboards", "data visualization", "interactive report", "clean data for a dashboard"],
    answer:
      "Zihua can take a dashboard from raw data to an interactive report. His process includes connecting sources, cleaning and standardizing fields, defining relationships, checking data quality, and designing visuals around the decisions a stakeholder needs to make.",
    detail:
      "He has used dashboards for sales performance, financial planning, research outcomes, and volunteer engagement. In one research project, he developed more than 30 visualizations, while a business internship used Power BI to make sales and customer-behavior patterns easier for managers to act on.",
  },
  {
    id: "sql",
    label: "SQL",
    keywords: ["sql", "database", "query", "join", "select", "group", "table"],
    phrases: ["sql skills", "use sql", "do with sql", "write sql", "database queries", "inner join", "left join"],
    answer:
      "Zihua uses SQL to filter large datasets, aggregate financial or customer measures, and combine related tables into a clean analysis-ready dataset. He is comfortable with core operations such as SELECT, WHERE, GROUP BY, and JOIN, and chooses the query structure based on what the business question needs to preserve.",
    detail:
      "For example, an INNER JOIN is useful when the analysis should include only matched records, while a LEFT JOIN preserves every record from the primary table and reveals missing relationships through null values. He sees that choice as a business decision about the population being analyzed, not just syntax.",
  },
  {
    id: "python",
    label: "Python",
    keywords: ["python", "pandas", "numpy", "seaborn", "matplotlib", "scikit", "code", "coding"],
    phrases: ["python skills", "use python", "do with python", "python experience", "code in python", "python libraries"],
    answer:
      "Zihua uses Python for data cleaning, validation, extraction, visualization, and machine-learning workflows. His main tools include pandas, NumPy, Matplotlib, Seaborn, and scikit-learn. He has applied them to SEC filings, news datasets, research classification, regression modelling, and financial-data projects.",
    detail:
      "His projects include extracting more than 30 years of filings, structuring evidence from over 2,000 news articles, coding 300-plus text snippets for model development, and comparing predictive models on business datasets. He combines code with source checks and manual review when the data is ambiguous.",
  },
  {
    id: "market_platforms",
    label: "Bloomberg and FactSet",
    keywords: ["bloomberg", "factset", "terminal", "market", "screening", "fundamental", "realtime"],
    phrases: ["bloomberg skills", "factset skills", "bloomberg versus factset", "market data tools", "screen companies"],
    answer:
      "Zihua uses Bloomberg and FactSet for complementary purposes. Bloomberg is especially useful for real-time market context, macro indicators, securities, and market reactions, while FactSet is strong for company fundamentals, estimates, comparable analysis, screening, and portfolio research.",
    detail:
      "He has used Bloomberg to obtain reliable financial statements and ratios for a due-diligence project and FactSet to study company financials, valuation measures, peers, and trends. He chooses the platform based on whether the task needs live market context or deeper fundamental comparison.",
  },
  {
    id: "data_analysis",
    label: "data analysis approach",
    keywords: ["analysis", "analyze", "data", "insight", "dataset", "clean", "visualize"],
    phrases: ["approach data analysis", "analyze data", "turn data into insights", "data analysis process", "work with data"],
    answer:
      "Zihua starts data analysis with the decision or research question, then cleans and validates the underlying information before looking for patterns. He compares results, investigates unusual values, and communicates the finding in a form the audience can use, whether that is a concise explanation, a dashboard, or a controlled reporting file.",
    detail:
      "His experience spans pricing, FX, cash flows, NAV movements, fund disclosures, academic outcomes, SEC filings, news evidence, and volunteer engagement. The tools change across Excel, Python, SQL, Power BI, Bloomberg, and FactSet, but the sequence stays consistent: clarify, validate, analyze, explain, and verify.",
  },
  {
    id: "valuation_projects",
    label: "valuation and investment projects",
    keywords: ["valuation", "dcf", "ddm", "apv", "multiple", "equity", "firm", "investment"],
    phrases: ["valuation project", "financial modelling project", "value a company", "dcf model", "investment analysis"],
    answer:
      "Zihua has built DCF, dividend-discount, and adjusted-present-value models using financial statements, free cash flow, capital structure, and valuation multiples such as EV to EBITDA and price to earnings. He enjoys connecting the model output with business quality, competitive position, and what the market already appears to expect.",
    detail:
      "His advanced valuation work included M&A, private-equity, and venture-capital perspectives. The most important lesson was that a model is a structured argument rather than a precise prediction. Assumptions, scenarios, and the reasonableness of the underlying story matter as much as the spreadsheet mechanics.",
  },
  {
    id: "machine_learning",
    label: "machine learning projects",
    keywords: ["machine", "learning", "model", "regression", "ridge", "polynomial", "gridsearch", "prediction"],
    phrases: ["machine learning", "ml project", "predictive model", "regression model", "data science project"],
    answer:
      "Zihua has built and compared linear, polynomial, and ridge-regression models using scikit-learn pipelines and hyperparameter tuning. He also uses correlation heatmaps, residual plots, and other diagnostics to understand feature relationships, model performance, and possible bias rather than looking only at a headline score.",
    detail:
      "In one IBM data-analysis project, his tuned model reached an R-squared of about 0.65 on test data. Another team project used pandas, NumPy, visualizations, and multiple models to study which variables influenced movie popularity. These projects strengthened his interest in combining technical modelling with business interpretation.",
  },
  {
    id: "technical",
    label: "technical toolkit",
    keywords: ["technical", "technology", "python", "sql", "excel", "vba", "tableau", "power", "bloomberg", "factset", "tool"],
    phrases: ["technical skills", "tools does he use", "technology stack"],
    answer:
      "Zihua is comfortable with advanced Excel and VBA, Python, SQL, Tableau, Power BI, Bloomberg, FactSet, and AI development tools such as Codex and Claude. He is practical about technology. He uses it to check financial data, automate repetitive work, organize research, visualize decisions, and make complicated processes easier to manage.",
    detail:
      "Some concrete examples include an automated Excel task system, exception-review files for fund reporting, Python pipelines for SEC filings and news data, Power BI sales dashboards, and AI-assisted classification workflows with manual quality checks.",
  },
  {
    id: "interests",
    label: "interests",
    keywords: ["interest", "hobby", "outside", "fitness", "badminton", "go", "game", "course"],
    phrases: ["outside work", "personal interests", "free time", "what does he enjoy"],
    answer:
      "Outside work, Zihua enjoys online learning, fitness, badminton, and the strategy game Go. He is a certified National Level II Go player. These interests suit him well because he enjoys steady improvement, strategic choices, and activities where patient practice pays off over time.",
    detail:
      "Go fits the way he thinks because a move can look good on its own but only makes sense in the context of the whole board. Fitness and badminton give him a physical break from analytical work, while online courses let him keep exploring new subjects at his own pace.",
  },
  {
    id: "candidate",
    label: "professional fit",
    keywords: ["hire", "candidate", "fit", "recruit", "role", "employer", "contribute"],
    phrases: ["why hire him", "strong candidate", "good fit", "bring to a team"],
    answer:
      "What makes Zihua a strong candidate is the combination of skills he brings. He understands finance and risk, has hands-on fund operations experience, can work carefully with research and data, and uses AI with good judgment. He is still early in his career, but he learns quickly, takes ownership, stays composed under pressure, and follows through on the details.",
    detail:
      "He would be especially well suited to a role that values careful analysis, curiosity, and communication across teams. He is comfortable with detailed work such as reconciliations, validation, datasets, and controls. At the same time, he keeps asking the larger questions: what decision needs to be made, what risk matters most, and what would genuinely help the person using the work.",
  },
];

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenSet = (value: string) =>
  new Set(normalize(value).split(" ").filter((token) => token.length > 1));

const tokensMatch = (first: string, second: string) =>
  first === second ||
  (first.length > 3 && second.length > 3 && (first.startsWith(second) || second.startsWith(first)));

// Static topic text is normalized once, not again for every topic on every question.
const preparedTopics = new Map(profileTopics.map((topic) => [topic, {
  label: normalize(topic.label),
  labelTokens: tokenSet(topic.label).size,
  phrases: (topic.phrases ?? []).map((phrase) => ({ value: normalize(phrase), tokens: tokenSet(phrase).size })),
  keywords: topic.keywords.map(normalize),
}]));

const scoreTopic = (normalizedQuestion: string, tokens: Set<string>, topic: ProfileTopic) => {
  let score = 0;
  const prepared = preparedTopics.get(topic)!;
  const normalizedLabel = prepared.label;
  if (normalizedLabel === normalizedQuestion) score += 70;
  else if (normalizedLabel && normalizedQuestion.includes(normalizedLabel)) {
    score += 24 + prepared.labelTokens * 4;
  }

  prepared.phrases.forEach(({ value: normalizedPhrase, tokens: phraseTokens }) => {
    if (normalizedPhrase === normalizedLabel) return;
    if (normalizedPhrase === normalizedQuestion) score += 50;
    else if (normalizedQuestion.includes(normalizedPhrase)) {
      score += 8 + phraseTokens * 2;
    }
  });

  const normalizedKeywords = prepared.keywords;

  normalizedKeywords.forEach((normalizedKeyword) => {
    if (normalizedKeyword.includes(" ")) {
      if (normalizedQuestion === normalizedKeyword) score += 6;
      else if (normalizedQuestion.includes(normalizedKeyword)) score += 4;
    }
  });

  const singleKeywords = normalizedKeywords.filter((keyword) => !keyword.includes(" "));
  tokens.forEach((token) => {
    const exactKeyword = singleKeywords.find((keyword) => keyword === token);
    if (exactKeyword) {
      score += exactKeyword.length > 3 ? 4 : 2;
      return;
    }
    const relatedKeyword = singleKeywords.find((keyword) => tokensMatch(token, keyword));
    if (relatedKeyword) score += relatedKeyword.length > 3 ? 3 : 2;
  });

  return score;
};

const isFollowUp = (question: string) =>
  /\b(tell me more|more detail|another example|example|evidence|expand|go deeper|why is that)\b/i.test(question);

const sectionLinks = {
  about: { href: "/about/#about", label: "Explore Zihua's story" },
  connect: { href: "/about/#about-connect-title", label: "Go to Let's Connect" },
  writing: { href: "/writing/", label: "Explore the Writing section" },
  experience: { href: "/experience/#experience", label: "Explore Zihua's experience" },
  professional: {
    href: "/experience/?track=professional#experience-panel-professional",
    label: "View professional experience",
  },
  research: {
    href: "/experience/?track=research#experience-panel-research",
    label: "View research experience",
  },
  education: {
    href: "/experience/?track=education#experience-panel-education",
    label: "View education",
  },
  credentials: {
    href: "/experience/?track=credentials#experience-panel-credentials",
    label: "View credentials",
  },
  projects: { href: "/ai/#ai-lab-title", label: "Open Project Constellation" },
  acknowledgements: { href: "/credits/#credit", label: "Open Acknowledgements" },
} satisfies Record<string, ProfileLink>;

const aboutTopicIds = new Set(["background", "personality", "values", "interests", "career_goals"]);
const professionalTopicIds = new Set(["asset_management", "fund_accounting", "internship_purpose"]);
const researchTopicIds = new Set(["research", "research_motivation"]);
const educationTopicIds = new Set(["current", "education", "international_experience"]);
const credentialTopicIds = new Set(["credentials", "cfa_journey", "frm_journey"]);
const projectTopicIds = new Set([
  "ai_approach",
  "ai_reliability",
  "ai_prompting",
  "human_advantage",
  "ai_risks",
  "ai_ethics",
  "excel",
  "business_intelligence",
  "sql",
  "python",
  "market_platforms",
  "data_analysis",
  "valuation_projects",
  "machine_learning",
  "technical",
]);

const navigationForTopic = (topicId: string): ProfileLink | undefined => {
  if (topicId === "thinking") return sectionLinks.writing;
  if (aboutTopicIds.has(topicId)) return sectionLinks.about;
  if (professionalTopicIds.has(topicId)) return sectionLinks.professional;
  if (researchTopicIds.has(topicId)) return sectionLinks.research;
  if (educationTopicIds.has(topicId)) return sectionLinks.education;
  if (credentialTopicIds.has(topicId)) return sectionLinks.credentials;
  if (projectTopicIds.has(topicId)) return sectionLinks.projects;
  return undefined;
};

const answerForTopic = (topic: ProfileTopic, useDetail = false): ProfileAnswer => ({
  text: useDetail ? topic.detail : topic.answer,
  topicId: topic.id,
  link: navigationForTopic(topic.id),
});

type AcknowledgementLookup = {
  entry: CreditEntry;
  fullName: string;
  firstName: string;
  lastName: string;
  nameTokens: Set<string>;
};

const acknowledgementLookup: AcknowledgementLookup[] = creditEntries.map((entry) => {
  const fullName = normalize(entry.name.replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.|Prof\.)\s+/i, ""));
  const parts = fullName.split(" ").filter(Boolean);
  return {
    entry,
    fullName,
    firstName: normalize(entry.firstName),
    lastName: parts.at(-1) ?? "",
    nameTokens: new Set(parts),
  };
});

const acknowledgementAliasCounts = acknowledgementLookup.reduce((counts, item) => {
  [item.firstName, item.lastName].filter((alias) => alias.length > 2).forEach((alias) => {
    counts.set(alias, (counts.get(alias) ?? 0) + 1);
  });
  return counts;
}, new Map<string, number>());

const findAcknowledgement = (question: string): CreditEntry | undefined => {
  const normalizedQuestion = normalize(question);
  const questionTokens = tokenSet(question);

  const fullNameMatch = acknowledgementLookup.find(
    ({ fullName, nameTokens }) =>
      normalizedQuestion === fullName ||
      normalizedQuestion.includes(fullName) ||
      (nameTokens.size > 1 && [...nameTokens].every((token) => questionTokens.has(token))),
  );
  if (fullNameMatch) return fullNameMatch.entry;

  const hasPersonIntent =
    /\b(who|about|know|person|people|mentor|professor|manager|supervisor|colleague|friend|acknowledg|credit)\b/.test(
      normalizedQuestion,
    );

  const uniqueAliasMatches = acknowledgementLookup.filter(({ firstName, lastName }) =>
    [firstName, lastName].some(
      (alias) =>
        alias.length > 2 &&
        acknowledgementAliasCounts.get(alias) === 1 &&
        (normalizedQuestion === alias || (hasPersonIntent && questionTokens.has(alias))),
    ),
  );

  return uniqueAliasMatches.length === 1 ? uniqueAliasMatches[0].entry : undefined;
};

const acknowledgementAnswer = (entry: CreditEntry): ProfileAnswer => ({
  text: `${entry.name} appears in Zihua's Acknowledgements. That section is the best place to view this person in the context of the mentors, colleagues, friends, and family members who have shaped his journey.`,
  topicId: "acknowledgements",
  link: {
    href: `/credits/?q=${encodeURIComponent(entry.name)}#${creditEntryAnchor(entry.name)}`,
    label: `Find ${entry.firstName} in Acknowledgements`,
  },
});

const sectionNavigationAnswer = (question: string): ProfileAnswer | undefined => {
  const normalizedQuestion = normalize(question);

  if (
    /^(email|email address|e mail|linkedin|linked in|linkedin profile|instagram|instagram account|ins|ig|social media|socials|contact|contact info|contact information|contact details|lets connect|get in touch)$/.test(
      normalizedQuestion,
    ) ||
    /\b(how|where) (can|do|could) i (contact|reach|connect with|get in touch with) (zihua|him)\b/.test(
      normalizedQuestion,
    ) ||
    /\b(what|where) is (zihuas|his) (email|linkedin|instagram)\b/.test(normalizedQuestion) ||
    /\bdoes (zihua|he) have (a |an )?(email|linkedin|instagram)\b/.test(normalizedQuestion) ||
    /\b(open|show|visit|find)\b.*\b(email|linkedin|instagram|social media|socials|lets connect)\b/.test(
      normalizedQuestion,
    )
  ) {
    return {
      text: "Zihua's public Email, LinkedIn, and Instagram links are collected in the Let's Connect area of his About page. You can use that section to reach him through the channel that fits your message.",
      topicId: "public_contact",
      link: sectionLinks.connect,
    };
  }

  if (
    /^(thinking|thought|thoughts|idea|ideas|writing|writings|essay|essays|article|articles|blog|reflections?)$/.test(
      normalizedQuestion,
    ) ||
    /\b(where|how) can i (read|see|explore)\b.*\b(thinking|thoughts|writing|essays|articles|reflections)\b/.test(
      normalizedQuestion,
    ) ||
    /\b(show|open|visit|explore)\b.*\b(writing|essays|articles|reflections)\b/.test(normalizedQuestion)
  ) {
    const thinkingTopic = profileTopics.find((topic) => topic.id === "thinking");
    if (thinkingTopic) return answerForTopic(thinkingTopic);
  }

  if (
    /^(acknowledgements?|acknowledgments?|credits?)( section| page| directory)?$/.test(normalizedQuestion) ||
    /^(people|names|mentors?|professors?)( section| page| directory)?$/.test(normalizedQuestion) ||
    /\b(open|show|visit|explore|find)\b.*\b(acknowledgements?|acknowledgments?|credits?)\b/.test(
      normalizedQuestion,
    ) ||
    /\b(who|people|mentors?|professors?|colleagues?)\b.*\b(helped|supported|shaped|influenced|guided)\b/.test(
      normalizedQuestion,
    )
  ) {
    return {
      text: "Zihua's Acknowledgements collect the mentors, professors, colleagues, friends, and family members who have shaped his journey. You can search the directory by name, role, or organization.",
      topicId: "acknowledgements",
      link: sectionLinks.acknowledgements,
    };
  }

  if (
    /^(project|projects|ai project|ai projects|project constellation|portfolio project|portfolio projects)$/.test(
      normalizedQuestion,
    ) ||
    /\b(show|open|visit|explore|see)\b.*\b(project|projects|project constellation)\b/.test(normalizedQuestion)
  ) {
    return {
      text: "Zihua's Project Constellation presents his applied AI, research, and analytical projects as an interactive system. Select a project there to open its detailed file.",
      topicId: "projects",
      link: sectionLinks.projects,
    };
  }

  if (
    /^(experience|experiences|resume|cv|work history|internship|internships|professional experience)$/.test(
      normalizedQuestion,
    ) ||
    /\b(show|open|visit|explore|see)\b.*\b(experience|resume|cv|work history|internships)\b/.test(
      normalizedQuestion,
    )
  ) {
    return {
      text: "Zihua's Experience section brings together his professional work, research, education, and credentials. It is the best overview of what he has done and how those experiences connect.",
      topicId: "experience",
      link: sectionLinks.experience,
    };
  }

  if (
    /^(about|about zihua|his story|personal story|my story|principles)$/.test(normalizedQuestion) ||
    /\b(show|open|visit|explore|see)\b.*\b(about|story|principles)\b/.test(normalizedQuestion)
  ) {
    return {
      text: "Zihua's About section introduces his story, principles, values, personal constants, and long-term goals. It provides a broader picture beyond his résumé.",
      topicId: "background",
      link: sectionLinks.about,
    };
  }

  return undefined;
};

export function getProfileAnswer(question: string, previousTopicId?: string): ProfileAnswer {
  const normalizedQuestion = normalize(question);
  const questionTokens = tokenSet(question);

  if (!normalizedQuestion) {
    return { text: "Ask me anything about Zihua's experience, thinking, strengths, values, or how he would handle a workplace situation." };
  }

  if (
    /\b(phone|telephone|mobile|wechat|whatsapp|dating|girlfriend|boyfriend|spouse|married|marital|single|salary|compensation|income|wealth|visa|immigration|citizenship|nationality|birthday|born|family|parent|parents|mother|father|sibling|siblings|brother|sister|religion|political|health|medical|passport|password)\b/.test(
      normalizedQuestion,
    ) ||
    /\b(home address|private address|where does he live|where do you live|date of birth|birth date|net worth|social security|sin number|relationship status|romantic relationship|romantic partner)\b/.test(
      normalizedQuestion,
    ) ||
    /^(relationship|partner)$/.test(normalizedQuestion) ||
    /\b(is|was) (zihua|he) (in a )?relationship\b|\bdoes (zihua|he) have a partner\b/.test(normalizedQuestion)
  ) {
    return { text: privateInformationResponse };
  }

  if (
    /^(year|school year|academic year|study year|what year|which year|what year is zihua|which year is zihua|what year is he|which year is he|what year are you in|what year is zihua in|what year is he in)$/.test(
      normalizedQuestion,
    ) ||
    /\b(what|which) (school|academic|study|university|college) year\b/.test(normalizedQuestion) ||
    /\b(what|which) year (is|are) (zihua|he|you)( currently)? in\b/.test(normalizedQuestion) ||
    /\b(what|which) year of (school|college|university) (is|are) (zihua|he|you) in\b/.test(normalizedQuestion)
  ) {
    return {
      text: "As of 2026, Zihua is in Year 5 at McMaster University, completing his Honours Bachelor of Commerce with Internship at the DeGroote School of Business. You could also ask what he studies, when he expects to graduate, or what he is working on now.",
      topicId: "education",
      link: sectionLinks.education,
    };
  }

  if (
    /^(age|his age|zihuas age)$/.test(normalizedQuestion) ||
    /\b(his|zihuas) age\b/.test(normalizedQuestion) ||
    /\bhow old (is|are) (zihua|he|you)\b/.test(normalizedQuestion)
  ) {
    return {
      text: "As of 2026, Zihua is 22 years old. You could also ask what year he is in, where he studies, or what he hopes to do after graduation.",
      topicId: "public_age",
      link: sectionLinks.about,
    };
  }

  if (
    /^(gender|his gender|zihuas gender|male or female|man or woman)$/.test(normalizedQuestion) ||
    /\b(his|zihuas|your) gender\b|\b(is|are) (zihua|he|you) (a )?(male|female|man|woman)\b/.test(
      normalizedQuestion,
    )
  ) {
    return {
      text: "Zihua is male. You could also ask about his personality, working style, or what he values in teammates.",
      topicId: "public_gender",
      link: sectionLinks.about,
    };
  }

  if (
    /^(university|school|college|undergraduate|where did you study|where do you study|where did you go to school|where do you go to school|where did you go to university|where do you go to university|where did zihua study|where does zihua study|where did he study|where does he study|where did he do his undergraduate|where is zihua studying|what university did you go to|what university does zihua attend|what university does he attend|undergraduate university|bachelors university)$/.test(
      normalizedQuestion,
    )
  ) {
    return {
      text: "Zihua is completing his Honours Bachelor of Commerce with Internship at McMaster University's DeGroote School of Business. You could also ask which year he is in, what he studies, or when he expects to graduate.",
      topicId: "education",
      link: sectionLinks.education,
    };
  }

  if (/\bpronouns?\b/.test(normalizedQuestion)) {
    return {
      text: "Zihua uses he/him pronouns. You could also ask about his major, university, or working style.",
      topicId: "public_pronouns",
      link: sectionLinks.about,
    };
  }

  if (
    /^(major|concentration|major or concentration|his major|zihuas major)$/.test(normalizedQuestion) ||
    /\b(his|zihuas) (major|concentration)\b|\b(does|did) (zihua|he) major in\b|\bfield of study\b/.test(
      normalizedQuestion,
    )
  ) {
    return {
      text: "Zihua's major is Finance. You could also ask about his minors, favorite university subject, or expected graduation date.",
      topicId: "education",
      link: sectionLinks.education,
    };
  }

  if (
    /^(minor|minors|his minor|his minors|zihuas minor|zihuas minors)$/.test(normalizedQuestion) ||
    /\b(his|zihuas) minors?\b|\bdoes (zihua|he) have (a |any )?minors?\b/.test(normalizedQuestion)
  ) {
    return {
      text: "Zihua's minors are Mathematics and Economics. You could also ask about his Finance major or favorite university subject.",
      topicId: "education",
      link: sectionLinks.education,
    };
  }

  if (
    /^(graduation|graduate|graduation date|expected graduation)$/.test(normalizedQuestion) ||
    /\bwhen (does|did|will) (zihua|he) graduat(?:e|es)\b|\bwhen (is|are) (zihua|he|you) graduating\b|\b(his|zihuas) (graduation|graduation date|expected graduation)\b/.test(
      normalizedQuestion,
    )
  ) {
    return {
      text: "Zihua expects to graduate in Spring 2027. You could also ask about his current year, major, or university.",
      topicId: "education",
      link: sectionLinks.education,
    };
  }

  if (
    /\b(favorite|favourite)\b/.test(normalizedQuestion) &&
    (/\b(course|class)\b/.test(normalizedQuestion) || /\buniversity subject\b/.test(normalizedQuestion))
  ) {
    return {
      text: "Zihua's favorite university subject is Economics. You could also ask about his Finance major or Mathematics and Economics minors.",
      topicId: "education",
      link: sectionLinks.education,
    };
  }

  if (
    /^(language|languages|his language|his languages|zihuas language|zihuas languages)$/.test(normalizedQuestion) ||
    /\b(what|which) languages? (does|can) (zihua|he) speak\b|\b(does|can) (zihua|he) speak\b.*\blanguages?\b|\bdoes (zihua|he) speak (english|chinese)\b/.test(
      normalizedQuestion,
    )
  ) {
    return {
      text: "Zihua speaks Chinese and English. You could also ask about his university background or cross-cultural experience.",
      topicId: "public_languages",
      link: sectionLinks.about,
    };
  }

  const acknowledgedPerson = findAcknowledgement(question);
  if (acknowledgedPerson) return acknowledgementAnswer(acknowledgedPerson);

  const navigationAnswer = sectionNavigationAnswer(question);
  if (navigationAnswer) return navigationAnswer;

  if (/\b(how are you|how is it going|hows it going|how have you been)\b/.test(normalizedQuestion)) {
    return {
      text: `I'm doing well, thanks for asking. ${assistantScopeResponse}`,
      topicId: "assistant_scope",
    };
  }

  if (/\b(who are you|what are you|whats your name|what is your name|what can you do|what do you do|are you an ai|are you ai|are you a robot)\b/.test(normalizedQuestion)) {
    return { text: assistantScopeResponse, topicId: "assistant_scope" };
  }

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(normalizedQuestion)) {
    return {
      text: `Hi! ${assistantScopeResponse}`,
      topicId: "assistant_scope",
    };
  }

  if (/^(thanks|thank you|thx|appreciate it)\b/.test(normalizedQuestion)) {
    return {
      text: "You're welcome. If you'd like to keep exploring, try asking about Zihua's working style, strengths, projects, career goals, or how he would handle a workplace situation.",
      topicId: "assistant_scope",
    };
  }

  if (/^(bye|goodbye|see you|talk to you later|have a good day)\b/.test(normalizedQuestion)) {
    return {
      text: "Thanks for stopping by. I'll be here whenever you'd like to learn more about Zihua.",
      topicId: "assistant_scope",
    };
  }

  if (isFollowUp(question) && previousTopicId) {
    const previousTopic = profileTopics.find((topic) => topic.id === previousTopicId);
    if (previousTopic) return answerForTopic(previousTopic, true);
  }

  const rankedTopics = profileTopics
    .map((topic) => ({ topic, score: scoreTopic(normalizedQuestion, questionTokens, topic) }))
    .sort((first, second) => second.score - first.score);
  const bestMatch = rankedTopics[0];
  const profileContextTokens = [
    "zihua",
    "he",
    "him",
    "his",
    "candidate",
    "experience",
    "internship",
    "resume",
    "background",
    "personality",
    "strength",
    "weakness",
    "skill",
    "teammate",
    "supervisor",
    "manager",
    "project",
    "career",
    "work",
  ];
  const hasProfileContext = [...questionTokens].some((token) =>
    profileContextTokens.some((contextToken) => tokensMatch(token, contextToken)),
  );

  const isShortTopicQuery =
    questionTokens.size === 1
      ? Boolean(bestMatch && bestMatch.score >= 2)
      : questionTokens.size <= 3 && Boolean(bestMatch && bestMatch.score >= 4);

  if (bestMatch && ((hasProfileContext && bestMatch.score >= 2) || bestMatch.score >= 8 || isShortTopicQuery)) {
    return answerForTopic(bestMatch.topic);
  }

  return { text: assistantScopeResponse, topicId: "assistant_scope" };
}
