import { withBase } from "@i18n/routes";

export const essaysPerPage = 12;
export const essayPreviewLimit = 3;

export const writingSeries = [
  {
    slug: "cognition",
    category: "Cognition",
    title: "Cognition",
    description: "Reflections on cognitive models, boundaries, trust, attention, and self-training.",
  },
  {
    slug: "economic-thinking",
    category: "Economic Thinking",
    title: "Economic Thinking",
    description: "Thinking through incentives, costs, choices, resource allocation, and long-term returns.",
  },
  {
    slug: "finance",
    category: "Finance",
    title: "Finance",
    description: "Frameworks for markets, risk, investment logic, and financial judgment.",
  },
  {
    slug: "business-cases",
    category: "Business Cases",
    title: "Business Cases",
    description: "Business models, strategy, products, and management judgment through real cases.",
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
