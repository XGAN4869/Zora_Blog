<script setup lang="ts">
import { siteConfig } from '~/shared/config/site-config'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__intro surface-card">
        <p class="site-footer__eyebrow">
          {{ siteConfig.siteName }}
        </p>
        <h2 class="site-footer__title">
          {{ siteConfig.profile.title }}
        </h2>
        <p class="site-footer__copy">
          {{ siteConfig.siteDescription }}
        </p>
      </div>

      <div class="site-footer__grid">
        <section class="surface-card">
          <h3 class="site-footer__section-title">
            Navigation
          </h3>
          <ul class="site-footer__list">
            <li
              v-for="item in siteConfig.navItems"
              :key="item.to"
            >
              <NuxtLink :to="item.to">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </section>

        <section class="surface-card">
          <h3 class="site-footer__section-title">
            Social
          </h3>
          <ul class="site-footer__list">
            <li
              v-for="item in siteConfig.socialLinks"
              :key="item.href"
            >
              <a
                :href="item.href"
                target="_blank"
                rel="noreferrer"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </section>

        <section class="surface-card">
          <h3 class="site-footer__section-title">
            Contact
          </h3>
          <ul class="site-footer__list">
            <li
              v-for="item in siteConfig.contacts"
              :key="item.label"
            >
              <a
                v-if="item.href"
                :href="item.href"
                target="_blank"
                rel="noreferrer"
              >
                {{ item.label }} · {{ item.value }}
              </a>
              <span v-else>
                {{ item.label }} · {{ item.value }}
              </span>
            </li>
          </ul>
        </section>
      </div>

      <div class="site-footer__bottom">
        <span>© {{ currentYear }} {{ siteConfig.profile.englishName }}</span>
        <span>{{ siteConfig.motto }}</span>
      </div>
    </div>
  </footer>
</template>
