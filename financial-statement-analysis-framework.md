---
import Tag from "@components/Tag.astro";
import { formatDate, readingTime, type Language } from "@i18n/routes";

interface Props {
  entry: any;
  href: string;
  lang: Language;
}

const { entry, href, lang } = Astro.props;
const minutes = readingTime(entry.body ?? "", lang);
---

<article class="premium-card group overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lift">
  <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent/70 via-violet/50 to-transparent" aria-hidden="true"></div>
  <a href={href} class="block">
    <div class="mb-5 flex flex-wrap items-center gap-2 text-sm text-[#C7D2FE]">
      <span class="rounded-full border border-gold/40 bg-gold/15 px-2.5 py-1 text-xs font-extrabold text-ink">
        {entry.data.category}
      </span>
      <time datetime={entry.data.date.toISOString()}>{formatDate(entry.data.date, lang)}</time>
      <span aria-hidden="true">/</span>
      <span>{minutes}</span>
    </div>
    <h3 class="display-heading text-2xl font-semibold leading-tight text-ink transition group-hover:text-accent">{entry.data.title}</h3>
    <p class="mt-4 text-sm leading-7 text-body">{entry.data.description}</p>
  </a>
  <div class="mt-6 flex flex-wrap gap-2">
    {entry.data.tags.map((tag: string) => <Tag label={tag} />)}
  </div>
</article>
