import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const language = z.literal("en");

const writingSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  displayDate: z.string().optional(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  language,
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});

// Add new approved English essays under the corresponding content directory.
const writing = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
  schema: writingSchema,
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/experience" }),
  schema: z.object({
    type: z.enum(["experience", "milestone"]).default("milestone"),
    track: z.enum(["professional", "research", "education", "credentials"]),
    date: z.string(),
    title: z.string().optional(),
    role: z.string().optional(),
    company: z.string().optional(),
    description: z.string(),
    category: z.string(),
    organization: z.string().optional(),
    context: z.string().optional(),
    tags: z.array(z.string()).default([]),
    language,
    draft: z.boolean().default(false),
    link: z.string().optional(),
    logo: z.string().optional(),
    logoAlt: z.string().optional(),
    location: z.string().optional(),
    displayLocation: z.boolean().default(false),
    showLocation: z.boolean().default(false),
    highlight: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().optional(),
    education: z.object({
      planned: z.boolean().default(false),
      degree: z.string(),
      school: z.string().optional(),
      fields: z.array(z.string()).min(1),
      recordLabel: z.string().optional(),
      recognition: z.array(z.object({
        label: z.string(),
        value: z.string(),
      })).default([]),
      awardsLabel: z.string(),
      awards: z.array(z.string()).default([]),
    }).optional(),
  }),
});

export const collections = { writing, experience };
