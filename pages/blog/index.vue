<script setup lang="ts">
import PageShell from '~/components/layout/PageShell.vue'
import { useBlogFilter } from '~/composables/useBlogFilter'
import {
  formatBlogDate,
  normalizeBlogPost,
  sortPostsByDateDesc,
} from '~/shared/blog/blog-utils'

const { data } = await useAsyncData('blog-posts', async () => {
  const posts = await queryCollection('posts')
    .all()

  return sortPostsByDateDesc(
    posts
    .filter(post => !post.draft)
    .map(post => normalizeBlogPost(post)),
  )
})

const posts = computed(() => data.value ?? [])

const {
  selectedTag,
  availableTags,
  filteredPosts,
  hasPosts,
  hasFilteredPosts,
  setTag,
  clearTag,
} = useBlogFilter(posts)

useSeoMeta({
  title: 'Blog',
  description: '查看博客文章、标签筛选与文章摘要。',
})
</script>

<template>
  <PageShell
    eyebrow="Blog"
    title="博客文章"
    description="这里会集中展示文章摘要、发布时间、阅读时长与标签筛选，方便你快速浏览内容。"
  >
    <section class="blog-filter-panel surface-card">
      <div class="blog-filter-panel__header">
        <div>
          <p class="section-card__eyebrow">Tags</p>
          <h2 class="blog-filter-panel__title">按标签筛选文章</h2>
        </div>

        <button
          v-if="selectedTag"
          type="button"
          class="filter-clear-button"
          @click="clearTag"
        >
          清空筛选
        </button>
      </div>

      <div
        v-if="availableTags.length"
        class="filter-chip-row"
      >
        <button
          type="button"
          class="filter-chip"
          :class="{ 'is-active': !selectedTag }"
          @click="clearTag"
        >
          全部
        </button>
        <button
          v-for="tag in availableTags"
          :key="tag"
          type="button"
          class="filter-chip"
          :class="{ 'is-active': selectedTag === tag }"
          @click="setTag(tag)"
        >
          {{ tag }}
        </button>
      </div>
      <p
        v-else
        class="blog-empty-copy"
      >
        还没有可用于筛选的标签，等文章内容接入后这里会自动展示。
      </p>
    </section>

    <section
      v-if="hasPosts && hasFilteredPosts"
      class="blog-post-list"
    >
      <article
        v-for="post in filteredPosts"
        :key="post.slug"
        class="blog-post-card surface-card"
      >
        <div class="blog-post-card__meta">
          <span>{{ formatBlogDate(post.date) }}</span>
          <span>{{ post.readingTime }}</span>
        </div>

        <NuxtLink
          :to="post.path"
          class="blog-post-card__link"
        >
          <h2 class="blog-post-card__title">
            {{ post.title }}
          </h2>
        </NuxtLink>

        <p class="blog-post-card__description">
          {{ post.description }}
        </p>

        <div class="chip-list">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="chip"
          >
            {{ tag }}
          </span>
        </div>
      </article>
    </section>

    <article
      v-else-if="hasPosts"
      class="blog-empty-state surface-card"
    >
      <p class="section-card__eyebrow">Empty State</p>
      <h2 class="section-card__title">当前标签下还没有文章</h2>
      <p class="blog-empty-copy">
        可以先清空筛选，或者继续补充更多文章内容文件。
      </p>
    </article>

    <article
      v-else
      class="blog-empty-state surface-card"
    >
      <p class="section-card__eyebrow">Empty State</p>
      <h2 class="section-card__title">博客内容目录目前还是空的</h2>
      <p class="blog-empty-copy">
        当 `content/posts` 中放入文章文件后，这里会自动渲染文章列表。
      </p>
    </article>
  </PageShell>
</template>
