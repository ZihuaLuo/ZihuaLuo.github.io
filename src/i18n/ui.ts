import type { Language } from "./routes";
import { siteConfig } from "@config/site";

export const siteInfo = {
  name: siteConfig.siteName,
  englishName: siteConfig.englishName,
  romanizedName: siteConfig.romanizedName,
  chineseName: siteConfig.chineseName,
  zhDisplayName: siteConfig.chineseName,
  profilePhoto: siteConfig.profilePhoto,
  ogImage: siteConfig.ogImages.en,
  ogImageZh: siteConfig.ogImages.zh,
  emailAddress: siteConfig.email,
  socials: {
    linkedin: siteConfig.linkedinUrl,
    instagram: siteConfig.instagramUrl,
    email: `mailto:${siteConfig.email}`,
  },
};

export const personalSignature = {
  en: "Man Proposes, God Disposes",
  zh: "谋事在人，成事在天",
} as const satisfies Record<Language, string>;

export const ui: Record<
  Language,
  {
    skip: string;
    languageLabel: string;
    switchTo: string;
    footerNote: string;
    socialLabel: string;
    search: string;
    readMore: string;
    backToThoughts: string;
    backToNotes: string;
    latestThoughts: string;
    allTags: string;
  }
> = {
  en: {
    skip: "Skip to content",
    languageLabel: "Change language",
    switchTo: "中文",
    footerNote: personalSignature.en,
    socialLabel: "Social links",
    search: "Search",
    readMore: "Read more",
    backToThoughts: "Back to Thinking",
    backToNotes: "Back to Notes",
    latestThoughts: "Latest Thinking",
    allTags: "Tags",
  },
  zh: {
    skip: "跳转到正文",
    languageLabel: "切换语言",
    switchTo: "English",
    footerNote: personalSignature.zh,
    socialLabel: "社交链接",
    search: "搜索",
    readMore: "继续阅读",
    backToThoughts: "返回思考",
    backToNotes: "返回笔记",
    latestThoughts: "最新思考",
    allTags: "标签",
  },
};
