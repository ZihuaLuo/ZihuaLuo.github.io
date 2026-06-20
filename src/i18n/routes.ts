export type Language = "en" | "zh";

export const defaultLanguage: Language = "en";
export const languages: Record<Language, string> = {
  en: "English",
  zh: "中文",
};

export const navItems: Record<Language, { label: string; href: string }[]> = {
  en: [
    { label: "Home", href: "/" },
    { label: "Thinking", href: "/#thinking" },
    { label: "Impact", href: "/#impact" },
    { label: "Credits", href: "/#credit" },
  ],
  zh: [
    { label: "首页", href: "/zh/" },
    { label: "思考", href: "/zh/#thinking" },
    { label: "量化成果", href: "/zh/#impact" },
    { label: "致谢", href: "/zh/#credit" },
  ],
};

export function otherLanguage(lang: Language): Language {
  return lang === "en" ? "zh" : "en";
}

export function stripBase(pathname: string): string {
  const base = import.meta.env.BASE_URL || "/";
  if (base === "/" || !pathname.startsWith(base)) {
    return pathname;
  }
  const stripped = pathname.slice(base.length - 1);
  return stripped || "/";
}

export function withBase(path: string): string {
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL || "/";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (base === "/") {
    return normalizedPath;
  }

  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${normalizedBase}${normalizedPath}`;
}

export function langPath(lang: Language, englishPath: string): string {
  const path = englishPath.startsWith("/") ? englishPath : `/${englishPath}`;
  if (lang === "en") {
    return withBase(path);
  }
  return withBase(path === "/" ? "/zh/" : `/zh${path}`);
}

export function entrySlug(id: string): string {
  return id
    .replace(/\\/g, "/")
    .replace(/\.(md|mdx)$/i, "")
    .split("/")
    .pop() as string;
}

export function formatDate(date: Date, lang: Language): string {
  return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatEntryDate(entry: { date: Date; displayDate?: string }, lang: Language): string {
  return entry.displayDate ?? formatDate(entry.date, lang);
}

export function entryDateTime(entry: { date: Date; displayDate?: string }): string {
  return entry.displayDate?.match(/^\d{4}/)?.[0] ?? entry.date.toISOString();
}

export function readingTime(body = "", lang: Language): string {
  const plain = body
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[#__*>\-[\]()`]/g, " ")
    .trim();
  const count =
    lang === "zh"
      ? (plain.match(/[\u4e00-\u9fff]/g)?.length ?? 0) + plain.split(/\s+/).filter(Boolean).length
      : plain.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(count / (lang === "zh" ? 500 : 220)));
  return lang === "zh" ? `${minutes} 分钟阅读` : `${minutes} min read`;
}
