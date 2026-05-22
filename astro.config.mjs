---
import BaseLayout from "@layouts/BaseLayout.astro";
import PageHeader from "@components/PageHeader.astro";
import NowDashboard from "@components/NowDashboard.astro";
import { siteInfo } from "@i18n/ui";
---

<BaseLayout
  title={`Now | ${siteInfo.englishName}`}
  description="What Zihua Luo, FRM is currently learning, building, writing, thinking about, and focusing on"
  lang="en"
  alternateHref="/zh/now/"
  canonicalPath="/now/"
>
  <section class="finance-shell py-14 sm:py-20">
    <div class="container-page relative z-10">
      <PageHeader
        eyebrow="Now"
        title="Now Dashboard"
        description="A snapshot of what I am learning, building, writing, and paying attention to"
        tone="dark"
      />
    </div>
  </section>

  <section class="surface-section now-section py-18 sm:py-24">
    <div class="container-page">
      <NowDashboard lang="en" showHeader={false} />
    </div>
  </section>
</BaseLayout>
