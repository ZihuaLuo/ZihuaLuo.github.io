import { getCollection, type CollectionEntry } from "astro:content";
import { nowDashboardCopy } from "@data/now";
import { entrySlug, withBase, type Language } from "@i18n/routes";

type SearchType = "thought" | "note" | "timeline" | "now";

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

type TimelineEntry = CollectionEntry<"timeline">;

function timelineTitle(entry: TimelineEntry) {
  const company = entry.data.company ?? entry.data.organization ?? entry.data.context;
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

function timelineDateLabel(entry: TimelineEntry) {
  return entry.data.displayDate ?? entry.data.date;
}

function nowItems(lang: Language): SearchItem[] {
  const copy = nowDashboardCopy[lang];
  const url = withBase(lang === "zh" ? "/zh/now/" : "/now/");
  const tags = [
    ...copy.statusItems.map((item) => item.value),
    ...copy.focusItems.map((item) => item.label),
    ...copy.learningItems.map((item) => item.label),
    ...copy.learningItems.map((item) => item.display),
    ...copy.priorities.map((item) => item.value),
    ...copy.snapshot.flatMap((item) => [item.label, item.value]),
    ...copy.momentumTags,
  ];

  return [
    {
      title: copy.eyebrow,
      description: copy.subtitle,
      url,
      type: "now",
      category: lang === "zh" ? "量化成果" : "Impact Metrics",
      tags,
      language: lang,
      content: [
        copy.title,
        copy.focusTitle,
        copy.learningTitle,
        copy.prioritiesTitle,
        copy.snapshotTitle,
        copy.momentumTitle,
      ].join(" "),
    },
    {
      title: copy.focusTitle,
      description: copy.focusSubtitle,
      url,
      type: "now",
      category: lang === "zh" ? "成果分布" : "Achievement Mix",
      tags: copy.focusItems.map((item) => item.label),
      language: lang,
    },
    {
      title: copy.learningTitle,
      description: copy.learningSubtitle,
      url,
      type: "now",
      category: lang === "zh" ? "证书与学习记录" : "Credential & Learning Record",
      tags: copy.learningItems.flatMap((item) => [item.label, item.display]),
      language: lang,
    },
    {
      title: copy.prioritiesTitle,
      description: copy.priorities.map((item) => `${item.label}: ${item.value}`).join(" | "),
      url,
      type: "now",
      category: lang === "zh" ? "核心指标" : "Core Metrics",
      tags: copy.priorities.map((item) => item.value),
      language: lang,
    },
    {
      title: copy.momentumTitle,
      description: copy.momentumBody,
      url,
      type: "now",
      category: lang === "zh" ? "执行负载" : "Operating Load",
      tags: copy.momentumTags,
      language: lang,
    },
  ];
}

export async function GET() {
  const includeDrafts = !import.meta.env.PROD;
  const thoughts = await getCollection("thoughts", ({ data }) => includeDrafts || !data.draft);
  const notes = await getCollection("notes", ({ data }) => includeDrafts || !data.draft);
  const timeline = await getCollection("timeline", ({ data }) => includeDrafts || !data.draft);

  const writingItems: SearchItem[] = [
    ...thoughts.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      url: withBase(
        entry.data.language === "zh"
          ? `/zh/thoughts/${entrySlug(entry.id)}/`
          : `/thoughts/${entrySlug(entry.id)}/`,
      ),
      type: "thought" as const,
      category: entry.data.category,
      tags: entry.data.tags,
      language: entry.data.language,
      date: entryDateLabel(entry),
      content: cleanMarkdown(entry.body),
    })),
    ...notes.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      url: withBase(
        entry.data.language === "zh"
          ? `/zh/notes/${entrySlug(entry.id)}/`
          : `/notes/${entrySlug(entry.id)}/`,
      ),
      type: "note" as const,
      category: entry.data.category,
      tags: entry.data.tags,
      language: entry.data.language,
      date: entryDateLabel(entry),
      content: cleanMarkdown(entry.body),
    })),
  ];

  const timelineItems: SearchItem[] = timeline.map((entry) => ({
    title: timelineTitle(entry),
    description: entry.data.description,
    url: withBase(entry.data.language === "zh" ? "/zh/#timeline" : "/#timeline"),
    type: "timeline",
    category: entry.data.category,
    tags: entry.data.tags,
    language: entry.data.language,
    date: timelineDateLabel(entry),
    content: [
      entry.data.role,
      entry.data.company,
      entry.data.organization,
      entry.data.context,
      entry.data.highlight,
    ]
      .filter(Boolean)
      .join(" "),
  }));

  const items = [
    ...writingItems,
    ...timelineItems,
    ...nowItems("en"),
    ...nowItems("zh"),
  ];

  return new Response(JSON.stringify(items), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
