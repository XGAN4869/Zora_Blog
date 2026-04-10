<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description: string
}>()
</script>

<template>
  <article class="profile-panel profile-panel--center surface-card">
    <p
      v-if="eyebrow"
      class="profile-panel__eyebrow"
    >
      {{ eyebrow }}
    </p>
    <h2 class="profile-panel__title">{{ title }}</h2>
    <p class="profile-panel__copy">{{ description }}</p>
  </article>
</template>
