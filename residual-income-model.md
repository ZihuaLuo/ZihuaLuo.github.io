export type AnalyticsProvider = "" | "plausible" | "umami";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

// Update PUBLIC_SITE_URL after deployment so canonical and social URLs point at the public site.
const configuredSiteUrl =
  import.meta.env.PUBLIC_SITE_URL ||
  import.meta.env.SITE_URL ||
  "https://zihualuo.github.io";

const analyticsProvider = (
  import.meta.env.PUBLIC_ANALYTICS_PROVIDER || ""
).toLowerCase() as AnalyticsProvider;

export const siteConfig = {
  siteName: "Zihua Luo, FRM",
  englishName: "Zihua Luo, FRM",
  chineseName: "罗子华, FRM",
  romanizedName: "Zihua Luo",
  designation: "FRM",
  description:
    "Finance, research analytics, risk-aware thinking, and a bilingual archive of learning and reflection",
  chineseDescription:
    "关于金融、研究分析、风险意识、学习记录与结构化反思的双语个人网站",
  siteUrl: trimTrailingSlash(configuredSiteUrl),
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
