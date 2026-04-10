import { computed, onMounted, watch } from 'vue'

export type ThemePreference = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

function getSystemTheme(): ResolvedTheme {
  if (import.meta.server) {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: ResolvedTheme) {
  if (import.meta.server) {
    return
  }

  const root = document.documentElement
  root.dataset.theme = theme
  root.classList.toggle('dark', theme === 'dark')
}

export function useTheme() {
  const preference = useState<ThemePreference>('site-theme', () => 'light')

  const resolvedTheme = computed<ResolvedTheme>(() => {
    return preference.value === 'system' ? getSystemTheme() : preference.value
  })

  const setTheme = (value: ThemePreference) => {
    preference.value = value
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme.value === 'dark' ? 'light' : 'dark')
  }

  onMounted(() => {
    const saved = window.localStorage.getItem('zora-theme') as ThemePreference | null

    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      preference.value = saved
    }

    applyTheme(resolvedTheme.value)

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const syncFromSystem = () => {
      if (preference.value === 'system') {
        applyTheme(getSystemTheme())
      }
    }

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', syncFromSystem)
    }
  })

  watch(
    preference,
    (value) => {
      if (import.meta.server) {
        return
      }

      window.localStorage.setItem('zora-theme', value)
      applyTheme(resolvedTheme.value)
    },
    { immediate: true },
  )

  return {
    preference,
    resolvedTheme,
    setTheme,
    toggleTheme,
  }
}
