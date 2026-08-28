import type { Language } from "./routes";
import { siteConfig } from "@config/site";

export const siteInfo = {
  englishName: siteConfig.englishName,
  credentialedEnglishName: siteConfig.credentialedEnglishName,
  profilePhoto: siteConfig.profilePhoto,
  ogImage: siteConfig.ogImages.en,
  emailAddress: siteConfig.email,
  socials: {
    linkedin: siteConfig.linkedinUrl,
    instagram: siteConfig.instagramUrl,
    email: `mailto:${siteConfig.email}`,
  },
};

export const ui: Record<
  Language,
  {
    skip: string;
    socialLabel: string;
    search: string;
    backToWriting: string;
  }
> = {
  en: {
    skip: "Skip to content",
    socialLabel: "Social links",
    search: "Search",
    backToWriting: "Back to Writing",
  },
};
