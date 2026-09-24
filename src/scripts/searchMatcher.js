export const normalizeSearchValue = (value) =>
  String(value ?? "")
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

const words = (value) => new Set(value.split(" ").filter(Boolean));
const hasTerm = (terms, token) => {
  if (terms.has(token)) return true;
  if (token.length < 4) return false;
  for (const word of terms) if (word.startsWith(token)) return true;
  return false;
};

export const prepareSearchItem = (item) => {
  const { searchContent, ...resultItem } = item;
  const fields = {
    title: normalizeSearchValue(item.title),
    description: normalizeSearchValue(item.description),
    category: normalizeSearchValue(item.category),
    tags: normalizeSearchValue((item.tags || []).join(" ")),
    content: typeof searchContent === "string" ? searchContent : "",
    type: normalizeSearchValue(item.type),
    date: normalizeSearchValue(item.date),
    track: normalizeSearchValue(item.track),
    aliases: normalizeSearchValue((item.aliases || []).join(" ")),
  };
  const important = [fields.title, fields.description, fields.tags, fields.aliases, fields.category, fields.track];
  return {
    ...resultItem,
    _search: {
      fields,
      terms: words([fields.title, fields.description, fields.category, fields.tags, fields.content, fields.type, fields.track, fields.aliases].join(" ")),
      importantTerms: important.map(words),
    },
  };
};

export const scoreSearchItem = (item, query, tokens) => {
  const { fields, terms, importantTerms } = item._search;
  if (tokens.some((token) => !hasTerm(terms, token) && !(/^\d{4}$/.test(token) && fields.date.includes(token)))) return 0;
  if (tokens.length > 1 && !fields.content.includes(query)) {
    if (!importantTerms.some((fieldTerms) => tokens.every((token) => hasTerm(fieldTerms, token)))) return 0;
  }

  let score = 0;
  if (fields.title.includes(query)) score += 34;
  if (fields.title === query) score += 70;
  else if (fields.title.startsWith(query)) score += 14;
  if (fields.tags.includes(query)) score += 22;
  if (fields.aliases.includes(query)) score += 20;
  if (fields.category.includes(query)) score += 16;
  if (fields.track.includes(query)) score += 14;
  if (fields.track === query) score += 90;
  if (fields.description.includes(query)) score += 12;
  if (fields.date.includes(query)) score += 6;
  if (fields.content.includes(query)) score += 4;

  for (const token of tokens) {
    if (fields.title.includes(token)) score += 12;
    if (fields.tags.includes(token)) score += 9;
    if (fields.aliases.includes(token)) score += 8;
    if (fields.category.includes(token)) score += 7;
    if (fields.track.includes(token)) score += 6;
    if (fields.description.includes(token)) score += 5;
    if (fields.date.includes(token)) score += 3;
    if (fields.content.includes(token)) score += 1;
  }
  return score > 0 ? score : 0;
};

export const rankSearchItems = (items, rawQuery, limit = 12) => {
  const query = normalizeSearchValue(rawQuery);
  if (!query) return { matches: [], total: 0 };
  const tokens = query.split(" ");
  const resultYear = (item) => {
    const match = String(item.date || "").match(/\d{4}/);
    return match ? Number(match[0]) : 0;
  };
  const ranked = items
    .map((item) => ({ item, score: scoreSearchItem(item, query, tokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || resultYear(b.item) - resultYear(a.item) || a.item.title.localeCompare(b.item.title));
  return { matches: ranked.slice(0, limit).map(({ item }) => item), total: ranked.length };
};
