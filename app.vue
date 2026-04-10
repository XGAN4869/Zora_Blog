<script setup lang="ts">
import { siteConfig } from '~/shared/config/site-config'

useHead({
  htmlAttrs: {
    lang: 'zh-CN',
  },
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${siteConfig.siteName}` : siteConfig.siteTitle
  },
  meta: [
    {
      name: 'description',
      content: siteConfig.siteDescription,
    },
    {
      property: 'og:title',
      content: siteConfig.siteTitle,
    },
    {
      property: 'og:description',
      content: siteConfig.siteDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: siteConfig.siteUrl,
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
