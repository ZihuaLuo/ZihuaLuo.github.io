import { withBase } from "@i18n/routes";

export const essaysPerPage = 12;
export const essayPreviewLimit = 3;

export const writingSeries = [
  {
    slug: "cognition",
    category: "Cognition",
    title: "Cognition",
    description: "How we learn, direct our attention, build trust, and make better decisions.",
  },
  {
    slug: "economic-thinking",
    category: "Economic Thinking",
    title: "Economic Thinking",
    description: "How incentives, opportunity costs, and tradeoffs shape everyday choices and social outcomes.",
  },
  {
    slug: "finance",
    category: "Finance",
    title: "Finance",
    description: "Exploring market behavior, investment decisions, and the risks behind potential returns.",
  },
  {
    slug: "business-cases",
    category: "Business Cases",
    title: "Business Cases",
    description: "Lessons from companies and founders on building products, choosing strategies, and leading teams.",
  },
] as const;

export type WritingSeries = (typeof writingSeries)[number];

export function writingSeriesPath(slug: string, page = 1): string {
  const root = `/writing/series/${slug}/`;
  return page > 1 ? `${root}page/${page}/` : root;
}

export function writingSeriesHref(slug: string, page = 1): string {
  return withBase(writingSeriesPath(slug, page));
}
