<script setup lang="ts">
import CommentsHost from '~/components/blog/CommentsHost.vue'
import {
  formatBlogDate,
  normalizeBlogPost,
} from '~/shared/blog/blog-utils'

const route = useRoute()

const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : value
})

const { data: post } = await useAsyncData(`blog-post-${slug.value}`, async () => {
  const article = await queryCollection('posts')
    .where('slug', '=', slug.value)
    .first()

  if (!article || article.draft) {
    throw createError({
      statusCode: 404,
      statusMessage: '文章不存在',
    })
  }

  return normalizeBlogPost(article)
})

useSeoMeta({
  title: () => post.value?.title ? `${post.value.title} | Blog` : 'Blog Detail',
  description: () => post.value?.description ?? '博客文章详情页',
})
</script>

<template>
  <section class="page-shell">
    <div class="page-shell__inner">
      <div class="blog-detail-nav">
        <NuxtLink
          to="/blog"
          class="blog-detail-back"
        >
          返回博客列表
        </NuxtLink>
      </div>

      <article
        v-if="post"
        class="blog-detail"
      >
        <p class="page-shell__eyebrow">Blog Detail</p>
        <h1 class="page-shell__title">{{ post.title }}</h1>
        <p class="page-shell__description">{{ post.description }}</p>

        <div class="blog-detail-meta surface-card">
          <span>{{ formatBlogDate(post.date) }}</span>
          <span>{{ post.readingTime }}</span>
          <span>{{ post.slug }}</span>
        </div>

        <div
          v-if="post.tags?.length"
          class="chip-list"
        >
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="chip"
          >
            {{ tag }}
          </span>
        </div>

        <div class="blog-detail-prose surface-card">
          <ContentRenderer :value="post" />
        </div>

        <CommentsHost
          :term="post.slug"
          :title="post.title"
        />
      </article>
    </div>
  </section>
</template>
