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
  englishName: "Zihua Luo",
  credentialedEnglishName: "Zihua Luo, FRM",
  description:
    "Finance, research analytics, risk-aware thinking, and an archive of learning and reflection",
  siteUrl: normalizeSiteUrl(configuredSiteUrl),
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
