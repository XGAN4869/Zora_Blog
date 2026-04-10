<script setup lang="ts">
import PageShell from '~/components/layout/PageShell.vue'
import GithubActivityPanel from '~/components/profile/GithubActivityPanel.vue'
import { siteConfig } from '~/shared/config/site-config'

useSeoMeta({
  title: '首页',
  description: siteConfig.siteDescription,
})
</script>

<template>
  <PageShell
    eyebrow="Personal Homepage"
    :title="siteConfig.siteTitle"
    :description="siteConfig.profile.subtitle"
    center
  >
    <div class="inline-pill-row">
      <span class="inline-pill">{{ siteConfig.profile.title }}</span>
      <span class="inline-pill">{{ siteConfig.profile.education }}</span>
      <span class="inline-pill">{{ siteConfig.profile.intention }}</span>
    </div>

    <p class="home-motto">{{ siteConfig.motto }}</p>

    <section class="resume-section">
      <GithubActivityPanel />
    </section>
  </PageShell>
</template>
