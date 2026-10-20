type WritingEntry = {
  id: string;
  data: {
    category: string;
    date: Date;
    tags: string[];
    language: string;
    draft?: boolean;
  };
};

export function getWritingContinuation<T extends WritingEntry>(current: T, entries: T[]) {
  const published = entries.filter((entry) => !entry.data.draft && entry.data.language === current.data.language);
  // Follow the same newest-first order as the series archive, including ties.
  const series = published.filter((entry) => entry.data.category === current.data.category)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const index = series.findIndex((entry) => entry.id === current.id);
  const next = index >= 0 ? series[index + 1] : undefined;
  const previous = !next && index > 0 ? series[index - 1] : undefined;
  const adjacent = next ?? previous;
  const tags = new Set(current.data.tags.map((tag) => tag.trim().toLowerCase()));
  const related = published
    .filter((entry) => entry.id !== current.id && entry.id !== adjacent?.id)
    .map((entry) => ({
      entry,
      sharedTags: [...new Set(entry.data.tags)].filter((tag) => tags.has(tag.trim().toLowerCase())),
    }))
    .filter(({ entry, sharedTags }) => sharedTags.length > 0 || entry.data.category === current.data.category)
    .sort((a, b) => b.sharedTags.length - a.sharedTags.length ||
      Number(b.entry.data.category === current.data.category) - Number(a.entry.data.category === current.data.category) ||
      b.entry.data.date.valueOf() - a.entry.data.date.valueOf())
    .slice(0, 2);
  return { adjacent, direction: next ? "next" as const : "previous" as const, related };
}
