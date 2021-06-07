<template>
  <div class="bg-gray-100 dark:bg-gray-600 min-h-screen w-full p-4 flex">
    <div class="bg-white dark:bg-gray-800 overflow-hidden rounded-md shadow-md m-auto w-full md:w-2/3 lg:w-2/3 xl:w-1/2">
      <router-view />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>
