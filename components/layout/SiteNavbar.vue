<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ThemeToggle from '~/components/common/ThemeToggle.vue'
import { siteConfig } from '~/shared/config/site-config'

const route = useRoute()
const mobileOpen = ref(false)
const navItems = computed(() => siteConfig.navItems)

function isActive(path: string) {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path === path || route.path.startsWith(`${path}/`)
}

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
  },
)
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <NuxtLink
        to="/"
        class="site-header__brand"
      >
        <span class="site-header__brand-mark" />
        <span>{{ siteConfig.profile.englishName }}</span>
      </NuxtLink>

      <nav
        class="site-header__nav"
        aria-label="Primary navigation"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="site-header__link"
          :class="{ 'is-active': isActive(item.to) }"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="site-header__actions">
        <ClientOnly>
          <ThemeToggle />
        </ClientOnly>

        <button
          type="button"
          class="site-header__menu-button"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav"
          @click="mobileOpen = !mobileOpen"
        >
          Menu
        </button>
      </div>
    </div>

    <div
      id="mobile-nav"
      class="site-header__mobile-panel"
      :class="{ 'is-open': mobileOpen }"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="site-header__mobile-link"
        :class="{ 'is-active': isActive(item.to) }"
      >
        {{ item.label }}
      </NuxtLink>
    </div>
  </header>
</template>
