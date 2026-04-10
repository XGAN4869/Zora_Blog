<script setup lang="ts">
import PageShell from '~/components/layout/PageShell.vue'
import { siteConfig } from '~/shared/config/site-config'

useSeoMeta({
  title: '关于',
  description: '关于甘林涵的背景、技能与个人侧面。',
})
</script>

<template>
  <PageShell
    eyebrow="About"
    title="关于我"
    description="从工业设计走到前端开发，我更关注页面背后的体验、信息结构和真实业务价值。"
  >
    <div class="detail-grid detail-grid--two">
      <article class="section-card surface-card">
        <p class="section-card__eyebrow">自我评价</p>
        <h2 class="section-card__title">设计背景带来的视角，是我的加分项</h2>
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
        <p class="section-card__eyebrow">个人侧面</p>
        <h2 class="section-card__title">除了代码，我也在持续培养感受力</h2>
        <div class="chip-list">
          <span
            v-for="item in siteConfig.interests"
            :key="item"
            class="chip"
          >
            {{ item }}
          </span>
        </div>
        <ul class="bullet-list mt-6">
          <li>英语 CET-6，能阅读英文技术文档并完成基本沟通。</li>
          <li>熟悉 Figma、Sketch、蓝湖、PS、AI 等工具，具备 UI 设计配合能力。</li>
          <li>适应快节奏开发环境，遇到陌生需求会主动拆解并快速推进。</li>
        </ul>
      </article>
    </div>

    <section class="resume-section">
      <div class="resume-section__header">
        <p class="resume-section__eyebrow">Skills</p>
        <h2 class="resume-section__title">技能地图</h2>
      </div>

      <div class="detail-grid detail-grid--two">
        <article
          v-for="group in siteConfig.skillGroups"
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
  </PageShell>
</template>
