import { getCollection, type CollectionEntry } from "astro:content";
import { entrySlug, withBase, type Language } from "@i18n/routes";

type SearchType = "writing" | "experience";

type SearchItem = {
  title: string;
  description: string;
  url: string;
  type: SearchType;
  category: string;
  tags: string[];
  language: Language;
  date?: string;
  content?: string;
  track?: string;
  aliases?: string[];
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
  return entry.data.displayDate ?? entry.data.date;
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

export async function GET() {
  const writing = await getCollection(
    "writing",
    ({ data }) => data.language === "en" && !data.draft,
  );
  const experience = await getCollection(
    "experience",
    ({ data }) => data.language === "en" && !data.draft,
  );

  const writingItems: SearchItem[] = writing.map((entry) => ({
    title: entry.data.title,
    description: entry.data.description,
    url: withBase(`/writing/${entrySlug(entry.id)}/`),
    type: "writing" as const,
    category: entry.data.category,
    tags: entry.data.tags,
    language: entry.data.language,
    date: entryDateLabel(entry),
    content: cleanMarkdown(entry.body),
  }));

  const experienceItems: SearchItem[] = experience.map((entry) => ({
    title: experienceTitle(entry),
    description: entry.data.description,
    url: experienceUrl(entry),
    type: "experience",
    category: entry.data.category,
    tags: entry.data.tags,
    language: entry.data.language,
    date: experienceDateLabel(entry),
    content: experienceSearchContent(entry),
    track: entry.data.track,
    aliases: experienceAliases(entry),
  }));

  const items = [
    ...experienceItems,
    ...writingItems,
  ];

  return new Response(JSON.stringify(items), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
