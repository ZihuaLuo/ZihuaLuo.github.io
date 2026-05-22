---
import { siteConfig } from "@config/site";
import { withBase, type Language } from "@i18n/routes";

interface Props {
  lang: Language;
  sharePath?: string;
}

const { lang, sharePath = lang === "zh" ? "/zh/" : "/" } = Astro.props;
const normalizedPath = sharePath.startsWith("http") ? sharePath : withBase(sharePath);
const publicUrl = sharePath.startsWith("http")
  ? sharePath
  : new URL(normalizedPath, siteConfig.siteUrl).toString();
const shareUrl = import.meta.env.PROD ? publicUrl : "";
const displayUrl = publicUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

const copy = {
  en: {
    title: "Share profile",
    close: "Close share card",
    name: siteConfig.englishName,
    tagline: "Finance, Research & Analytics, Risk-Aware Thinking",
    brandLine: "A bilingual archive of finance learning, structured reflection, and professional growth",
    share: "Share",
    copy: "Copy link",
    copied: "Link copied",
    linkedin: "LinkedIn",
    instagram: "Instagram",
    aria: "Share Zihua Luo profile",
  },
  zh: {
    title: "分享个人主页",
    close: "关闭分享卡片",
    name: siteConfig.chineseName,
    tagline: "金融、研究分析与风险意识驱动的思考方式",
    brandLine: "一个关于金融学习、结构化反思与职业成长的双语个人档案",
    share: "分享",
    copy: "复制链接",
    copied: "链接已复制",
    linkedin: "LinkedIn",
    instagram: "Instagram",
    aria: "分享罗子华个人主页",
  },
}[lang];

const serializedShare = JSON.stringify({
  title: copy.name,
  text: copy.tagline,
  url: shareUrl,
  fallbackUrl: publicUrl,
  localFallback: "",
});
---

<div
  class="share-modal"
  data-share-modal
  data-share={serializedShare}
  hidden
>
  <button class="share-modal__backdrop" type="button" aria-label={copy.close} data-share-close></button>
  <section class="share-modal__panel" role="dialog" aria-modal="true" aria-label={copy.aria}>
    <div class="share-card">
      <div class="share-card__orbit" aria-hidden="true">
        <svg viewBox="0 0 680 430" preserveAspectRatio="none">
          <path d="M-34 332C112 158 288 74 494 84c126 6 234 44 320 112" />
          <path d="M64 300C210 220 372 196 548 228c72 13 137 35 194 66" />
        </svg>
      </div>
      <div class="share-card__top">
        <div class="share-card__mark" aria-hidden="true">
          <span>{lang === "zh" ? "罗" : "ZL"}</span>
        </div>
        <button class="share-card__close" type="button" aria-label={copy.close} data-share-close>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
        </button>
      </div>

      <div class="share-card__body">
        <p class="eyebrow">{copy.title}</p>
        <h2 class="display-heading">{copy.name}</h2>
        <p class="share-card__tagline">{copy.tagline}</p>
        <p class="share-card__line">{copy.brandLine}</p>
      </div>

      <div class="share-card__url">
        <span>{displayUrl}</span>
      </div>

      <div class="share-card__footer">
        <div class="share-card__socials" aria-label={lang === "zh" ? "社交链接" : "Social links"}>
          <a href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" data-track-event="Click LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
            </svg>
          </a>
          <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" data-track-event="Click Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.15a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
            </svg>
          </a>
        </div>
        <div class="share-card__actions">
          <button class="share-card__button share-card__button--ghost" type="button" data-share-copy>
            {copy.copy}
          </button>
          <button class="share-card__button share-card__button--primary" type="button" data-share-native>
            {copy.share}
          </button>
        </div>
      </div>

      <p class="share-card__status" aria-live="polite" data-share-status>{copy.copied}</p>
    </div>
  </section>
</div>

<style>
  .share-modal[hidden] {
    display: none;
  }

  .share-modal {
    align-items: center;
    display: flex;
    inset: 0;
    justify-content: center;
    padding: 1rem;
    position: fixed;
    z-index: 90;
  }

  .share-modal__backdrop {
    background:
      radial-gradient(ellipse at 50% 46%, rgba(var(--rgb-warm), 0.1), transparent 26rem),
      radial-gradient(ellipse at 50% 22%, rgba(var(--rgb-blue-soft), 0.18), transparent 34rem),
      radial-gradient(ellipse at 82% 14%, rgba(var(--rgb-cyan-soft), 0.13), transparent 30rem),
      var(--bg-header);
    border: 0;
    inset: 0;
    position: fixed;
    backdrop-filter: blur(20px);
  }

  .share-modal__panel {
    position: relative;
    width: min(680px, 100%);
  }

  .share-card {
    background: var(--background-card);
    border: 1px solid var(--border-cyan);
    border-radius: 28px;
    box-shadow:
      0 34px 110px rgba(var(--rgb-bg-base), 0.54),
      0 0 90px var(--glow-soft),
      0 0 58px rgba(var(--rgb-violet), 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
    color: var(--ink);
    isolation: isolate;
    overflow: hidden;
    padding: 1.25rem;
    position: relative;
  }

  .share-card::before {
    background:
      linear-gradient(180deg, transparent 0 48%, rgba(var(--rgb-gold), 0.08) 48.4%, transparent 60%),
      radial-gradient(circle at center, rgba(226, 232, 240, 0.12) 0 1px, transparent 1.7px),
      linear-gradient(90deg, rgba(148, 163, 184, 0.04) 1px, transparent 1px);
    background-size: auto, 46px 46px, 96px 96px;
    content: "";
    inset: 0;
    opacity: 0.22;
    pointer-events: none;
    position: absolute;
    z-index: -1;
  }

  .share-card__orbit {
    inset: 0;
    opacity: 0.52;
    pointer-events: none;
    position: absolute;
    z-index: -1;
  }

  .share-card__orbit svg {
    height: 100%;
    width: 100%;
  }

  .share-card__orbit path {
    fill: none;
    stroke: rgba(191, 219, 254, 0.3);
    stroke-width: 1.5;
    vector-effect: non-scaling-stroke;
  }

  .share-card__orbit path + path {
    stroke: rgba(var(--rgb-gold), 0.18);
    stroke-dasharray: 16 22;
  }

  .share-card__top,
  .share-card__footer,
  .share-card__actions,
  .share-card__socials {
    align-items: center;
    display: flex;
  }

  .share-card__top,
  .share-card__footer {
    justify-content: space-between;
    gap: 1rem;
  }

  .share-card__mark {
    background:
      radial-gradient(circle at 34% 24%, rgba(var(--rgb-gold), 0.14), transparent 42%),
      radial-gradient(circle at 70% 18%, rgba(var(--rgb-cyan-soft), 0.14), transparent 46%),
      linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.045)),
      var(--bg-modal);
    border: 1px solid var(--border-glow);
    border-radius: 22px;
    box-shadow: 0 0 34px var(--glow-soft), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    display: grid;
    height: 4.8rem;
    place-items: center;
    width: 4.8rem;
  }

  .share-card__mark span {
    color: var(--text-primary);
    font-size: 1.65rem;
    font-weight: 900;
  }

  .share-card__close,
  .share-card__socials a {
    align-items: center;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 999px;
    color: var(--text-primary);
    display: inline-flex;
    height: 2.65rem;
    justify-content: center;
    transition: border-color 180ms ease, background 180ms ease, color 180ms ease, transform 180ms ease;
    width: 2.65rem;
  }

  .share-card__close:hover,
  .share-card__socials a:hover {
    background: rgba(255, 255, 255, 0.13);
    border-color: var(--border-cyan);
    color: var(--accent);
    transform: translateY(-1px);
  }

  .share-card__close svg,
  .share-card__socials svg {
    height: 1.15rem;
    width: 1.15rem;
  }

  .share-card__body {
    margin-top: 2rem;
    max-width: 38rem;
  }

  .share-card__body h2 {
    background: linear-gradient(135deg, #ffffff 0%, #dbeafe 54%, #c4b5fd 100%);
    background-clip: text;
    color: transparent;
    font-size: clamp(2.5rem, 8vw, 4.6rem);
    font-weight: 650;
    line-height: 0.98;
    margin: 0.45rem 0 0;
  }

  .share-card__tagline {
    color: #f8fafc;
    font-size: clamp(1.05rem, 3vw, 1.45rem);
    font-weight: 800;
    line-height: 1.45;
    margin: 1.2rem 0 0;
  }

  .share-card__line {
    color: var(--text-body);
    font-size: 0.98rem;
    line-height: 1.75;
    margin: 0.9rem 0 0;
    max-width: 35rem;
  }

  .share-card__url {
    border: 1px solid var(--border-glow);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.07);
    color: var(--muted);
    font-size: 0.86rem;
    font-weight: 800;
    margin-top: 1.55rem;
    overflow-wrap: anywhere;
    padding: 0.8rem 0.9rem;
  }

  .share-card__footer {
    border-top: 1px solid rgba(255, 255, 255, 0.11);
    margin-top: 1.2rem;
    padding-top: 1.2rem;
  }

  .share-card__socials,
  .share-card__actions {
    gap: 0.55rem;
  }

  .share-card__button {
    border-radius: 999px;
    border: 1px solid var(--border-cyan);
    min-height: 2.75rem;
    padding: 0 1rem;
    font-size: 0.86rem;
    font-weight: 900;
    transition: border-color 180ms ease, background 180ms ease, transform 180ms ease, box-shadow 180ms ease;
  }

  .share-card__button--ghost {
    background: rgba(255, 255, 255, 0.07);
    color: var(--ink);
  }

  .share-card__button--primary {
    background: linear-gradient(135deg, #d8c38a, #bfdbfe 48%, #7dd3fc);
    color: var(--bg-base);
    box-shadow: 0 0 28px rgba(var(--rgb-cyan-soft), 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.42);
  }

  .share-card__button:hover {
    border-color: var(--border-cyan);
    transform: translateY(-1px);
  }

  .share-card__status {
    color: var(--accent);
    font-size: 0.82rem;
    font-weight: 900;
    margin: 0.9rem 0 0;
    min-height: 1.2rem;
    opacity: 0;
    transition: opacity 180ms ease;
  }

  .share-card__status.is-visible {
    opacity: 1;
  }

  @media (max-width: 640px) {
    .share-modal {
      align-items: flex-end;
      padding: 0.75rem;
    }

    .share-card {
      border-radius: 24px;
      max-height: calc(100vh - 1.5rem);
      overflow-y: auto;
      padding: 1rem;
    }

    .share-card__mark {
      height: 4rem;
      width: 4rem;
    }

    .share-card__body {
      margin-top: 1.35rem;
    }

    .share-card__footer {
      align-items: stretch;
      flex-direction: column;
    }

    .share-card__actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
    }
  }
</style>

<script is:inline>
  (() => {
    const modal = document.querySelector("[data-share-modal]");
    if (!modal || modal.dataset.ready === "true") return;

    modal.dataset.ready = "true";

    const data = JSON.parse(modal.dataset.share || "{}");
    const openButtons = document.querySelectorAll("[data-share-open]");
    const closeButtons = modal.querySelectorAll("[data-share-close]");
    const nativeButton = modal.querySelector("[data-share-native]");
    const copyButton = modal.querySelector("[data-share-copy]");
    const status = modal.querySelector("[data-share-status]");
    let previousFocus;
    let previousOverflow = "";

    const track = (eventName, props = {}) => {
      if (typeof window.trackSiteEvent === "function") {
        window.trackSiteEvent(eventName, props);
      }
    };

    const getShareUrl = () => data.url || window.location.href || data.fallbackUrl;

    const showCopied = () => {
      status.classList.add("is-visible");
      window.setTimeout(() => status.classList.remove("is-visible"), 2200);
    };

    const copyLink = async () => {
      const url = getShareUrl();
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(url);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = url;
          textArea.setAttribute("readonly", "");
          textArea.style.position = "fixed";
          textArea.style.opacity = "0";
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          textArea.remove();
        }
        showCopied();
        track("Copy Share Link", { language: document.documentElement.lang });
      } catch (_) {
        showCopied();
      }
    };

    const openShare = () => {
      previousFocus = document.activeElement;
      previousOverflow = document.body.style.overflow;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      status.classList.remove("is-visible");
      track("Open Share Card", { language: document.documentElement.lang });
      window.requestAnimationFrame(() => {
        nativeButton?.focus();
      });
    };

    const closeShare = () => {
      modal.hidden = true;
      document.body.style.overflow = previousOverflow;
      if (previousFocus && typeof previousFocus.focus === "function") {
        previousFocus.focus();
      }
    };

    openButtons.forEach((button) => {
      button.addEventListener("click", openShare);
    });

    closeButtons.forEach((button) => {
      button.addEventListener("click", closeShare);
    });

    copyButton?.addEventListener("click", copyLink);

    nativeButton?.addEventListener("click", async () => {
      const url = getShareUrl();
      const payload = {
        title: data.title,
        text: data.text,
        url,
      };

      track("Click Native Share", { language: document.documentElement.lang });

      if (navigator.share) {
        try {
          await navigator.share(payload);
          return;
        } catch (_) {
          return;
        }
      }

      await copyLink();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !modal.hidden) {
        closeShare();
      }
    });
  })();
</script>
