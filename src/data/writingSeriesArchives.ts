import { getCollection } from "astro:content";
import { essaysPerPage, writingSeries } from "@data/writingSeries";

export async function getWritingSeriesArchives() {
  const lang = "en" as const;
  const includeDrafts = !import.meta.env.PROD;
  const allWriting = await getCollection(
    "writing",
    ({ data }) => data.language === lang && (includeDrafts || !data.draft),
  );

  return writingSeries.flatMap((series) => {
    const entries = allWriting
      .filter((entry) => entry.data.category === series.category)
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

    if (entries.length === 0) {
      return [];
    }

    return [{
      entries,
      lang,
      series,
      totalCount: entries.length,
      totalPages: Math.ceil(entries.length / essaysPerPage),
    }];
  });
}
