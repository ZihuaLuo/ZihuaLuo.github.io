export type Language = "en";

export type NavItem = {
  label: string;
  href: string;
  activePrefixes?: string[];
};

export const navItems: Record<Language, NavItem[]> = {
  en: [
    { label: "About", href: "/about/" },
    { label: "Experience", href: "/experience/" },
    {
      label: "Writing",
      href: "/writing/",
      activePrefixes: ["/writing/"],
    },
    { label: "Acknowledgements", href: "/credits/" },
    { label: "AI", href: "/ai/" },
  ],
};

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

export function entrySlug(id: string): string {
  return id
    .replace(/\\/g, "/")
    .replace(/\.(md|mdx)$/i, "")
    .split("/")
    .pop() as string;
}

export function formatDate(date: Date, _lang: Language): string {
  return new Intl.DateTimeFormat("en-US", {
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

export function readingTime(body = "", _lang: Language): string {
  const plain = body
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[#__*>\-[\]()`]/g, " ")
    .trim();
  const count = plain.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(count / 220));
  return `${minutes} min read`;
}
