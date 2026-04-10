<script setup lang="ts">
import PageShell from '~/components/layout/PageShell.vue'
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

    <div class="detail-grid detail-grid--two mt-10">
      <article class="section-card surface-card">
        <p class="section-card__eyebrow">个人概览</p>
        <h2 class="section-card__title">把设计思维和前端工程化一起做扎实</h2>
        <div class="stacked-copy">
          <p
            v-for="line in siteConfig.summary"
            :key="line"
          >
            {{ line }}
          </p>
        </div>
      </article>

      <article class="section-card surface-card">
        <p class="section-card__eyebrow">核心优势</p>
        <h2 class="section-card__title">当前最能打的三块能力</h2>
        <ul class="bullet-list">
          <li
            v-for="item in siteConfig.strengths"
            :key="item"
          >
            {{ item }}
          </li>
        </ul>
      </article>
    </div>

    <section class="resume-section">
      <div class="resume-section__header">
        <p class="resume-section__eyebrow">Projects</p>
        <h2 class="resume-section__title">最近参与的核心项目</h2>
      </div>

      <div class="detail-grid detail-grid--two">
        <article
          v-for="project in siteConfig.projectExperiences"
          :key="project.name"
          class="timeline-card surface-card"
        >
          <div class="timeline-card__topline">
            <h3>{{ project.name }}</h3>
            <span>{{ project.period }}</span>
          </div>
          <p class="timeline-card__summary">{{ project.summary }}</p>
          <div class="chip-list">
            <span
              v-for="tag in project.stack"
              :key="tag"
              class="chip"
            >
              {{ tag }}
            </span>
          </div>
        </article>
      </div>
    </section>
  </PageShell>
</template>
