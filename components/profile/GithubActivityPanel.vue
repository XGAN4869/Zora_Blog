<script setup lang="ts">
import { siteConfig } from '~/shared/config/site-config'
import { useTheme } from '~/composables/useTheme'

const githubActivity = siteConfig.githubActivity
const { resolvedTheme } = useTheme()

const githubUsername = computed(() => githubActivity.username?.trim() ?? '')

const activityGraphUrl = computed(() => {
  if (!githubUsername.value) {
    return ''
  }

  const isDark = resolvedTheme.value === 'dark'
  const bgColor = isDark ? '0f172a' : 'eff6ff'
  const textColor = isDark ? 'e5eefb' : '1e3a5f'
  const lineColor = isDark ? '60a5fa' : '3b82f6'
  const pointColor = isDark ? '93c5fd' : '60a5fa'
  const areaColor = isDark ? '1d4ed8' : 'bfdbfe'

  return `https://github-readme-activity-graph.vercel.app/graph?username=${encodeURIComponent(githubUsername.value)}&bg_color=${bgColor}&color=${textColor}&line=${lineColor}&point=${pointColor}&area=true&area_color=${areaColor}&hide_border=true`
})
</script>

<template>
  <article class="profile-panel surface-card">
    <p class="profile-panel__eyebrow">GitHub</p>
    <h2 class="profile-panel__title">{{ githubActivity.title }}</h2>
    <p class="profile-panel__copy">{{ githubActivity.description }}</p>
    <p
      v-if="githubActivity.username"
      class="profile-panel__hint"
    >
      @{{ githubActivity.username }}
    </p>

    <div class="chip-list">
      <span
        v-for="item in githubActivity.focusAreas"
        :key="item"
        class="chip"
      >
        {{ item }}
      </span>
    </div>

    <ClientOnly v-if="githubUsername">
      <figure class="github-card-frame">
        <img
          :src="activityGraphUrl"
          :alt="`${githubUsername} 的 GitHub 周活跃度图`"
          class="github-card-image"
          loading="lazy"
          decoding="async"
          referrerpolicy="no-referrer"
        >
      </figure>

      <template #fallback>
        <p class="profile-panel__hint">
          GitHub 周活跃度图会在客户端进入可视区域后再加载。
        </p>
      </template>
    </ClientOnly>

    <a
      v-if="githubActivity.profileUrl"
      :href="githubActivity.profileUrl"
      target="_blank"
      rel="noreferrer"
      class="profile-panel__link"
    >
      查看 GitHub 主页
    </a>
    <p
      v-else
      class="profile-panel__hint"
    >
      GitHub 主页链接暂未配置，后续补上后这里会自动切换为真实入口。
    </p>
  </article>
</template>
