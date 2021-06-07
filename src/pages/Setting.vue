<template>
  <div class="p-4 md:p-5">
    <h2 class="text-gray-700 dark:text-white pb-3 mb-4 border-b border-gray-200 dark:border-gray-700">
      Settings
    </h2>
    <div class="text-left mb-5">
      <p class="dark:text-white mb-2">Export Todos data as JSON.</p>
      <v-button>
        Export Backup
      </v-button>
    </div>
    <div class="text-left">
      <p class="dark:text-white mb-2">Import Todos JSON file.</p>
      <v-button>
        Inport Backup
      </v-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VButton from '@/components/VButton.vue'

export default defineComponent({
  name: 'SettingPage',
  components: {
    VButton
  },
  setup () {

  }
})
</script>
