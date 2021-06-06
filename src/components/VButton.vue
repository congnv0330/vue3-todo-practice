<template>
  <button
    class="inline-flex appearance-none text-white focus:outline-none active:opacity-60 rounded font-medium leading-normal"
    :class="[
      variants[variant],
      sizes[size]
    ]"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface VariantColor {
  default: string,
  danger: string,
  success: string,
  light: string,
  [key: string]: string
}

interface Size {
  default: string,
  sm: string,
  [key: string]: string
}

export default defineComponent({
  name: 'VButton',
  props: {
    variant: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  setup () {
    const variants: VariantColor = {
      default: 'bg-blue-500',
      danger: 'bg-red-500',
      success: 'bg-green-500',
      light: 'bg-gray-500'
    }

    const sizes: Size = {
      default: 'py-[0.375rem] px-3 text-base',
      sm: 'py-1 px-2 text-sm'
    }

    return {
      variants,
      sizes
    }
  }
})
</script>
