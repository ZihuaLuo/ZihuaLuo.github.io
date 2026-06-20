import { withBase, type Language } from "@i18n/routes";

type LocalizedText = Record<Language, string>;

export const thoughtsPerPage = 12;
export const thoughtPreviewLimit = 6;

export const thoughtSeries = [
  {
    slug: "cognition",
    category: {
      en: "Cognition",
      zh: "认知篇",
    },
    title: {
      en: "Cognition",
      zh: "认知篇",
    },
    description: {
      en: "Reflections on cognitive models, boundaries, trust, attention, and self-training.",
      zh: "关于认知方式、边界判断、长期信用、注意力价值和自我训练的反思。",
    },
  },
  {
    slug: "economic-thinking",
    category: {
      en: "Economic Thinking",
      zh: "经济思维篇",
    },
    title: {
      en: "Economic Thinking",
      zh: "经济思维篇",
    },
    description: {
      en: "Thinking through incentives, costs, choices, resource allocation, and long-term returns.",
      zh: "用经济学视角理解激励、成本、选择、资源配置和长期回报。",
    },
  },
  {
    slug: "finance",
    category: {
      en: "Finance",
      zh: "金融篇",
    },
    title: {
      en: "Finance",
      zh: "金融篇",
    },
    description: {
      en: "Frameworks for markets, risk, asset logic, and financial judgment.",
      zh: "围绕市场、风险、资产逻辑和金融判断建立更清晰的分析框架。",
    },
  },
  {
    slug: "business-cases",
    category: {
      en: "Business Cases",
      zh: "商业案例篇",
    },
    title: {
      en: "Business Cases",
      zh: "商业案例篇",
    },
    description: {
      en: "Business models, strategy, products, and management judgment through real cases.",
      zh: "从公司、产品、战略和真实案例中拆解商业模式与管理判断。",
    },
  },
] as const satisfies {
  slug: string;
  category: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
}[];

export type ThoughtSeries = (typeof thoughtSeries)[number];

export function getThoughtSeriesBySlug(slug: string): ThoughtSeries | undefined {
  return thoughtSeries.find((series) => series.slug === slug);
}

export function thoughtSeriesPath(lang: Language, slug: string, page = 1): string {
  const localizedRoot = lang === "zh" ? `/zh/thoughts/series/${slug}/` : `/thoughts/series/${slug}/`;
  return page > 1 ? `${localizedRoot}page/${page}/` : localizedRoot;
}

export function thoughtSeriesHref(lang: Language, slug: string, page = 1): string {
  return withBase(thoughtSeriesPath(lang, slug, page));
}

export function thoughtSeriesCategory(series: ThoughtSeries, lang: Language): string {
  return series.category[lang];
}
