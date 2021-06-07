<template>
  <div class="bg-gray-100 dark:bg-gray-900 min-h-screen w-full p-4 flex">
    <div class="m-auto w-full md:w-2/3 lg:w-2/3 xl:w-1/2">
      <div class="text-left mb-3">
        <router-link
          :to="{ name: 'home' }"
          class="text-gray-600 dark:text-gray-50 hover:underline"
          active-class="font-bold text-gray-800 dark:text-white"
        >
          Home
        </router-link>
        <span class="px-1 dark:text-white">|</span>
        <router-link
          :to="{ name: 'setting' }"
          class="text-gray-600 dark:text-gray-50 hover:underline"
          active-class="font-bold text-gray-800 dark:text-white"
        >
          Setting
        </router-link>
      </div>
      <div class="bg-white dark:bg-gray-800 overflow-hidden rounded-md shadow-md">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>
