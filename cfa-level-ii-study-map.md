---
import { siteInfo, ui } from "@i18n/ui";
import type { Language } from "@i18n/routes";

interface Props {
  lang: Language;
  compact?: boolean;
  includeEmail?: boolean;
  className?: string;
}

const { lang, compact = false, includeEmail = false, className = "" } = Astro.props;
const sizeClass = compact ? "h-11 w-11" : "h-12 w-12";
const iconClass = compact ? "h-4 w-4" : "h-5 w-5";
const linkClass = `${sizeClass} social-brand-link inline-flex items-center justify-center rounded-full border border-white/[0.13] bg-white/[0.08] shadow-[0_0_28px_rgba(124,58,237,0.16),inset_0_1px_0_rgba(255,255,255,0.1)] ring-1 ring-white/5 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-accent/70 hover:bg-white/[0.13] hover:shadow-lift`;
const emailEnabled = includeEmail && siteInfo.socials.email;
const instagramGradientId = `instagram-brand-gradient-${lang}-${compact ? "compact" : "regular"}`;
---

<nav class={`flex items-center gap-2 ${className}`} aria-label={ui[lang].socialLabel}>
  <a class={linkClass} href={siteInfo.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" data-track-event="Click LinkedIn">
    <svg class={iconClass} viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
      <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0ZM7.119 20.452H3.555V9h3.564v11.452ZM5.337 7.433a2.064 2.064 0 1 1 0-4.128 2.064 2.064 0 0 1 0 4.128ZM20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286Z" />
    </svg>
  </a>

  <a class={linkClass} href={siteInfo.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" data-track-event="Click Instagram">
    <svg class={iconClass} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <radialGradient id={instagramGradientId} cx="30%" cy="107%" r="150%">
          <stop offset="0%" stop-color="#FEDA75" />
          <stop offset="24%" stop-color="#FA7E1E" />
          <stop offset="48%" stop-color="#D62976" />
          <stop offset="74%" stop-color="#962FBF" />
          <stop offset="100%" stop-color="#4F5BD5" />
        </radialGradient>
      </defs>
      <path fill={`url(#${instagramGradientId})`} d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.15a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
    </svg>
  </a>

  {emailEnabled && (
    <a class={linkClass} href={siteInfo.socials.email} aria-label={lang === "zh" ? "发送邮件" : "Email"} data-track-event="Click Email">
      <svg class={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.8" y="5.5" width="16.4" height="13" rx="2.8" stroke="currentColor" stroke-width="1.7" />
        <path d="m5.2 7.6 6.8 5.1 6.8-5.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </a>
  )}
</nav>
