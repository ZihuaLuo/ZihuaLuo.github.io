import { creditEntries, creditPageSize } from "@data/credits";

export function GET() {
  return new Response(
    JSON.stringify({
      entries: creditEntries,
      pageSize: creditPageSize,
    }),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
