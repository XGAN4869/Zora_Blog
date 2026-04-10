<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    description?: string
  }>(),
  {
    eyebrow: '',
    description: '',
  },
)
</script>

<template>
  <section class="page-shell">
    <div class="page-shell__inner">
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
