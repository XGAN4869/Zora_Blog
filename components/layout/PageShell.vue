<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    description?: string
    showBackButton?: boolean
    center?: boolean
  }>(),
  {
    eyebrow: '',
    description: '',
    showBackButton: false,
    center: false,
  },
)
</script>

<template>
  <section
    class="page-shell"
    :class="{ 'page-shell--center': center }"
  >
    <div class="page-shell__inner">
      <NuxtLink
        v-if="showBackButton"
        to="/"
        class="page-shell__back"
      >
        ← 返回首页
      </NuxtLink>
      <p
        v-if="eyebrow"
        class="page-shell__eyebrow"
      >
        {{ eyebrow }}
      </p>
      <h1 class="page-shell__title">
        {{ title }}
      </h1>
      <p
        v-if="description"
        class="page-shell__description"
      >
        {{ description }}
      </p>
      <div class="page-shell__content">
        <slot />
      </div>
    </div>
  </section>
</template>
