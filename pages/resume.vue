<script setup lang="ts">
import PageShell from '~/components/layout/PageShell.vue'
import { defaultResumeVersion } from '~/shared/resume/resume-data'

const resumeVersion = defaultResumeVersion

useSeoMeta({
  title: '简历',
  description: '甘林涵的在线简历，包含工作经历、项目经验、技能与教育背景。',
})
</script>

<template>
  <PageShell
    :eyebrow="resumeVersion.eyebrow"
    :title="resumeVersion.pageTitle"
    :description="resumeVersion.pageDescription"
  >
    <section class="resume-hero surface-card">
      <div class="resume-hero__intro">
        <p class="resume-section__eyebrow">Profile</p>
        <h2 class="resume-hero__title">{{ resumeVersion.headerTitle }}</h2>
        <p class="resume-hero__subtitle">{{ resumeVersion.headerSubtitle }}</p>

        <div class="inline-pill-row">
          <a
            v-for="item in resumeVersion.contactItems"
            :key="item.label"
            :href="item.href"
            class="inline-pill"
          >
            {{ item.label }} · {{ item.value }}
          </a>
        </div>
      </div>

      <div class="hero-grid mt-6">
        <article
          v-for="item in resumeVersion.heroStats"
          :key="item.label"
          class="hero-card surface-card"
        >
          <p class="hero-card__label">{{ item.label }}</p>
          <p class="hero-card__value">{{ item.value }}</p>
        </article>
      </div>
    </section>

    <section class="resume-section">
      <div class="resume-section__header">
        <p class="resume-section__eyebrow">Overview</p>
        <h2 class="resume-section__title">基础信息</h2>
      </div>

      <div class="detail-grid detail-grid--three">
        <article
          v-for="card in resumeVersion.profileCards"
          :key="card.label"
          class="simple-card surface-card"
        >
          <p class="simple-card__eyebrow">{{ card.label }}</p>
          <h3 class="simple-card__title">{{ card.value }}</h3>
          <p
            v-if="card.detail"
            class="simple-card__body"
          >
            {{ card.detail }}
          </p>
        </article>
      </div>
    </section>

    <section class="resume-section">
      <div class="resume-section__header">
        <p class="resume-section__eyebrow">{{ resumeVersion.summary.eyebrow }}</p>
        <h2 class="resume-section__title">{{ resumeVersion.summary.title }}</h2>
      </div>

      <article class="section-card surface-card stacked-copy">
        <p
          v-for="item in resumeVersion.summary.items"
          :key="item"
        >
          {{ item }}
        </p>
      </article>
    </section>

    <section class="resume-section">
      <div class="resume-section__header">
        <p class="resume-section__eyebrow">Experience</p>
        <h2 class="resume-section__title">工作经历</h2>
      </div>

      <div class="detail-grid detail-grid--one">
        <article
          v-for="item in resumeVersion.experiences"
          :key="item.company"
          class="timeline-card surface-card"
        >
          <div class="timeline-card__topline">
            <h3>{{ item.company }}</h3>
            <span>{{ item.period }}</span>
          </div>
          <p class="timeline-card__role">{{ item.role }}</p>
          <p class="timeline-card__summary">{{ item.description }}</p>
          <ul class="bullet-list">
            <li
              v-for="point in item.highlights"
              :key="point"
            >
              {{ point }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="resume-section">
      <div class="resume-section__header">
        <p class="resume-section__eyebrow">Projects</p>
        <h2 class="resume-section__title">项目经验</h2>
      </div>

      <div class="detail-grid detail-grid--one">
        <article
          v-for="project in resumeVersion.projectExperiences"
          :key="project.name"
          class="timeline-card surface-card"
        >
          <div class="timeline-card__topline">
            <h3>{{ project.name }}</h3>
            <span>{{ project.period }}</span>
          </div>
          <div class="chip-list">
            <span
              v-for="tag in project.stack"
              :key="tag"
              class="chip"
            >
              {{ tag }}
            </span>
          </div>
          <p class="timeline-card__summary">{{ project.summary }}</p>
          <ul class="bullet-list">
            <li
              v-for="point in project.highlights"
              :key="point"
            >
              {{ point }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="resume-section">
      <div class="resume-section__header">
        <p class="resume-section__eyebrow">Skills</p>
        <h2 class="resume-section__title">专业技能</h2>
      </div>

      <div class="detail-grid detail-grid--two">
        <article
          v-for="group in resumeVersion.skillGroups"
          :key="group.title"
          class="timeline-card surface-card"
        >
          <div class="timeline-card__topline">
            <h3>{{ group.title }}</h3>
          </div>
          <div class="chip-list">
            <span
              v-for="item in group.items"
              :key="item"
              class="chip"
            >
              {{ item }}
            </span>
          </div>
        </article>
      </div>
    </section>

    <section class="resume-section">
      <div class="resume-section__header">
        <p class="resume-section__eyebrow">Education</p>
        <h2 class="resume-section__title">教育背景</h2>
      </div>

      <div class="detail-grid detail-grid--one">
        <article
          v-for="item in resumeVersion.educationList"
          :key="item.school"
          class="timeline-card surface-card"
        >
          <div class="timeline-card__topline">
            <h3>{{ item.school }}</h3>
            <span>{{ item.period }}</span>
          </div>
          <p class="timeline-card__role">{{ item.major }}</p>
          <ul class="bullet-list">
            <li
              v-for="point in item.highlights"
              :key="point"
            >
              {{ point }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="resume-section">
      <div class="resume-section__header">
        <p class="resume-section__eyebrow">{{ resumeVersion.placeholder.eyebrow }}</p>
        <h2 class="resume-section__title">{{ resumeVersion.placeholder.title }}</h2>
      </div>

      <article class="section-card surface-card resume-placeholder-card">
        <p class="simple-card__body">{{ resumeVersion.placeholder.description }}</p>
        <p
          v-if="resumeVersion.placeholder.hint"
          class="resume-placeholder-card__hint"
        >
          {{ resumeVersion.placeholder.hint }}
        </p>
      </article>
    </section>

    <section class="resume-section">
      <article class="section-card surface-card resume-quote-card">
        <p class="resume-section__eyebrow">{{ resumeVersion.quote.eyebrow }}</p>
        <h2 class="resume-section__title">{{ resumeVersion.quote.title }}</h2>
        <p class="simple-card__body">{{ resumeVersion.quote.description }}</p>
      </article>
    </section>
  </PageShell>
</template>
