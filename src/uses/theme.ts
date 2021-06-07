import { ref, watch } from 'vue'
import { Theme } from '@/types'

const useTheme = () => {
  let localTheme: Theme = 'light'

  if (
    localStorage.theme === 'dark'
    || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    localTheme = 'dark'
  }

  const currentTheme = ref<Theme>(localTheme)

  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
  }

  watch(currentTheme, (value) => {
    localStorage.theme = value

    if (value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, { immediate: true })

  return {
    currentTheme,
    setTheme
  }
}

export default useTheme
