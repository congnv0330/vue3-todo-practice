<template>
  <input
    :value="modelValue"
    type="text"
    class="appearance-none py-[0.375rem] px-3 text-base leading-normal border border-gray-300 shadow-sm rounded block w-full focus:outline-none focus:border-blue-500"
    @input="onInput"
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VInput',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const onInput = (e: any) => {
      emit('update:modelValue', e.target.value)
    }

    return {
      onInput
    }
  }
})
</script>
