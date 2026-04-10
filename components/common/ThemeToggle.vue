<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

const { resolvedTheme, toggleTheme } = useTheme()
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleTheme()"
  >
    <span v-if="resolvedTheme === 'dark'">Light</span>
    <span v-else>Dark</span>
  </button>
</template>
