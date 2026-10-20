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
  "Zihua is a final-year commerce student at McMaster, specializing in Finance with minors in Economics, Mathematics, and Innovation. His experience at CIBC Mellon and TD Asset Management gave him a practical understanding of investment funds. Five research assistant roles, including recent mutual fund and ETF work, strengthened his interest in investment research. He has passed CFA Level II and is a certified FRM, and his longer-term goal is portfolio management.";

const privateInformationResponse =
  "I can share a few public basics about Zihua, such as his age, gender, and university, but I cannot help with other private or sensitive details. You can ask about his experience, personality, strengths, growth areas, preferred teammates or supervisor, feedback style, career goals, research, technical skills, values, or approach to AI.";

const assistantScopeResponse =
  "I'm Zihua's dedicated assistant. I'm here to help visitors learn about him, including his experience, personality, thinking, work style, projects, and approach to AI. You could try asking, \"What is Zihua like to work with?\" or \"What motivates him?\"";

// Public summaries reviewed against 面试文档 v2.docx on 20 October 2026.
export const profileCorpusRevision = "2026-10-20-interview-v2";

export const profileTopics: ProfileTopic[] = [
  {
    id: "background",
    label: "background",
    keywords: ["background","profile","overview","introduce","biography","bio"],
    phrases: ["who is zihua","tell me about zihua","professional story","career story","tell me about yourself","introduce zihua","walk me through your resume","walk me through his resume"],
    answer: profileOverview,
    detail:
      "He wants to understand how information about businesses, markets, and risk informs investment decisions. Research has taught him to question whether a pattern supports the conclusion being drawn. Graduate study is his intended next step toward deeper financial and quantitative training. Outside academic and professional work, mentoring, tutoring, and giving back remain important parts of his story.",
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
    keywords: ["current","today","now","present","focus"],
    phrases: ["what is he doing","current role","current focus"],
    answer:
      "Zihua is completing his final year at McMaster while continuing finance research. His recent mutual fund and ETF project studies what historical similarity does and does not tell us about investments. He is also preparing for graduate study to strengthen his financial economics and quantitative foundations, with investment research and ultimately portfolio management as his direction.",
    detail:
      "His next step is about developing judgment as well as technical capability. He wants to learn from professors, classmates, and experienced investors, connect statistical methods to financial questions, and become better at explaining the assumptions and risks behind a conclusion.",
  },
  {
    id: "education",
    label: "education",
    keywords: ["education","school","college","university","degree","gpa","course","study","mcmaster","degroote","student"],
    phrases: ["academic background","what did he study","what does he study","where does he study"],
    answer:
      "Zihua is completing an Honours Bachelor of Commerce with Internship at McMaster University's DeGroote School of Business, with expected graduation in Spring 2027. He specializes in Finance and has minors in Economics, Mathematics, and Innovation. His cumulative GPA is 3.89 out of 4.00, and he made the Dean's Honour List and DeGroote's top 10% from 2022 to 2025.",
    detail:
      "Mathematics supports his quantitative training, Economics helps him understand markets and incentives, and Innovation teaches him to identify needs, test assumptions, and develop practical solutions. He wants graduate study to deepen these foundations and improve his ability to evaluate financial research independently.",
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
    keywords: ["td","asset","management","valuation","oversight","mrfp","statement","fund"],
    phrases: ["td asset management","fund valuation oversight","financial reporting"],
    answer:
      "At TD Asset Management, Zihua worked as a Business Management Intern within Fund Valuation Oversight. His main responsibility was supporting investment-fund financial statement production and review, with additional exposure to MRFP reporting. He checked balances, NAV-related figures, valuation records, schedules, and disclosures, then followed questions through to a verified correction.",
    detail:
      "He adjusted review priorities to the product: pricing and income for fixed income, contract terms and valuation inputs for derivatives, and underlying-fund rollups for fund-of-funds. He maintained issue trackers and review evidence, compared document versions, and rechecked related sections when revised materials arrived. This was oversight and reporting work, rather than a portfolio-management role.",
  },
  {
    id: "fund_accounting",
    label: "fund-accounting experience",
    keywords: ["cibc","mellon","nav","accounting","reconciliation","custodian","broker","institutional"],
    phrases: ["cibc mellon","fund accountant","institutional funds"],
    answer:
      "At CIBC Mellon, Zihua supported daily NAV delivery for eight institutional funds with more than $3 billion in assets under management. The work involved reconciling prices, FX, cash, accruals, positions, and corporate actions within tight post-market-close deadlines. He also prepared monthly reporting and worked with custodians, colleagues, and clients to investigate breaks.",
    detail:
      "He traced differences to their underlying records, distinguished timing issues from errors, documented corrections, and reran checks before release. For year-end distributions, his contribution focused on validating income and capital-gains inputs, reconciling positions and cash, and checking distribution amounts and cutoffs for review and sign-off.",
  },
  {
    id: "research",
    label: "research experience",
    keywords: ["research","dataset","database","professor","phd","publication","scandal","volunteer","retention"],
    phrases: ["research assistant","research projects","data research","five research assistant roles","research assistant experience","what research has he done"],
    answer:
      "Zihua has held five research assistant roles covering mutual fund and ETF similarity, Canadian electricity systems, Finance PhD outcomes, volunteer engagement, and corporate scandals and non-compete disclosures. Across these projects, he turns broad questions into structured datasets, checked comparisons, and visual explanations. He is especially interested in whether the evidence supports a useful interpretation.",
    detail:
      "Recent work includes fund risk and return profiles, clustering and common-period comparisons, and integrating Statistics Canada electricity data. Other roles involved academic-outcome records, volunteer cohorts, SEC disclosures, and news evidence. The shared discipline is to define the unit of analysis, check coverage and missing data, document decisions, and communicate the limits of the result.",
  },
  {
    id: "ai_approach",
    label: "approach to AI",
    keywords: ["ai","artificial","llm","model","prompt","codex","claude","automation","agent"],
    phrases: ["approach ai","use ai","think about ai","thinking about ai","thoughts on ai","views on ai","opinion on ai","prompt the ai","ai philosophy"],
    answer:
      "Zihua uses AI as support for research and learning while retaining responsibility for the result. He breaks work into small tasks, tests realistic samples, reviews suggested code, and checks important claims against original sources. He also asks whether a successful calculation actually answers the financial or research question. Speed matters, but so do understanding, repeatability, and sound judgment.",
    detail:
      "In volunteer research, AI helped him organize data, develop code, and create visualizations. He still had to define cohorts and fair observation windows himself. When learning, he tries a problem first, asks focused questions, and explains or changes the code independently. In investment analysis, he would use AI to challenge an idea, while personally evaluating evidence, valuation assumptions, and portfolio fit.",
  },
  {
    id: "ai_reliability",
    label: "AI reliability and validation",
    keywords: ["reliable","reliability","accurate","accuracy","validate","validation","verify","hallucination"],
    phrases: ["trust ai output","check ai output","ensure ai accuracy","ensure ai output","ai outputs are reliable","reliable ai output","validate ai","quality control for ai"],
    answer:
      "Zihua treats AI output as a draft requiring validation. He tests a workflow on a small sample, compares it with original records, refines decision rules, and adds checks for missing values, duplicates, unusual classifications, and inconsistent formats. Ambiguous records go to human review. After scaling, he traces selected completed records back to their sources.",
    detail:
      "Validation also includes checking definitions and reasoning. In volunteer research, recent entrants could not fairly be compared with volunteers observed for six months. If AI contradicts his analysis, he checks that both sides use the same data, dates, and definitions, then independently tests the point of disagreement. Neither confidence nor automation substitutes for evidence.",
  },
  {
    id: "ai_prompting",
    label: "AI prompting workflow",
    keywords: ["prompt","prompting","instruction","iterate","iteration","workflow"],
    phrases: ["prompt ai","prompt the ai","prompt to code","write prompts","use codex","manage ai"],
    answer:
      "Zihua approaches prompting as an iterative workflow rather than a single request. He provides context and an objective, separates the project into small tasks, tests each step, and gives specific feedback. Once a step works consistently across examples, he saves its instructions and decision rules and records progress so the work can be repeated and reviewed.",
    detail:
      "An early attempt to build an ad hoc research database asked AI to do too much at once. It produced output quickly, but classifications and formats were inconsistent. He rebuilt the workflow around one field, rule, or record type at a time, then added automated checks and manual review. That experience shifted his focus from maximum automation to less rework and dependable results.",
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
    keywords: ["strength","advantage","best","excel","capability","skill","talent"],
    phrases: ["what is he good at","what are zihuas strengths","top strengths","sets him apart","stand out"],
    answer:
      "Zihua describes his strengths as willingness to learn, resilience under pressure, and the ability to understand another person's perspective. He has developed these habits through professional exams, extra mathematics courses, internships, and research. Before producing an analysis or explaining a concept, he tries to understand what the other person needs and what would make the work useful.",
    detail:
      "Balancing work, coursework, research, and exams has taught him to identify priorities and adjust when a plan is not working. Tutoring and working with professors have reinforced the value of listening first. He sees these habits as relevant to graduate study as well as work: learn from others, contribute reliably, and remain open about gaps in his understanding.",
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
    keywords: ["contribution","contribute","support","dependable","flexible","reliable","helpful"],
    phrases: ["contribute to the team","bring to the team","value to a team","help his teammates","role on a team"],
    answer:
      "Zihua wants to be a reliable teammate who understands what the group needs, owns his responsibilities, and speaks up early about delivery risks. He also looks beyond his assigned section when another person needs help. Detailed work such as checking figures, explaining an unfamiliar point, or reviewing a final report matters to him even when it is less visible.",
    detail:
      "He compares this contribution to a screw that helps a complex machine run smoothly. The point is dependable execution rather than visibility. He checks that his own commitments are covered before offering additional help, then supports the shared outcome instead of treating completion of his section as the end of his responsibility.",
  },
  {
    id: "weaknesses",
    label: "weaknesses and growth areas",
    keywords: ["weakness","weaknesses","flaw","disadvantage","improve","overthink","overanalyze"],
    phrases: ["areas for improvement","growth areas","what is he working on","biggest weakness","top weaknesses"],
    answer:
      "Zihua has worked on overscheduling, offering help before checking his own commitments, and overthinking major career decisions. He now leaves buffer time, communicates how much support he can realistically provide, and accepts that a decision will rarely come with perfect information. He is learning to choose based on the opportunities and development that matter to his longer-term goals.",
    detail:
      "When considering graduate study versus full-time work, collecting more opinions sometimes increased uncertainty because each person was reasoning from a different experience. He began asking which path would offer stronger learning, resources, and market exposure. An over-scripted TD presentation taught him a related lesson: preparation should include a way to recover when the plan changes.",
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
    keywords: ["adaptability","adapt","change","unexpected","quick","rotation","new role"],
    phrases: ["last minute change","think on his feet","adapt quickly","different roles","new team","handle change"],
    answer:
      "Zihua adapts by understanding what a situation requires and identifying the message or task that matters most. In a case competition, he had only about 40 seconds left for his section and reorganized it around the essential points. Across roles, he asks what a useful contribution looks like before assuming a previous approach will fit.",
    detail:
      "CIBC Mellon required accurate NAV work under daily deadlines. TD Asset Management involved careful document review and follow-up. Research is more open-ended and requires exploring methods and testing interpretations. He carries forward data and communication skills while adjusting the process, asking focused questions, and seeking feedback early.",
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
    keywords: ["communication","communicate","explain","present","client","audience","trust","feedback"],
    phrases: ["communication style","complex concept","build trust","different audiences"],
    answer:
      "Zihua starts with what the other person already understands and adapts the amount of detail to their needs. When tutoring a student on swaps, he began with a familiar example of exchanging help, then explained that a financial swap exchanges cash flows under agreed rules, such as fixed and floating interest payments. He uses analogies as a starting point, then clarifies the actual concept.",
    detail:
      "His mentoring experience also taught him to listen before advising. One student wanted campus and social guidance, while another wanted practical finance and career discussions. If his wording causes a misunderstanding, he asks what the person heard, clarifies the specific point, and takes responsibility for the impact rather than relying only on his intentions.",
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
    keywords: ["time","schedule","priority","deadline","productivity","organized","burnout","busy"],
    phrases: ["time management","manage priorities","multiple deadlines","stay organized"],
    answer:
      "Zihua uses an Excel task system to organize priorities, dates, and smaller milestones across research, study, and work. He keeps short review tasks for gaps in the day and protects longer blocks for unfamiliar analysis. He also leaves room for unexpected issues rather than assuming a tightly packed schedule will hold.",
    detail:
      "The system began as consistent task and event tables. He used Excel's Record Macro feature to capture repeated sorting steps, then connected the macro to a button to reorder tasks by priority and date. He developed the tool gradually as his needs changed. The purpose is to reduce repetitive organization and make the next important task clear.",
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
    keywords: ["learn","learning","growth","improve","feedback","curiosity","quickly","training"],
    phrases: ["learn quickly","growth mindset","respond to feedback","keep learning","learning something quickly","how does he learn quickly","how does he check his understanding"],
    answer:
      "Zihua learns by breaking an unfamiliar subject into the next useful step, working through a simple example, and applying it to real data. He checks understanding by explaining why a method is appropriate, what its output means, and where it can mislead. If he cannot explain or modify the work himself, he goes back to the underlying concept.",
    detail:
      "His mutual fund and ETF project is a recent example. Learning that funds can have similar average returns while moving differently in the same months helped him see why one measure cannot answer every question. He combines focused study blocks with smaller milestones and uses documentation or AI for support while testing and owning the analysis.",
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
    keywords: ["repeat","redo","retrospective","reflection","prototype","improve","dashboard"],
    phrases: ["do differently","repeat a project","improve a past project","improve about a past project","what would he improve","what would he change","lesson from a project"],
    answer:
      "If Zihua repeated an early AI-assisted database project, he would start with smaller, testable steps rather than ask the model to process a large task at once. He would agree on definitions, validate representative examples, save working instructions, and include review points before scaling. The aim would be a useful and repeatable process with less corrective work.",
    detail:
      "He applies the same principle to dashboards. In electricity research, the questions about generation, final users, and flows determined the views and labels. He wants a clear starting point and enough detail to explore a pattern, rather than presenting every available variable. A useful deliverable begins with the question and the checks behind the chart.",
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
    keywords: ["decision","difficult","tough","tradeoff","choose","choice","frm"],
    phrases: ["tough decision","difficult decision","hard choice","important tradeoff","decision under pressure","decision he made","why did he choose tdam","why did he choose td asset management","choosing between career opportunities"],
    answer:
      "One important career decision was choosing TD Asset Management among opportunities in several banking functions. Zihua asked which environment would bring him closer to understanding investments and portfolio decisions. He knew the internship focused on valuation oversight and reporting, but chose it for its relevant fund exposure and opportunities to learn from asset-management professionals.",
    detail:
      "He used coffee chats and networking across the firm to explore work beyond his immediate responsibilities. Another demanding decision was continuing FRM Part II alongside six courses, an internship, and recruiting. In that case, he reduced lower-priority commitments and reorganized his schedule. Both experiences taught him to make tradeoffs explicit and connect a choice to what he wants to learn.",
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
    keywords: ["competing","commitments","priorities","juggle","multitask","workload","schedule"],
    phrases: ["juggled multiple priorities","competing priorities","many commitments","manage multiple projects","several priorities at once","overlapping commitments"],
    answer:
      "Zihua has balanced a full-time TD Asset Management internship with two part-time research roles and CFA Level II preparation, and has managed similar overlaps at CIBC Mellon. He divides large goals into smaller milestones, plans around fixed deadlines, and uses short gaps for focused review while reserving longer blocks for difficult learning or analysis.",
    detail:
      "The system includes communicating limits. When SEC-screening work and fund-accounting deadlines converged, he proposed reviewing a smaller group of firms that week rather than quietly weakening accuracy. His recent fund research also required learning new methods alongside final-year courses and another project, so he planned around both deadlines and the depth of each task.",
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
    keywords: ["influence","authority","persuade","alignment","departments","buy-in","leadership"],
    phrases: ["influence without authority","gain buy in","lead without authority","persuade other teams","influence stakeholders","no formal authority","leadership without being the team leader","lead without a title","leadership without authority"],
    answer:
      "Zihua believes leadership can mean creating clarity and helping others contribute without holding a formal title. If a group were stuck, he would summarize the options, confirm the shared objective, invite quieter voices, and help agree on the next actions. When another person has the relevant expertise, he is comfortable supporting their lead.",
    detail:
      "His startup financial-planning work provides a practical example. He coordinated four departments around common budget information, invited their context, and focused discussion on variances and priorities. His aim is to make collaboration easier through evidence, listening, and follow-through rather than relying on authority.",
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
    keywords: ["project","off-track","stalled","recover","milestone","scope","progress"],
    phrases: ["project is off track","project falls behind","recover a delayed project","work is not progressing","project going wrong","get a project back on track"],
    answer:
      "If a project were off track, Zihua would return to the original question and identify whether the barrier was scope, evidence, method, or execution. He would keep useful completed work, make the next required comparison explicit, and agree on a smaller checkpoint that could show whether the revised approach was working.",
    detail:
      "In fund research, grouping on mean return and volatility was useful but could not show whether funds moved together. He kept that benchmark and added matching-period return comparisons. His AI database experience showed another kind of problem: when the process creates inconsistent output, smaller validated steps can be more effective than simply increasing effort.",
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
    keywords: ["delegate","delegating","assign","ownership","workload","responsibility","lead"],
    phrases: ["delegate work","assign tasks","divide responsibilities","decide who does what","share workload","delegate under pressure","how would you delegate an important task"],
    answer:
      "When delegating an important task, Zihua would explain its purpose, expected outcome, deadline, and requirements, then discuss the person's workload and comfort with the assignment. He would agree on ownership and support, give them room to choose their approach, and use an early checkpoint when other work depends on the result.",
    detail:
      "He would avoid taking a task back simply because he would have done it differently. A teammate may be ready to present findings while needing help with the underlying analysis. Good delegation makes that support explicit and gives someone genuine responsibility, with enough shared context to produce a coherent final project.",
  },
  {
    id: "values",
    label: "values and social impact",
    keywords: ["value", "values", "principle", "motivate", "purpose", "society", "give", "donation", "impact"],
    phrases: ["what motivates him", "give back", "social impact", "personal values"],
    answer:
      "Zihua is motivated by learning, becoming useful to others, and turning good intentions into action. His interest in investment research and portfolio management reflects a desire to build sound judgment and take responsibility for meaningful decisions. He also wants professional growth to increase his ability to contribute to the wider community, not simply improve his own position.",
    detail:
      "He has linked career milestones with charitable giving and has supported other students through mentoring, tutoring, and tax volunteering. Research offers another kind of contribution: careful work that helps someone investigate an important question. His guiding idea is that actions speak louder than words, with ambition and responsibility growing together.",
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
    keywords: ["career","future","goal","goals","ambition","years","aspire","become"],
    phrases: ["career goal","long term goal","five years","ten years","future plans","person he wants to be","long term career goal","where does he want his career to go","what does he want to do after graduation","investment research analyst","portfolio management goal"],
    answer:
      "Zihua's long-term goal is to become a portfolio manager who makes well-researched investment decisions and manages risk carefully. In the nearer term, he hopes to develop as an investment research analyst at an asset management firm. Graduate study is his intended next step toward deeper financial economics, stronger quantitative skills, and more independent investment judgment.",
    detail:
      "CIBC Mellon and TD Asset Management introduced him to investment-fund operations and oversight. Mutual fund and ETF research made him more curious about how investments behave together. Over time, he wants to earn greater responsibility for recommendations and portfolio decisions while staying honest about uncertainty and the trust involved in managing other people's money.",
  },
  {
    id: "internship_purpose",
    label: "purpose of internships",
    keywords: ["internship","intern","platform","exposure","opportunity","experience"],
    phrases: ["why internships","goal of an internship","value of internship","what internships mean","seeking an internship"],
    answer:
      "Zihua values internships as a way to learn from real constraints and people whose work he hopes to understand more deeply. At CIBC Mellon he learned how investment funds operate day to day. At TD Asset Management, fund oversight and conversations across teams broadened his view of asset management and strengthened his interest in investment research.",
    detail:
      "He also sees professional growth as connected to giving back. Career milestones prompted him to act on a long-standing commitment to support social causes. An internship is valuable to him when it develops useful skills, expands his perspective, and helps him become more capable of contributing to both a team and the wider community.",
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
    keywords: ["research","professor","academic","evidence","open-ended","question"],
    phrases: ["why research","why research assistant","enjoy research","research interests him","research motivation"],
    answer:
      "Zihua continues taking research roles because he enjoys questions whose answers are not obvious at the beginning. He likes turning a broad idea into an investigation, testing whether the evidence supports the interpretation, and receiving feedback from professors. That process has strengthened his interest in investment research and his motivation for graduate study.",
    detail:
      "Volunteer research made him examine observation windows and overlapping engagement measures. Mutual fund and ETF research made him distinguish statistical similarity from moving together over time. Both taught him to question a first interpretation, learn the limits of a method, and form a judgment he can explain rather than simply report an appealing pattern.",
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
    keywords: ["excel","vba","macro","formula","spreadsheet","lookup","pivot"],
    phrases: ["excel skills","use excel","excel model","excel automation","built in excel"],
    answer:
      "Zihua uses Excel for financial review, reconciliation, budgeting, and practical workflow tools. He works with lookup formulas, pivots, variance flags, conditional formatting, and linked dashboards. His task-management system uses recorded macros and a button to repeat sorting steps. He develops these tools incrementally around a specific need rather than automating for its own sake.",
    detail:
      "Examples include a TD fund-reporting exception file, a student grade calculator, and startup templates for departmental expense input, budget consolidation, actual-versus-budget analysis, and a summary dashboard. He checks that identifiers, dates, units, and assumptions align before treating a spreadsheet difference as an error.",
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
    keywords: ["sql","database","query","join","select","group","table"],
    phrases: ["sql skills","use sql","do with sql","write sql","database queries","inner join","left join","duckdb sql","how has he used sql","sql research workflow"],
    answer:
      "Zihua has used SQL and DuckDB to clean, filter, join, and aggregate Statistics Canada electricity records. He preserves the original data, checks categories and units, and validates the output before using it in analysis. He sees a query that runs successfully as the beginning of verification rather than proof that the result is correct.",
    detail:
      "In one annual-generation query, a filter returned no rows because the source used 'producer' rather than 'producers'. He inspected distinct labels, corrected the filter, and checked for twelve distinct, nonmissing months per province-year. He selected the official total instead of adding totals to components, and compared annual results with a prepared reference dataset.",
  },
  {
    id: "python",
    label: "Python",
    keywords: ["python","pandas","numpy","seaborn","matplotlib","scikit","code","coding"],
    phrases: ["python skills","use python","do with python","python experience","code in python","python libraries","python learning progress","how does he use python in research"],
    answer:
      "Zihua uses Python for data cleaning, statistical analysis, visualization, and repeatable research workflows. His recent mutual fund and ETF project covered approximately 2.56 million monthly return observations. He calculated fund-level return and volatility measures, built a K-means benchmark, and compared distributions and matching-period correlations to understand the limits of the initial groups.",
    detail:
      "He uses pandas and NumPy to organize data, combine records, handle missing values, and calculate measures, with visualization and scikit-learn tools for analysis. He continues strengthening his programming and methodological understanding. When code is unfamiliar, he uses documentation and AI assistance, then reviews intermediate results and tests the logic before relying on it.",
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
    keywords: ["analysis","analyze","data","insight","dataset","clean","visualize"],
    phrases: ["approach data analysis","analyze data","turn data into insights","data analysis process","work with data"],
    answer:
      "Zihua starts data analysis by defining the question and checking whether the data and measures fit it. He cleans, joins, and validates information before examining patterns. He asks whether a comparison is fair, whether a result makes sense, and what the method leaves out, then explains findings in plain language with appropriate charts.",
    detail:
      "Examples include checking province-year uniqueness before electricity joins, using matching calendars to compare fund returns, and requiring enough follow-up before evaluating volunteer commitment. His TD reporting experience added another discipline: a difference may reflect a date, unit, series, or version mismatch, so its meaning needs investigation before correction.",
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
    keywords: ["machine","learning","model","regression","ridge","polynomial","gridsearch","prediction"],
    phrases: ["machine learning","ml project","predictive model","regression model","data science project"],
    answer:
      "Zihua's machine-learning experience includes a Python K-means benchmark for fund similarity and scikit-learn regression projects. In the fund benchmark, he compared twelve cluster counts across five random seeds, totaling sixty model fits. He used silhouette scores for separation and adjusted Rand indices for agreement across starting points, while keeping financial interpretation separate from numerical stability.",
    detail:
      "In an IBM project, he compared linear, polynomial, and ridge regressions with pipelines and GridSearchCV; the tuned ridge model achieved about 0.65 R-squared on test data. He used heatmaps and residual plots to examine relationships and fit. Clustering and prediction answer different questions, so he does not present one metric as validation of every kind of model.",
  },
  {
    id: "technical",
    label: "technical toolkit",
    keywords: ["technical","technology","python","sql","excel","vba","tableau","power","bloomberg","factset","tool"],
    phrases: ["technical skills","tools does he use","technology stack"],
    answer:
      "Zihua's toolkit combines Excel, Python, SQL and DuckDB, Power BI, Bloomberg, FactSet, and AI-assisted workflows. He uses these tools to validate financial reporting, organize research data, examine statistical patterns, and communicate findings. He is continuing to deepen his programming and quantitative skills alongside the practical experience he has already developed.",
    detail:
      "Recent examples include recorded Excel macros for task sorting, an exception-review file for fund statements, DuckDB checks on monthly electricity data, Python fund clustering and distribution comparisons, and sample-tested AI workflows. He wants to understand and review a process, not merely produce an output through a tool.",
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
    keywords: ["hire","candidate","fit","recruit","role","employer","contribute"],
    phrases: ["why hire him","strong candidate","good fit","bring to a team"],
    answer:
      "Zihua brings practical investment-fund experience, a foundation in finance and risk, and hands-on research and data skills. He is willing to learn, takes ownership of detailed work, and tries to understand what others need from an analysis. His direction is investment research and eventually portfolio management, with graduate study intended to deepen his financial and quantitative foundations.",
    detail:
      "He would contribute through dependable execution, careful validation, and clear communication while remaining honest about what he still needs to learn. His recent research demonstrates the habit he wants to develop further: investigate a question, test the assumptions, and distinguish a persuasive-looking result from a conclusion the evidence can support.",
  },
  {
    id: "innovation_minor",
    label: "innovation minor",
    keywords: ["innovation","minor","entrepreneurship","prototype","customer","assumptions"],
    phrases: ["what is his innovation minor","what is your innovation minor and what have you learned from it","innovation studies"],
    answer:
      "Zihua's Innovation minor at McMaster focuses on turning an idea into something useful. It combines entrepreneurship, creative problem-solving, and business development: understanding unmet needs, identifying the user, testing a simple prototype, and considering the value proposition and financial viability of a business model.",
    detail:
      "The most useful habit for him is testing assumptions before committing to a solution. He also practices presenting ideas and responding to feedback. In finance, that perspective helps him look beyond a model to the customer need, how a company creates value, and what could prevent its business from succeeding.",
  },
  {
    id: "graduate_study",
    label: "motivation for graduate study",
    keywords: ["masters","master","graduate","degree","postgraduate","foundation","quantitative"],
    phrases: ["why a masters degree","why graduate study","why does he want a masters","why do you still want a masters degree","with ai making learning more accessible"],
    answer:
      "Zihua wants graduate study to provide a structured foundation in financial economics and quantitative methods, with opportunities to apply ideas and receive feedback. AI has made unfamiliar topics easier to explore, but it has also shown him how much independent judgment matters when evaluating assumptions, methods, and conclusions. His longer-term goal is portfolio management.",
    detail:
      "He values learning with professors and classmates who approach problems differently. Explaining and defending an idea can reveal gaps that studying alone may miss. He would continue using AI as a tool while developing the ability to assess its suggestions independently, rather than treating access to an answer as equivalent to understanding it.",
  },
  {
    id: "fund_similarity",
    label: "mutual fund and ETF research",
    keywords: ["fund","etf","mutual","similarity","clustering","maheu","ra5"],
    phrases: ["mutual fund and etf project","mutual funds and etfs","fund similarity research","ra5","john maheu research","john maheu","research with john maheu"],
    answer:
      "Zihua's recent work with Professor John Maheu examines historical similarity among mutual funds and ETFs. He worked with about 2.56 million monthly return observations across 17,970 fund records, built risk and return profiles, and tested clustering choices. He then compared return distributions and matching-period correlations to ask what the apparent similarity actually meant.",
    detail:
      "The main lesson is that similar average returns and volatility do not establish that two funds move together or can replace one another. A grouping can help identify candidates for further investigation, but financial interpretation requires additional evidence. The public dashboard presents aggregate profiles and sensitivity comparisons rather than raw fund histories.",
  },
  {
    id: "fund_data_quality",
    label: "missing returns and fund data quality",
    keywords: ["missing","zero","returns","coverage","identifier","gaps"],
    phrases: ["missing fund returns","why not replace missing returns with zero","handle missing returns","fund data quality"],
    answer:
      "In fund research, Zihua kept missing returns separate from zero returns. A zero is an observed outcome; a missing value means no return was observed. He matched records using fund identifiers, checked whether gaps occurred inside or outside each history, and retained valid-month counts and date coverage alongside the calculated profiles.",
    detail:
      "Replacing gaps with zero would invent observations and alter estimated mean returns and volatility. He therefore used valid observations for the initial statistics and made their support visible. This also showed why funds with different history lengths needed additional calendar comparisons before interpreting their differences.",
  },
  {
    id: "fund_common_window",
    label: "common-window fund comparisons",
    keywords: ["common","window","120","6863","calendar","funds","history"],
    phrases: ["common window fund analysis","different lengths of return history","compare funds with different histories","common period fund comparison"],
    answer:
      "Zihua compared available-history fund profiles with a common window from July 2016 to June 2026. The common-window sample contained 6,863 fund records observed in all 120 months. Comparing the same eligible records across calendars helped examine whether apparent similarities depended on the market periods represented.",
    detail:
      "The tradeoff is selection: requiring complete coverage excludes many other records. He treats the common window as a sensitivity check rather than the entire fund universe, and keeps the broader 17,970-record panel as a separate historical view. Matching dates improves comparability but does not remove every limitation.",
  },
  {
    id: "clustering_validation",
    label: "clustering validation",
    keywords: ["kmeans","k","means","silhouette","rand","ari","seeds","clusters"],
    phrases: ["k means benchmark","silhouette score and adjusted rand index","how did he validate clustering","why choose k means","why did you choose k means as the initial benchmark","why did he choose k means"],
    answer:
      "Zihua standardized mean return and volatility, compared twelve cluster counts, and used five random seeds for each, producing sixty K-means fits. Silhouette scores assessed separation within a solution. Adjusted Rand indices compared assignments across starting points at the same cluster count. These checks distinguish separation from repeatability.",
    detail:
      "K-means offered an interpretable baseline, but feature scale, extreme values, and assumptions about group shape still matter. A four-group benchmark was useful without proving there are exactly four economic types of funds. Numerical stability needs to be considered alongside group size and the financial question.",
  },
  {
    id: "fund_distributions",
    label: "fund distributions and co-movement",
    keywords: ["distribution","kde","wasserstein","correlation","substitutability","comovement"],
    phrases: ["fund return distributions","similar distributions but low correlation","similar return distributions but low correlation","kde and wasserstein distance","can similar funds replace one another","fund substitutability"],
    answer:
      "Zihua used kernel density estimation to visualize return distributions, Wasserstein distance to quantify their differences, and correlations over matching months to examine co-movement. These are complementary questions. A distribution describes which outcomes occurred and how often, while correlation preserves the pairing of outcomes in time.",
    detail:
      "Two return series can contain the same outcomes in a different order, producing similar distributions but weak or negative correlation. KDE also depends on smoothing choices, so it should not be the only comparison. His conclusion is that distributional or mean-volatility similarity alone does not establish that one fund is a suitable replacement for another.",
  },
  {
    id: "electricity_research",
    label: "Canadian electricity research",
    keywords: ["canada","canadian","electricity","province","generation","consumption","ra4"],
    phrases: ["canadian electricity project","electricity systems research","electricity availability and final user consumption","regional electricity research"],
    answer:
      "Zihua's Canadian electricity research integrated three Statistics Canada datasets covering more than 21,000 records, ten provinces, and 2015 to 2024. He compared generation scale and mix, electricity sold to final users, and electricity flows, then built an interactive dashboard. Both totals and shares matter when provinces differ greatly in size.",
    detail:
      "He kept supply-side electricity availability separate from final-user sales and checked that joins preserved one row per province and year, giving 100 main comparison rows. Canada-level figures remained separate benchmarks. The work describes system patterns rather than treating higher consumption as proof of lower efficiency.",
  },
  {
    id: "electricity_sql",
    label: "electricity SQL validation",
    keywords: ["electricity","duckdb","sql","annual","months","producer","aggregation"],
    phrases: ["annual electricity totals","electricity sql query","sql query returned no rows","twelve distinct months","producers versus producer"],
    answer:
      "Zihua used DuckDB and SQL to prepare and aggregate a subset of more than 5,500 electricity records. When a query returned no rows, he inspected the actual category labels and found a singular-versus-plural filter mismatch. Correct syntax had not guaranteed a correct query.",
    detail:
      "Before accepting annual totals, he required twelve rows, twelve distinct months, and twelve nonmissing values per group. He selected the official total-generation category to avoid counting totals and components together. Twelve annual comparisons matched an earlier prepared dataset, a consistency check rather than independent verification of the underlying official figures.",
  },
  {
    id: "phd_research",
    label: "Finance PhD outcomes research",
    keywords: ["phd","completion","placement","advisor","publication","cohort"],
    phrases: ["finance phd research","phd completion and outcomes","academic outcomes project","finance phd dataset"],
    answer:
      "Zihua's Finance PhD research brings together student, faculty, publication, and placement information from multiple sources. He standardizes fields such as institutions, dates, and outcomes, checks duplicates and ambiguous records, and documents definitions so the database remains comparable and reviewable.",
    detail:
      "He then examines completion timelines, publication activity, advisor relationships, and graduate placements across programs and cohorts. Tables and visualizations make patterns easier to inspect, while outlier and sample-size checks help separate potentially meaningful differences from data-quality issues or a few influential observations.",
  },
  {
    id: "volunteer_research",
    label: "volunteer engagement research",
    keywords: ["volunteer","retention","commitment","cohort","onboarding","food","bank"],
    phrases: ["volunteer engagement and retention","food bank research","six month commitment measure","volunteer retention project"],
    answer:
      "Zihua studied volunteer participation and retention using validated cohort data and more than thirty visualizations. He checked that people had enough follow-up before comparing six-month commitment, defined in the project as at least six shifts within six months of the first shift. The underlying dashboard and records remain private; the website offers an illustrative overview.",
    detail:
      "He used Spearman rank correlations and cohort comparisons to examine early participation and the gap between initial shifts. He was careful that early shifts also contribute to the six-month measure, so the variables partly overlap. These are descriptive associations, not proof that increasing early participation causes stronger retention.",
  },
  {
    id: "disclosure_research",
    label: "non-compete and corporate scandal research",
    keywords: ["noncompete","non","compete","sec","scandal","filings","annotations"],
    phrases: ["non compete research","corporate scandal research","sec research project","non compete disclosures"],
    answer:
      "Zihua supported research on non-compete disclosures and corporate scandals by structuring evidence from SEC filings and news. His work included more than three hundred annotated snippets, historical filings spanning over thirty years, and screening more than two thousand news articles. He used clear coding rules and source review to make the evidence consistent.",
    detail:
      "Python helped clean text, standardize fields, flag duplicates, and organize company, event-date, and category information. He also used KNIME for text preprocessing and pattern checks. His contribution was evidence preparation and validation for further empirical research, rather than treating an annotation dataset as proof of a valuation effect.",
  },
  {
    id: "post_submission_error",
    label: "correcting an error after submission",
    keywords: ["submitted","submission","correction","error","notify","impact"],
    phrases: ["error after submitting","error after submission","discovered an error after submitting","mistake after sending work"],
    answer:
      "If Zihua discovered an error after submitting work, he would assess what was wrong and whether it could change a conclusion or decision. He would notify the relevant person promptly, take responsibility, and flag the concern immediately if someone was about to rely on the result. He would not wait for a complete investigation before warning about a material risk.",
    detail:
      "He would correct the work, review related calculations, and make clear what changed in the new version. Afterwards, he would investigate the cause and add a practical check where needed. If the implications required a supervisor's decision, he would explain the issue and bring options for the next step.",
  },
  {
    id: "analysis_disagreement",
    label: "disagreeing with a team analysis",
    keywords: ["analysis","disagreement","consensus","assumptions","evidence","view"],
    phrases: ["analysis disagreed with the team","analysis disagrees with the team","different conclusion from the team","analysis contradicts team view"],
    answer:
      "If Zihua's analysis disagreed with the team's view, he would first review his own data, assumptions, and calculations. He would then ask how the team reached its conclusion and compare definitions, time periods, and assumptions. He would explain both the evidence and the uncertainty, and discuss what could change either view.",
    detail:
      "A company can have strong growth prospects while its price already reflects those expectations, so apparent disagreement may concern valuation rather than business quality. He would update his position if he missed relevant evidence. If a difference remained, he would make the concern clear and follow the team's decision process.",
  },
  {
    id: "evidence_integrity",
    label: "keeping conclusions within the evidence",
    keywords: ["evidence","conclusion","overstate","causation","correlation","misleading"],
    phrases: ["stronger conclusion than the evidence supports","present a stronger conclusion","overstate findings","correlation versus causation","conclusion beyond the evidence"],
    answer:
      "If asked to present a stronger conclusion, Zihua would first clarify whether the request meant clearer communication or a claim beyond the evidence. He is willing to improve a message, but would explain when the proposed wording overstates the result and suggest an accurate alternative. A relationship in the data should not silently become a causal claim.",
    detail:
      "He would explain why a finding matters, retain its limitations, and identify what further analysis would strengthen the case. If pressure to mislead continued, he would state the boundary and seek appropriate guidance. His priority is a useful conclusion the reader can trust, including an honest account of what is not yet known.",
  },
  {
    id: "delivering_bad_news",
    label: "delivering bad news",
    keywords: ["bad","news","delay","impact","options","updates"],
    phrases: ["deliver bad news","communicate bad news","tell someone a deliverable will be delayed"],
    answer:
      "Zihua would deliver bad news early, with checked facts, a clear explanation of the impact, and practical options. If he contributed to the problem, he would acknowledge it. For a delayed research deliverable, he might propose sharing the completed section first or agreeing a revised deadline, while asking which priorities matter most to the recipient.",
    detail:
      "He would give the person room to respond, confirm the plan, and provide updates if circumstances changed. The purpose is not simply to announce a problem. It is to give others enough time and information to make a useful decision and to follow through on what has been agreed.",
  },
  {
    id: "fair_credit",
    label: "fair recognition for team contributions",
    keywords: ["credit","recognition","contribution","ownership","attribution"],
    phrases: ["someone took credit for his work","someone takes credit for your work","credit for my work","fair recognition"],
    answer:
      "If someone appeared to take credit for Zihua's work, he would first check whether the contribution had simply been unclear in a collective presentation. If the attribution was inaccurate, he would discuss a specific example privately and agree on an appropriate clarification. He would also acknowledge the support others had given him.",
    detail:
      "A one-time misunderstanding may need only a correction. A repeated issue or one affecting performance assessment would warrant raising the documented contributions with the project lead. Keeping responsibilities and progress visible can prevent ambiguity while preserving a collaborative relationship.",
  },
  {
    id: "helping_competitor",
    label: "helping a classmate competing for an opportunity",
    keywords: ["classmate","competing","competitor","opportunity","help","resources"],
    phrases: ["help a classmate competing for the same opportunity","helping a competitor","competing for the same opportunity"],
    answer:
      "Zihua would help a classmate preparing for the same opportunity by sharing public resources, practising questions together, or offering feedback. He sees learning together as valuable beyond a single selection decision. He would still protect his own preparation time and ensure that each person's application reflected their own work and experience.",
    detail:
      "The boundaries matter: he would not share confidential information or neglect commitments in order to help. Tutoring and mentoring have shaped this approach. He would want disappointment about an outcome to remain separate from how fairly and supportively he treats other people.",
  },
  {
    id: "changing_direction",
    label: "knowing when to change an approach",
    keywords: ["persist","persistence","pivot","direction","approach","sunk","method"],
    phrases: ["keep working or change direction","when to change direction","persistence versus changing approach","method cannot answer the question"],
    answer:
      "Zihua distinguishes a difficult method from one that cannot answer the question. In fund research, mean-return and volatility groups were useful but could not establish whether funds moved together. He kept the benchmark and added common-period return comparisons, rather than either discarding useful work or expecting more effort to overcome the method's limitation.",
    detail:
      "He would persist when practice or investigation can resolve the obstacle. When the problem is the match between method and question, he would adjust the approach. Time already spent is not, by itself, a reason to continue in a direction that cannot produce the evidence needed.",
  },
  {
    id: "confidentiality",
    label: "handling confidential information",
    keywords: ["confidential","privacy","permission","authorized","sharing","sensitive"],
    phrases: ["share confidential information","handle confidential information","request for research data","data privacy in research"],
    answer:
      "Before sharing confidential information, Zihua would clarify the request and check whether the recipient was authorized. Knowing someone or understanding their reason would not establish permission. For research data, he would confirm the terms with the professor; removing names alone might not make the information safe to share.",
    detail:
      "While checking, he could suggest public data or explain the general method instead. If sharing were approved, he would use the agreed channel and provide only the necessary information. His approach is to remain helpful while honoring the responsibilities attached to the material, including information obtained through an internship.",
  },
  {
    id: "project_handover",
    label: "handing over a research project",
    keywords: ["handover","hand","over","documentation","versions","remaining","workflow"],
    phrases: ["hand over a project","handover a project","project handover","someone else continue his research"],
    answer:
      "Zihua would prepare a short handover covering the purpose, current progress, remaining tasks, relevant versions, data sources, assumptions, and unresolved questions. He wants the next person to understand why the work was done a certain way and avoid mistaking an open issue for a confirmed result.",
    detail:
      "He would walk through the workflow and let the recipient try it, so gaps in the notes become visible. He would confirm upcoming deadlines, contacts, and whether follow-up support was available. To him, quality includes whether someone else can understand and continue the work with confidence.",
  },
  {
    id: "rejection",
    label: "responding to an unsuccessful application",
    keywords: ["rejection","rejected","selected","application","opportunity","disappointment"],
    phrases: ["not selected for an opportunity","handle rejection","unsuccessful application","opportunity he really wanted"],
    answer:
      "Zihua would acknowledge disappointment after an unsuccessful application, seek feedback respectfully if available, and choose a concrete improvement. He would also recognize that selection involves factors he cannot fully observe, rather than interpreting every rejection as a verdict on his ability.",
    detail:
      "He would reflect on how clearly he communicated his experience and motivation, then keep exploring other routes toward relevant skills. His interest in portfolio management can be developed through different research and investment-learning opportunities. Resilience means learning what he can while continuing to take useful steps.",
  },
  {
    id: "misunderstanding",
    label: "clarifying a misunderstanding",
    keywords: ["misunderstood","misunderstanding","wording","context","clarify","intentions"],
    phrases: ["someone misunderstood what he said","misunderstood something you said","clarify a misunderstanding"],
    answer:
      "If someone misunderstood Zihua, he would first ask what they heard and listen before defending his intention. He would identify whether the issue was wording, context, or a different assumption, then clarify the specific concern and apologize if his language was unfair. If others heard the original comment, he would ensure they also received the clarification.",
    detail:
      "For example, saying an analysis needs more work can sound like criticism of effort when the real concern is one unsupported conclusion. He would explain that distinction, invite the person's perspective, and consider how to communicate more precisely next time. Good intentions do not remove responsibility for how a message lands.",
  },
  {
    id: "tested_innovation",
    label: "choosing between a proven method and a new idea",
    keywords: ["proven","new","innovation","pilot","experiment","baseline"],
    phrases: ["proven approach and a new idea","choose between a proven method and a new idea","test a new workflow","reliable baseline"],
    answer:
      "Zihua would weigh the task, deadline, and consequences before replacing a proven approach. Close to delivery, he would use a reliable method that meets the need. With room to experiment, he would test a new idea on a small sample, compare it with the existing process, and check accuracy, time savings, and reviewability.",
    detail:
      "He would expand gradually if the results were promising and investigate inconsistent outputs before relying on them. A dependable baseline makes experimentation easier because it provides a comparison and a way to continue working while an idea develops. Novelty needs to offer a meaningful improvement.",
  },
  {
    id: "ai_benefits",
    label: "opportunities created by AI",
    keywords: ["ai","benefits","opportunities","demand","needs","generative"],
    phrases: ["positive impact of generative ai","advantage of generative ai","benefits of ai","hidden needs created by ai"],
    answer:
      "Zihua sees AI's potential as broader than completing existing tasks faster. He is interested in whether new capabilities reveal needs people could not previously serve and make new activities or services practical. In his view, that possibility is a reason to study the user and the problem, not simply measure how much output a tool produces.",
    detail:
      "He uses technological change as a way to think about new demand and behavior. At the same time, his own work keeps him attentive to validation, implementation, and value. A capability becomes useful when it supports something people need and can rely on, rather than only demonstrating technical novelty.",
  },
  {
    id: "ai_research",
    label: "using AI in volunteer research",
    keywords: ["ai","research","volunteer","codex","cohort","workflow"],
    phrases: ["example of how he used ai in research","example of how you used ai in your research","ai in volunteer research","ai assisted research example"],
    answer:
      "In volunteer-engagement research, Zihua used AI to help develop code for organizing records, comparing participation, and producing visualizations. He split the workflow into specific tasks, tested samples, and reviewed the suggested code. He remained responsible for the definitions and comparisons, including whether volunteers had enough follow-up to be evaluated fairly.",
    detail:
      "AI reduced repetitive coding work, giving him more time to examine the analysis itself. A convincing chart can still be misleading if its cohort definition is wrong. He therefore treats tool assistance and research judgment as separate responsibilities and validates both the intermediate data and the interpretation.",
  },
  {
    id: "ai_learning",
    label: "learning independently while using AI",
    keywords: ["ai","learning","understanding","independent","explain","modify"],
    phrases: ["ai supports learning rather than replacing it","ai supports his learning","learning without relying on ai","make sure you understand ai code"],
    answer:
      "Zihua tries a problem himself before turning to AI, so he can identify the actual gap. He asks focused questions or requests a small example instead of immediately seeking a complete solution. Afterwards, he explains the reasoning in his own words and makes a change independently. If he cannot do that, he knows he has more to learn.",
    detail:
      "For code, he asks why a step is needed, which assumptions it makes, and what changes when the input changes. He also connects the method back to the financial or research question. The goal is to become more capable of asking good questions and identifying weak answers over time.",
  },
  {
    id: "ai_investment",
    label: "AI as support for investment judgment",
    keywords: ["ai","investment","decision","valuation","portfolio","thesis"],
    phrases: ["rely on ai to make an investment decision","ai investment decision","use ai for investment decisions","ai and portfolio decisions"],
    answer:
      "Zihua would use AI to support investment analysis, but would need to understand and defend the reasoning before acting. It could organize public information, compare assumptions, or challenge a thesis. He would verify important claims against original sources, examine valuation assumptions, and consider the investor's objectives and existing portfolio exposures.",
    detail:
      "A persuasive case for a company is not automatically a suitable portfolio investment. If he could not explain the opportunity, downside risks, and evidence that would change his view, he would do more work. His interest in portfolio management makes judgment and accountability central to how he would use the tool.",
  },
  {
    id: "ai_disagreement",
    label: "investigating disagreement with AI",
    keywords: ["ai","contradict","contradiction","disagreement","recalculate","independent"],
    phrases: ["ai contradicts his analysis","ai contradicted your analysis","ai gave you an answer that contradicted your own analysis","ai answer disagrees with me"],
    answer:
      "If AI contradicted Zihua's analysis, he would investigate rather than assume either answer was correct. He would first check whether both used the same question, definitions, data, and dates. Then he would isolate the point of disagreement and test it through original sources, a simple example, or an independent recalculation.",
    detail:
      "If his own analysis was wrong, he would correct it and understand the failure. If the AI claim was unsupported, he would set it aside. If the conflict remained unresolved, he would explain the uncertainty and seek another perspective. He wants neither confidence in a tool nor attachment to his first answer to replace evidence.",
  },
  {
    id: "misconceptions",
    label: "misconceptions about his achievements",
    keywords: ["misconception","naturally","smart","confidence","effort","preparation"],
    phrases: ["misconceptions about zihua","achievements came easily","naturally smart and confident","what people misunderstand about him"],
    answer:
      "People sometimes assume Zihua's academic and professional achievements came easily or reflect natural confidence. He describes a different process: substantial preparation, repeated practice, organized notes, and careful review. The confidence comes from having worked through the material and being willing to keep learning, rather than believing he already knows everything.",
    detail:
      "Professional exam preparation involved breaking the curriculum into weekly targets, practising difficult concepts, and adjusting the plan around weak areas. He applies a similar habit before presentations and reporting tasks. He wants others to understand the work behind the outcome without presenting hard work as a guarantee that nothing will go wrong.",
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
    // A generic one-word label such as SQL should not outweigh a more specific
    // phrase such as an electricity SQL query in a longer question.
    score += prepared.labelTokens === 1 ? 8 : 24 + prepared.labelTokens * 4;
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

// Only context-dependent follow-ups reuse the previous topic. A new question
// containing "example" or "evidence" must still be matched on its own merits.
const isFollowUp = (question: string) =>
  /^(?:(?:can|could|would) you )?(?:(?:please )?(?:tell me more|more details?|another example|an example|example|evidence|expand|go deeper|why is that|give (?:me |us )?(?:an |another )?example|show (?:me )?(?:the )?evidence))(?: (?:please|about (?:that|this)|of (?:that|this)))?$/.test(normalize(question));

const sectionLinks = {
  about: { href: "/#about", label: "Explore Zihua's story" },
  connect: { href: "/#about-connect-title", label: "Go to Let's Connect" },
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
const researchTopicIds = new Set([
  "research", "research_motivation", "fund_similarity", "fund_data_quality",
  "fund_common_window", "clustering_validation", "fund_distributions",
  "electricity_research", "electricity_sql", "phd_research", "volunteer_research", "disclosure_research",
]);
const educationTopicIds = new Set(["current", "education", "international_experience", "innovation_minor", "graduate_study"]);
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
  "ai_benefits",
  "ai_research",
  "ai_learning",
  "ai_investment",
  "ai_disagreement",
]);

const navigationForTopic = (topicId: string): ProfileLink | undefined => {
  if (["fund_similarity", "fund_data_quality", "fund_common_window", "clustering_validation", "fund_distributions"].includes(topicId)) {
    return { href: "/projects/fund-similarity-dashboard/", label: "Explore the Fund Similarity dashboard" };
  }
  if (["electricity_research", "electricity_sql"].includes(topicId)) {
    return { href: "/projects/canadian-provincial-electricity-dashboard.html", label: "Explore the Canadian Electricity dashboard" };
  }
  if (topicId === "phd_research") return { href: "/projects/finance-phd-eda-report.html", label: "Explore the Finance PhD analysis" };
  if (topicId === "volunteer_research") return { href: "/ai/?project=retention-lab#ai-lab-title", label: "View the public Volunteer Retention overview" };
  if (topicId === "disclosure_research") return sectionLinks.research;
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
    /\b(phone|telephone|mobile|wechat|whatsapp|dating|girlfriend|boyfriend|spouse|married|marital|single|salary|compensation|wealth|visa|immigration|citizenship|nationality|birthday|born|family|parent|parents|mother|father|sibling|siblings|brother|sister|religion|political|health|medical|passport|password)\b/.test(
      normalizedQuestion,
    ) ||
    /^(?:(?:annual|monthly|personal|employment) )?income$|\b(?:his|zihuas|your|personal)(?: (?:annual|monthly|employment))? income\b|\bhow much (?:does|did) (?:he|zihua) (?:earn|make)\b/.test(normalizedQuestion) ||
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
      text: "Zihua's minors are Economics, Mathematics, and Innovation. You could also ask what he has learned from the Innovation minor or about his Finance major.",
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
      text: "Zihua's favorite university subject is Economics. You could also ask about his Finance major or his Economics, Mathematics, and Innovation minors.",
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
  if (acknowledgedPerson) {
    // A question about a named professor's project should describe the work;
    // a question about the person still opens their acknowledgement.
    if (/\b(research|projects?|funds?|etfs?|clustering|electricity)\b/.test(normalizedQuestion)) {
      const researchMatch = profileTopics
        .filter((topic) => researchTopicIds.has(topic.id))
        .map((topic) => ({ topic, score: scoreTopic(normalizedQuestion, questionTokens, topic) }))
        .sort((first, second) => second.score - first.score)[0];
      if (researchMatch && researchMatch.score >= 8) return answerForTopic(researchMatch.topic);
    }
    return acknowledgementAnswer(acknowledgedPerson);
  }

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
