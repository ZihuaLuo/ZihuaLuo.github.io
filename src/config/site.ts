export type AnalyticsProvider = "" | "plausible" | "umami";

function normalizeAnalyticsProvider(value: string | undefined): AnalyticsProvider {
  const provider = value?.trim().toLowerCase();
  return provider === "plausible" || provider === "umami" ? provider : "";
}

const analyticsProvider = normalizeAnalyticsProvider(import.meta.env.PUBLIC_ANALYTICS_PROVIDER);

export const siteConfig = {
  englishName: "Zihua Luo",
  credentialedEnglishName: "Zihua Luo, FRM",
  description:
    "Finance, research analytics, risk-aware thinking, and an archive of learning and reflection",
  profilePhoto: "/images/zihua-profile.jpg",
  ogImages: {
    en: "/og-image.png",
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
