<template>
  <div>
    <a
      href="javascript:void(0)"
      class="text-gray-600 dark:text-white hover:underline"
      :class="{ 'underline': !isDark }"
      @click="setTheme('light')"
    >
      Light
    </a>
    <span class="mx-1 dark:text-white">-</span>
    <a
      href="javascript:void(0)"
      class="text-gray-600 dark:text-white hover:underline"
      :class="{ 'underline': isDark }"
      @click="setTheme('dark')"
    >
      Dark
    </a>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useTheme } from '@/uses'

export default defineComponent({
  setup () {
    const { currentTheme, setTheme } = useTheme()

    const isDark = computed(() => currentTheme.value === 'dark')

    return {
      isDark,
      setTheme
    }
  },
})
</script>
