<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useTheme } from '~/composables/useTheme'
import { siteConfig } from '~/shared/config/site-config'

const props = defineProps<{
  term: string
  title: string
}>()

const route = useRoute()
const { resolvedTheme } = useTheme()
const container = ref<HTMLDivElement | null>(null)

const commentsConfig = siteConfig.comments

const isConfigured = computed(() => {
  return Boolean(
    commentsConfig.repo
    && commentsConfig.repoId
    && commentsConfig.category
    && commentsConfig.categoryId,
  )
})

const canRenderGiscus = computed(() => {
  return commentsConfig.enabled && isConfigured.value
})

const themeName = computed(() => {
  return resolvedTheme.value === 'dark' ? 'dark' : 'light'
})

function renderGiscus() {
  if (import.meta.server || !container.value || !canRenderGiscus.value) {
    return
  }

  container.value.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('data-repo', commentsConfig.repo)
  script.setAttribute('data-repo-id', commentsConfig.repoId)
  script.setAttribute('data-category', commentsConfig.category)
  script.setAttribute('data-category-id', commentsConfig.categoryId)
  script.setAttribute('data-mapping', commentsConfig.mapping)
  script.setAttribute('data-term', props.term)
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', commentsConfig.reactionsEnabled)
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', commentsConfig.inputPosition)
  script.setAttribute('data-theme', themeName.value)
  script.setAttribute('data-lang', commentsConfig.lang)

  container.value.appendChild(script)
}

onMounted(async () => {
  await nextTick()
  renderGiscus()
})

watch(
  () => [route.fullPath, props.term, themeName.value],
  async () => {
    await nextTick()
    renderGiscus()
  },
)
</script>

<template>
  <section class="comments-section surface-card">
    <div class="comments-section__header">
      <p class="section-card__eyebrow">Comments</p>
      <h2 class="comments-section__title">评论区</h2>
    </div>

    <p
      v-if="!commentsConfig.enabled"
      class="comments-section__copy"
    >
      评论区能力已经预留，等你补上 Giscus 仓库配置后，这里就可以直接启用。
    </p>

    <p
      v-else-if="!isConfigured"
      class="comments-section__copy"
    >
      当前还缺少 Giscus 的仓库参数配置，请在站点配置中补齐 `repo`、`repoId`、`category` 和 `categoryId`。
    </p>

    <ClientOnly v-else>
      <div
        ref="container"
        class="comments-section__mount"
      />
    </ClientOnly>
  </section>
</template>
