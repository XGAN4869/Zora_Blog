<script setup lang="ts">
import type { ResumeVersion } from '~/shared/types/resume'

defineProps<{
  versions: ResumeVersion[]
  activeId: string
}>()

const emit = defineEmits<{
  'update:activeId': [value: string]
}>()

function selectVersion(id: string) {
  emit('update:activeId', id)
}
</script>

<template>
  <aside class="resume-version-panel surface-card">
    <div class="resume-version-panel__header">
      <p class="resume-section__eyebrow">Versions</p>
      <h2 class="resume-section__title">简历版本</h2>
      <p class="simple-card__body">
        切换不同阶段的简历版本，查看当前版和历史版的内容重心变化。
      </p>
    </div>

    <div class="resume-version-list">
      <button
        v-for="version in versions"
        :key="version.id"
        type="button"
        class="resume-version-item"
        :class="{ 'is-active': version.id === activeId }"
        @click="selectVersion(version.id)"
      >
        <span class="resume-version-item__period">{{ version.period }}</span>
        <strong class="resume-version-item__label">{{ version.label }}</strong>
        <span class="resume-version-item__hint">{{ version.switcherHint }}</span>
      </button>
    </div>
  </aside>
</template>
