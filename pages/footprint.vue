<script setup lang="ts">
import PageShell from '~/components/layout/PageShell.vue'

useSeoMeta({
  title: 'Footprint',
  description: 'Placeholder route for future map and footprint features.',
})
</script>

<template>
  <PageShell
    eyebrow="Footprint"
    title="Footprint"
    description="This route is reserved for future map, travel and expansion experiments."
  >
    <article class="simple-card surface-card">
      <p class="simple-card__eyebrow">
        Coming next
      </p>
      <h2 class="simple-card__title">
        Map and location modules
      </h2>
      <p class="simple-card__body">
        We can later attach a map view, journey timeline or interactive travel cards here.
      </p>
    </article>
  </PageShell>
</template>
