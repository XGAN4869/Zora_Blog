<script setup lang="ts">
import PageShell from '~/components/layout/PageShell.vue'
import GithubActivityPanel from '~/components/profile/GithubActivityPanel.vue'
import VantaBackground from '~/components/common/VantaBackground.vue'
import { siteConfig } from '~/shared/config/site-config'

useSeoMeta({
  title: '首页',
  description: siteConfig.siteDescription,
})
</script>

<template>
  <VantaBackground />
  <PageShell
    eyebrow="Personal Homepage"
    :title="siteConfig.siteTitle"
    :description="siteConfig.profile.subtitle"
    center
  >
    <div class="hero-grid">
      <article
        v-for="item in siteConfig.heroStats"
        :key="item.label"
        class="hero-card surface-card"
      >
        <p class="hero-card__label">{{ item.label }}</p>
        <p class="hero-card__value">{{ item.value }}</p>
      </article>
    </div>

    <div class="inline-pill-row">
      <span class="inline-pill">{{ siteConfig.profile.title }}</span>
      <span class="inline-pill">{{ siteConfig.profile.education }}</span>
      <span class="inline-pill">{{ siteConfig.profile.intention }}</span>
    </div>

    <div class="hero-action-row">
      <NuxtLink
        to="/blog"
        class="hero-action-button hero-action-button--primary"
      >
        查看博客
      </NuxtLink>
      <NuxtLink
        to="/resume"
        class="hero-action-button"
      >
        查看简历
      </NuxtLink>
    </div>

    <p class="home-motto">{{ siteConfig.motto }}</p>

    <section class="resume-section">
      <GithubActivityPanel />
    </section>
  </PageShell>
</template>
