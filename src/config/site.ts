export type AnalyticsProvider = "" | "plausible" | "umami";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");
const fallbackSiteUrl = "http://127.0.0.1:4321";

function normalizeSiteUrl(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) {
    return fallbackSiteUrl;
  }

  const withoutTrailingSlash = trimTrailingSlash(trimmed);
  return withoutTrailingSlash || fallbackSiteUrl;
}

function normalizeAnalyticsProvider(value: string | undefined): AnalyticsProvider {
  const provider = value?.trim().toLowerCase();
  return provider === "plausible" || provider === "umami" ? provider : "";
}

// Set PUBLIC_SITE_URL only when the site is ready for public deployment.
const configuredSiteUrl =
  import.meta.env.PUBLIC_SITE_URL ||
  import.meta.env.SITE_URL ||
  fallbackSiteUrl;

const analyticsProvider = normalizeAnalyticsProvider(import.meta.env.PUBLIC_ANALYTICS_PROVIDER);

export const siteConfig = {
  siteName: "Zihua Luo, FRM",
  englishName: "Zihua Luo, FRM",
  chineseName: "罗子华，FRM",
  romanizedName: "Zihua Luo",
  designation: "FRM",
  description:
    "Finance, research analytics, risk-aware thinking, and a bilingual archive of learning and reflection",
  chineseDescription:
    "关于金融、研究分析、风险意识、学习记录与结构化反思的双语个人网站",
  siteUrl: normalizeSiteUrl(configuredSiteUrl),
  defaultLanguage: "en",
  profilePhoto: "/images/zihua-profile.jpg",
  ogImages: {
    en: "/og-image.png",
    zh: "/og-image-zh.png",
  },
  email: "zihualuo58@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/zihualuo/",
  instagramUrl: "https://www.instagram.com/luozzihua/",
  analytics: {
    provider: analyticsProvider,
    plausibleDomain: import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN || "",
    umamiWebsiteId: import.meta.env.PUBLIC_UMAMI_WEBSITE_ID || "",
    umamiScriptUrl:
      import.meta.env.PUBLIC_UMAMI_SCRIPT_URL || "https://cloud.umami.is/script.js",
  },
} as const;
