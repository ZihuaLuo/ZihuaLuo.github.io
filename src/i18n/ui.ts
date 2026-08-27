import type { Language } from "./routes";
import { siteConfig } from "@config/site";

export const siteInfo = {
  name: siteConfig.siteName,
  englishName: siteConfig.englishName,
  credentialedEnglishName: siteConfig.credentialedEnglishName,
  romanizedName: siteConfig.romanizedName,
  profilePhoto: siteConfig.profilePhoto,
  ogImage: siteConfig.ogImages.en,
  emailAddress: siteConfig.email,
  socials: {
    linkedin: siteConfig.linkedinUrl,
    instagram: siteConfig.instagramUrl,
    email: `mailto:${siteConfig.email}`,
  },
};

export const personalSignature = {
  en: "Man Proposes, God Disposes",
} as const satisfies Record<Language, string>;

export const ui: Record<
  Language,
  {
    skip: string;
    footerNote: string;
    socialLabel: string;
    search: string;
    backToWriting: string;
  }
> = {
  en: {
    skip: "Skip to content",
    footerNote: personalSignature.en,
    socialLabel: "Social links",
    search: "Search",
    backToWriting: "Back to Writing",
  },
};
