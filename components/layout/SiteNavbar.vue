<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ThemeToggle from '~/components/common/ThemeToggle.vue'
import { siteConfig } from '~/shared/config/site-config'

const route = useRoute()
const mobileOpen = ref(false)
const navItems = computed(() => siteConfig.navItems)
const quickLinks = computed(() => [
  { label: '查看博客', to: '/blog', primary: true },
  { label: '查看简历', to: '/resume', primary: false },
])

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

function closeMenu() {
  mobileOpen.value = false
}
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

      <div class="site-header__quick-actions">
        <NuxtLink
          v-for="item in quickLinks"
          :key="item.to"
          :to="item.to"
          class="site-header__cta"
          :class="{ 'site-header__cta--primary': item.primary }"
        >
          {{ item.label }}
        </NuxtLink>
      </div>

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
      v-if="mobileOpen"
      class="site-header__backdrop"
      @click="closeMenu"
    />

    <aside
      id="mobile-nav"
      class="site-header__drawer"
      :class="{ 'is-open': mobileOpen }"
      aria-label="Side navigation"
    >
      <div class="site-header__drawer-head">
        <div>
          <p class="site-header__drawer-eyebrow">Quick Access</p>
          <h2 class="site-header__drawer-title">{{ siteConfig.profile.englishName }}</h2>
        </div>

        <button
          type="button"
          class="site-header__drawer-close"
          @click="closeMenu"
        >
          Close
        </button>
      </div>

      <div class="site-header__drawer-actions">
        <NuxtLink
          v-for="item in quickLinks"
          :key="item.to"
          :to="item.to"
          class="site-header__drawer-cta"
          :class="{ 'site-header__drawer-cta--primary': item.primary }"
        >
          {{ item.label }}
        </NuxtLink>
      </div>

      <div class="site-header__mobile-panel">
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
    </aside>
  </header>
</template>
