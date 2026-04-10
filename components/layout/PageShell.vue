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

const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div class="page-layout">
    <header class="nav-bar">
      <NuxtLink
        to="/blog"
        class="nav-bar__link"
      >
        查看博客
      </NuxtLink>
      <NuxtLink
        to="/resume"
        class="nav-bar__link"
      >
        查看简历
      </NuxtLink>
      <button
        class="nav-bar__hamburger"
        @click="toggleMobileMenu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
          />
          <line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
          />
          <line
            x1="3"
            y1="18"
            x2="21"
            y2="18"
          />
        </svg>
      </button>
    </header>

    <Teleport to="body">
      <Transition name="sidebar">
        <div
          v-if="isMobileMenuOpen"
          class="mobile-sidebar-overlay"
          @click="closeMobileMenu"
        >
          <aside
            class="mobile-sidebar"
            @click.stop
          >
            <button
              class="mobile-sidebar__close"
              @click="closeMobileMenu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              >
                <line
                  x1="18"
                  y1="6"
                  x2="6"
                  y2="18"
                />
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                />
              </svg>
            </button>
            <div class="mobile-sidebar__links">
              <NuxtLink
                to="/blog"
                class="mobile-sidebar__link"
                @click="closeMobileMenu"
              >
                查看博客
              </NuxtLink>
              <NuxtLink
                to="/resume"
                class="mobile-sidebar__link"
                @click="closeMobileMenu"
              >
                查看简历
              </NuxtLink>
            </div>
          </aside>
        </div>
      </Transition>
    </Teleport>

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
  </div>
</template>

<style scoped>
.page-layout {
  min-height: 100vh;
}

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.nav-bar__link {
  font-size: 0.875rem;
  color: #4a5568;
  text-decoration: none;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.nav-bar__link:hover {
  color: var(--app-accent);
}

.nav-bar__link.router-link-active {
  color: var(--app-accent);
  font-weight: 500;
}

.nav-bar__hamburger {
  display: none;
  padding: 0.375rem;
  background: none;
  border: none;
  color: #4a5568;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.nav-bar__hamburger:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #2d3748;
}

@media (max-width: 640px) {
  .nav-bar__link {
    display: none;
  }

  .nav-bar__hamburger {
    display: flex;
  }
}

.mobile-sidebar-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.4);
}

.mobile-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(280px, 80vw);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.mobile-sidebar__close {
  align-self: flex-end;
  padding: 0.375rem;
  background: none;
  border: none;
  color: #4a5568;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.mobile-sidebar__close:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #2d3748;
}

.mobile-sidebar__links {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-sidebar__link {
  font-size: 1.125rem;
  color: #4a5568;
  text-decoration: none;
  padding: 0.875rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.mobile-sidebar__link:hover {
  color: var(--app-accent);
}

.mobile-sidebar__link.router-link-active {
  color: var(--app-accent);
  font-weight: 500;
}

/* Sidebar transition */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: opacity 0.25s ease;
}

.sidebar-enter-active .mobile-sidebar,
.sidebar-leave-active .mobile-sidebar {
  transition: transform 0.25s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
}

.sidebar-enter-from .mobile-sidebar,
.sidebar-leave-to .mobile-sidebar {
  transform: translateX(100%);
}
</style>
