import { getCollection, type CollectionEntry } from "astro:content";
import { creditEntries, creditEntryAnchor } from "@data/credits";
import { profileTopics } from "@data/aiProfile";
import { writingSeries } from "@data/writingSeries";
import { entrySlug, withBase, type Language } from "@i18n/routes";

type SearchType = "writing" | "experience" | "section" | "acknowledgement" | "project" | "chatbot";

type SearchItem = {
  title: string;
  description: string;
  url: string;
  type: SearchType;
  category: string;
  tags: string[];
  language: Language;
  date?: string;
  track?: string;
  aliases?: string[];
  searchContent: string;
};

function cleanMarkdown(value = "") {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#__*>\-[\]()`]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeSearchValue(value: unknown) {
  return String(value ?? "")
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function prepareSearchItem(
  item: Omit<SearchItem, "searchContent">,
  searchableContent = "",
): SearchItem {
  return {
    ...item,
    searchContent: normalizeSearchValue(searchableContent),
  };
}

function topicTitle(label: string) {
  return label.replace(/\b\w/g, (character) => character.toUpperCase());
}

function conciseDescription(value: string, maxLength = 176) {
  if (value.length <= maxLength) return value;
  const shortened = value.slice(0, maxLength);
  const lastBoundary = Math.max(shortened.lastIndexOf(". "), shortened.lastIndexOf(", "), shortened.lastIndexOf(" "));
  return `${shortened.slice(0, Math.max(90, lastBoundary)).trim()}…`;
}

type ExperienceEntry = CollectionEntry<"experience">;

function experienceTitle(entry: ExperienceEntry) {
  const company = entry.data.company ?? entry.data.organization ?? entry.data.context;
  if (entry.data.track === "professional") {
    return [company, entry.data.role].filter(Boolean).join(" | ");
  }
  if (entry.data.track === "research" || entry.data.track === "credentials") {
    return entry.data.title ?? [entry.data.role, company].filter(Boolean).join(" | ");
  }
  if (entry.data.track === "education") {
    return entry.data.education?.degree ?? entry.data.role ?? company ?? entry.data.category;
  }

  const type = entry.data.type ?? (entry.data.featured ? "milestone" : "experience");
  if (type !== "milestone") {
    return [entry.data.role, company].filter(Boolean).join(" | ") || entry.data.title || entry.data.category;
  }

  return (
    entry.data.title ??
    [entry.data.role, company].filter(Boolean).join(" | ") ??
    entry.data.category
  );
}

function entryDateLabel(entry: { data: { date: Date; displayDate?: string } }) {
  return entry.data.displayDate ?? entry.data.date.toISOString().slice(0, 10);
}

function experienceDateLabel(entry: ExperienceEntry) {
  return entry.data.date;
}

function experienceUrl(entry: ExperienceEntry) {
  const track = entry.data.track;
  const anchor = `experience-${entrySlug(entry.id)}`;
  return withBase(`/experience/?track=${encodeURIComponent(track)}#${anchor}`);
}

function experienceAliases(entry: ExperienceEntry) {
  const source = [entry.data.title, entry.data.role, ...entry.data.tags].filter(Boolean).join(" ");
  const numericLevels = source
    .replace(/\bLevel II\b/gi, "Level 2")
    .replace(/\bLevel I\b/gi, "Level 1")
    .replace(/\bPart II\b/gi, "Part 2")
    .replace(/\bPart I\b/gi, "Part 1");
  const aliases = numericLevels === source ? [] : [numericLevels];

  if (entry.data.tags.includes("Certified FRM")) {
    aliases.push("FRM Charterholder");
  }

  return aliases;
}

function experienceSearchContent(entry: ExperienceEntry) {
  const education = entry.data.education;
  return [
    entry.data.role,
    entry.data.company,
    entry.data.organization,
    entry.data.context,
    entry.data.highlight,
    entry.data.track,
    education?.degree,
    education?.school,
    ...(education?.fields ?? []),
    ...(education?.recognition.flatMap((item) => [item.label, item.value]) ?? []),
    education?.awardsLabel,
    ...(education?.awards ?? []),
  ]
    .filter(Boolean)
    .join(" ");
}

const siteSections: Array<{
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  type?: SearchType;
  aliases?: string[];
  content: string;
}> = [
  {
    title: "About",
    description: "An introduction to Zihua Luo and the ideas, work, and experiences shaping how he thinks.",
    url: "/about/#about",
    category: "About",
    tags: ["Finance", "Research", "AI"],
    aliases: ["About", "About Zihua Luo", "Zihua Luo", "Personal Website"],
    content: "Welcome to my personal website. Zihua Luo FRM. Finance, Research, and AI.",
  },
  {
    title: "My Story",
    description: "The experiences that shaped how I prepare, recover, learn, and try to become useful to others.",
    url: "/about/#about-story-title",
    category: "About",
    tags: ["Story", "Journey", "About"],
    aliases: ["About Me", "Biography", "Personal Journey"],
    content: "Canada Mary Keyes Residence preparation uncertainty fund system TD Asset Management presentation learning giving back",
  },
  {
    title: "Principles",
    description: "Sincerity, optimism, and resilience in work, relationships, and uncertain outcomes.",
    url: "/about/#about-principles-title",
    category: "About",
    tags: ["Sincerity", "Optimism", "Resilience"],
    aliases: ["Values", "Personal Principles"],
    content: "honesty commitments communication difficult problems steady progress uncertainty",
  },
  {
    title: "Sincerity",
    description: "Keeping words and actions aligned through honesty, early communication, and follow-through.",
    url: "/about/#principle-sincerity",
    category: "Principles",
    tags: ["Sincerity", "Honesty", "Commitment"],
    aliases: ["Personal Principle", "Honest Communication"],
    content: "sincerity honest honesty words actions agree communicating early commitment follow through",
  },
  {
    title: "Optimism",
    description: "Looking for a useful next step without ignoring uncertainty or difficulty.",
    url: "/about/#principle-optimism",
    category: "Principles",
    tags: ["Optimism", "Learning", "Action"],
    aliases: ["Personal Principle", "Useful Next Step"],
    content: "optimism useful next step learn system better question seek help uncertainty action",
  },
  {
    title: "Resilience",
    description: "Protecting priorities and returning with a better plan when the first one breaks.",
    url: "/about/#principle-resilience",
    category: "Principles",
    tags: ["Resilience", "Recovery", "Priorities"],
    aliases: ["Personal Principle", "Better Plan"],
    content: "resilience protecting priorities unexpected recover return better plan first plan breaks",
  },
  {
    title: "Donation",
    description: "A record of turning a childhood promise to give back into action.",
    url: "/about/#about-values-title",
    category: "About",
    tags: ["Giving Back", "Community", "Values"],
    aliases: ["United Nations", "UN Women", "Children's Nutrition Support", "Supporting Records"],
    content: "action speaks louder than words United Nations children nutrition donation supporting record community",
  },
  {
    title: "People",
    description: "Mentors, professors, colleagues, friends, and family who shaped the journey.",
    url: "/about/#about-people-title",
    category: "About",
    tags: ["People", "Mentors", "Acknowledgements"],
    aliases: ["No journey is built alone", "Credits"],
    content: "mentors professors colleagues friends family acknowledgements guidance trust",
  },
  {
    title: "United Nations",
    description: "The first contribution that turned a childhood promise to give back into action.",
    url: "/about/#donation-united-nations",
    category: "Donation",
    tags: ["United Nations", "UN Women", "Giving Back"],
    aliases: ["UN Donation", "UN Women Donation", "Supporting Record"],
    content: "united nations UN women donation first job offer childhood promise contribution giving back",
  },
  {
    title: "Children’s Nutrition Support",
    description: "Supporting nutritious meals and a fairer beginning for children.",
    url: "/about/#donation-childrens-nutrition",
    category: "Donation",
    tags: ["Children", "Nutrition", "Giving Back"],
    aliases: ["Children Nutrition Donation", "Meals for Children", "Supporting Record"],
    content: "children nutrition support nutritious meals fairer beginning donation giving back certificate",
  },
  {
    title: "A Few Constants",
    description: "A few personal details beyond work and study.",
    url: "/about/#about-personal-title",
    category: "About",
    tags: ["Personal", "Fun Facts"],
    aliases: ["A Few Things About Me", "Personal Aside", "About Me", "Beyond the Résumé", "Beyond the Resume"],
    content: "5L water daily Love Story featured soundtrack central task management system personal workflow template",
  },
  {
    title: "Love Story",
    description: "My featured soundtrack and a song I keep coming back to.",
    url: "/about/#about-love-story",
    category: "A Few Constants",
    tags: ["Music", "Taylor Swift", "Soundtrack"],
    aliases: ["Featured Soundtrack", "Music Player"],
    content: "Love Story Taylor Swift local audio music player featured soundtrack",
  },
  {
    title: "Central Task Management System",
    description: "One place for every commitment, task, and to-do, with a downloadable template.",
    url: "/about/#about-task-system",
    category: "A Few Constants",
    tags: ["Template", "Workflow", "Productivity"],
    aliases: ["Task Management Template", "To-do List", "Commitments"],
    content: "central task management system template spreadsheet xlsm workflow commitment task todo download",
  },
  {
    title: "5L of Water Daily",
    description: "A small personal fun fact: I keep hydration simple and consistent.",
    url: "/about/#about-water",
    category: "A Few Constants",
    tags: ["Fun Fact", "Personal"],
    aliases: ["5L Water", "Water per day"],
    content: "five litres liters water daily hydration routine fun fact",
  },
  {
    title: "Goal: Top 2%",
    description: "A long-term standard for continued learning, improvement, and high-quality work.",
    url: "/about/#about-goal-title",
    category: "About",
    tags: ["Goal", "Top 2%", "Growth"],
    aliases: ["Top 2 Percent", "Personal Goal", "Long-term Goal"],
    content: "goal top two percent top 2 percent learning improvement high standards growth best work",
  },
  {
    title: "Let's Connect",
    description: "Ways to start a conversation through email, LinkedIn, or Instagram.",
    url: "/about/#about-connect-title",
    category: "About",
    tags: ["Contact", "Email", "LinkedIn", "Instagram"],
    aliases: ["Contact Me", "Social Links"],
    content: "connect conversation finance research AI ideas email linkedin instagram",
  },
  {
    title: "Personal Motto",
    description: "Man Proposes, God Disposes",
    url: "/about/#about-motto-title",
    category: "About",
    tags: ["Motto", "Personal"],
    aliases: ["Man Proposes God Disposes"],
    content: "personal motto man proposes god disposes",
  },
  {
    title: "Experience",
    description: "A chronological view of professional work, research, education, and financial credentials.",
    url: "/experience/#experience",
    category: "Experience",
    tags: ["Professional", "Research", "Education", "Credentials"],
    aliases: ["Timeline", "Career"],
    content: "professional work research projects academic foundation education credentials career timeline",
  },
  {
    title: "Professional Experience",
    description: "Roles, responsibilities, and practical work across professional settings.",
    url: "/experience/?track=professional#experience-panel-professional",
    category: "Experience",
    tags: ["Professional", "Career", "Work"],
    aliases: ["Work Experience", "Employment", "Professional Timeline"],
    content: "professional experience career work employment roles responsibilities timeline",
  },
  {
    title: "Research Experience",
    description: "Selected research projects, methods, and analytical work.",
    url: "/experience/?track=research#experience-panel-research",
    category: "Experience",
    tags: ["Research", "Projects", "Analysis"],
    aliases: ["Research Projects", "Academic Research"],
    content: "research experience projects methods analysis analytical work academic research",
  },
  {
    title: "Education",
    description: "Academic background, degrees, fields of study, and recognition.",
    url: "/experience/?track=education#experience-panel-education",
    category: "Experience",
    tags: ["Education", "Academic", "Degree"],
    aliases: ["Academic Background", "University", "School"],
    content: "education academic background degree university school fields study awards recognition",
  },
  {
    title: "Credentials",
    description: "Financial credentials, examinations, certifications, and professional milestones.",
    url: "/experience/?track=credentials#experience-panel-credentials",
    category: "Experience",
    tags: ["Credentials", "FRM", "CFA"],
    aliases: ["Certifications", "Financial Credentials", "Exams"],
    content: "credentials certifications finance financial exams FRM CFA milestones charterholder",
  },
  {
    title: "AI Lab",
    description: "Zihua's interactive AI section, combining the Project Constellation and APOCALYPSE knowledge assistant.",
    url: "/ai/#ai-future-title",
    category: "AI",
    tags: ["AI", "AI Lab", "Projects", "Chatbot"],
    aliases: ["Artificial Intelligence", "AI Section", "Welcome to the Future", "System Online", "AI Page"],
    content: "AI lab welcome to the future artificial intelligence project constellation APOCALYPSE chatbot knowledge assistant applied AI research",
  },
  {
    title: "Project Constellation",
    description: "A cinematic interactive system of project worlds orbiting an AI singularity.",
    url: "/ai/#ai-lab-title",
    category: "AI Lab",
    tags: ["Projects", "AI", "Research", "Visualization"],
    aliases: ["AI Projects", "Project Worlds", "Project Galaxy", "Constellation", "Portfolio Projects"],
    content: "project constellation AI lab interactive project planets singularity agent research volunteer retention disclosure intelligence",
  },
  {
    title: "Agent Research Workflow",
    description: "A validated LLM-agent workflow for cleaning, classifying, and analyzing research data with human review.",
    url: "/ai/?project=agent-research#ai-lab-title",
    category: "Project Constellation",
    type: "project",
    tags: ["Codex", "LLM Agents", "Python", "Validation"],
    aliases: ["AI Research Workflow", "Agent Project", "Human Judgment Amplified by Agents"],
    content: "agent research workflow task specific LLM agents human review data cleaning classification validation audit evidence",
  },
  {
    title: "Volunteer Retention Lab",
    description: "Interactive cohort analysis for engagement, participation frequency, and volunteer-retention patterns.",
    url: "/ai/?project=retention-lab#ai-lab-title",
    category: "Project Constellation",
    type: "project",
    tags: ["Data Viz", "Cohort Analysis", "Power BI", "Research"],
    aliases: ["Volunteer Project", "Retention Dashboard", "Applied Analytics"],
    content: "volunteer retention lab cohort analysis engagement participation frequency Power BI dashboard 30 visualizations",
  },
  {
    title: "Disclosure Intelligence",
    description: "Structured SEC filings and corporate-scandal evidence prepared for machine-learning research.",
    url: "/ai/?project=disclosure-intelligence#ai-lab-title",
    category: "Project Constellation",
    type: "project",
    tags: ["Python", "SEC Filings", "Machine Learning", "Research"],
    aliases: ["Disclosure Project", "SEC Research", "Data Intelligence"],
    content: "disclosure intelligence SEC filings corporate scandal evidence Python extraction validation machine learning 30 years filings",
  },
  {
    title: "APOCALYPSE Knowledge Assistant",
    description: "Ask about Zihua's experience, personality, working style, projects, values, thinking, and approach to AI.",
    url: "/ai/#future-chat",
    category: "AI Lab",
    type: "chatbot",
    tags: ["Chatbot", "AI Assistant", "About Zihua", "FAQ"],
    aliases: ["Chatbot", "Chatbox", "AI Chat", "Future Chat", "Zihua Assistant", "Ask APOCALYPSE"],
    content: "APOCALYPSE interactive knowledge interface chatbot chatbox dedicated assistant ask about Zihua experience personality thinking work style projects strengths values AI",
  },
  {
    title: "Writing Archive",
    description: "Essays on cognition, economic thinking, finance, and business cases.",
    url: "/writing/",
    category: "Writing",
    tags: ["Essays", "Ideas", "Learning"],
    aliases: ["Writing", "Read My Writing", "Personal Writing Archive"],
    content: "writing archive essays cognition economic thinking finance business cases ideas notes learning",
  },
  {
    title: "Acknowledgements",
    description: "A searchable directory of people whose guidance, trust, and standards shaped the journey.",
    url: "/credits/#credit",
    category: "Acknowledgements",
    tags: ["People", "Mentors", "Network"],
    aliases: ["Credits", "Acknowledgements Directory"],
    content: "people mentors professors colleagues friends family guidance trust acknowledgements credits directory",
  },
];

export async function GET() {
  const writing = await getCollection(
    "writing",
    ({ data }) => data.language === "en" && !data.draft,
  );
  const experience = await getCollection(
    "experience",
    ({ data }) => data.language === "en" && !data.draft,
  );

  const writingItems: SearchItem[] = writing.map((entry) => prepareSearchItem({
    title: entry.data.title,
    description: entry.data.description,
    url: withBase(`/writing/${entrySlug(entry.id)}/`),
    type: "writing" as const,
    category: entry.data.category,
    tags: entry.data.tags,
    language: entry.data.language,
    date: entryDateLabel(entry),
  }, cleanMarkdown(entry.body)));

  const experienceItems: SearchItem[] = experience.map((entry) => prepareSearchItem({
    title: experienceTitle(entry),
    description: entry.data.description,
    url: experienceUrl(entry),
    type: "experience",
    category: entry.data.category,
    tags: entry.data.tags,
    language: entry.data.language,
    date: experienceDateLabel(entry),
    track: entry.data.track,
    aliases: experienceAliases(entry),
  }, experienceSearchContent(entry)));

  const sectionItems: SearchItem[] = [
    ...siteSections,
    ...writingSeries.map((series) => ({
      title: series.title,
      description: series.description,
      url: `/writing/series/${series.slug}/`,
      category: "Writing Series",
      type: "section" as const,
      tags: [series.category, "Essays"],
      aliases: [`${series.title} essays`, `${series.title} writing`],
      content: `${series.category} ${series.description}`,
    })),
  ].map((item) => prepareSearchItem({
    title: item.title,
    description: item.description,
    url: withBase(item.url),
    type: item.type ?? "section",
    category: item.category,
    tags: item.tags,
    language: "en",
    aliases: item.aliases,
  }, item.content));

  const acknowledgementItems: SearchItem[] = creditEntries.map((entry) => prepareSearchItem({
    title: entry.name,
    description: entry.role,
    url: withBase(`/credits/?q=${encodeURIComponent(entry.name)}#${creditEntryAnchor(entry.name)}`),
    type: "acknowledgement",
    category: entry.tier === "huge" ? "Huge Thanks" : "Acknowledgements",
    tags: [entry.organization, entry.tier === "huge" ? "Huge Thanks" : "Acknowledgements"],
    language: "en",
    aliases: [entry.firstName],
  }, `${entry.name} ${entry.firstName} ${entry.role} ${entry.organization}`));

  const chatbotItems: SearchItem[] = profileTopics.map((topic) => prepareSearchItem({
    title: `Ask about ${topicTitle(topic.label)}`,
    description: conciseDescription(topic.answer),
    url: withBase(`/ai/?ask=${encodeURIComponent(topic.id)}#future-chat`),
    type: "chatbot",
    category: "APOCALYPSE",
    tags: ["Chatbot", "About Zihua", ...topic.keywords.slice(0, 2)],
    language: "en",
    aliases: [topic.label, ...(topic.phrases ?? []), ...topic.keywords],
  }, [topic.label, ...topic.keywords, ...(topic.phrases ?? []), topic.answer, topic.detail].join(" ")));

  const items = [
    ...sectionItems,
    ...chatbotItems,
    ...experienceItems,
    ...writingItems,
    ...acknowledgementItems,
  ];

  return new Response(JSON.stringify(items), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
