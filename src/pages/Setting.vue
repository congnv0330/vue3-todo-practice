<template>
  <div class="p-4 md:p-5">
    <h2 class="text-gray-700 dark:text-white pb-3 mb-4 border-b border-gray-200 dark:border-gray-700">
      Settings
    </h2>
    <div class="text-left mb-5">
      <p class="dark:text-white mb-2">Export Todos data as JSON.</p>
      <v-button @click="downloadBackup">
        Export Backup
      </v-button>
    </div>
    <div class="text-left">
      <p class="dark:text-white mb-2">Import Todos JSON file.</p>
      <input
        ref="fileBackup"
        type="file"
        class="hidden"
        accept="application/json"
        @change="onUploadBackup"
      >
      <v-button @click="uploadBackupFile">
        Inport Backup
      </v-button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import VButton from '@/components/VButton.vue'
import TodoService from '@/services/todo'
import { Todo } from '@/types'

export default defineComponent({
  name: 'SettingPage',
  components: {
    VButton
  },
  setup () {
    const fileBackup = ref<HTMLInputElement | null>(null)

    const download = (content: string, fileName: string, contentType: string) => {
      const a = document.createElement('a')
      const file = new Blob([content], { type: contentType })
      a.href = URL.createObjectURL(file)
      a.download = fileName
      a.click()
    }

    const downloadBackup = () => {
      const todos = TodoService.getInstance().get();
      download(JSON.stringify(todos), `backup_${Date.now()}.json`, 'application/json')
    }

    const uploadBackupFile = () => {
      if (confirm('This will delete all old data and add new data!')) {
        fileBackup.value?.click()
      }
    }

    const instanceOfTodo = (object: any): object is Todo => {
      return Object.prototype.hasOwnProperty.call(object, 'id')
        && Object.prototype.hasOwnProperty.call(object, 'content')
        && Object.prototype.hasOwnProperty.call(object, 'createdAt')
        && Object.prototype.hasOwnProperty.call(object, 'isCheck');
    }

    const onUploadBackup = (e: { target: HTMLInputElement }) => {
      const files = e.target.files

      if (files && files.length > 0) {
        const file = files[0]

        const reader = new FileReader()

        reader.onload = (event: any) => {
          try {
            const todos: Todo[] = JSON.parse(event.target.result)

            if (!Array.isArray(todos)) {
              throw 'Incorrect Data!'
            }

            todos.forEach(todo => {
              if (!instanceOfTodo(todo)) {
                throw 'Incorrect Data!'
              }
            })

            TodoService.getInstance().deleteAll()
            TodoService.getInstance().save(todos)

            alert('Success!')
          } catch (e) {
            console.error(e)
            alert('Import failed!')
          }
        }

        reader.readAsText(file)
      }
    }

    return {
      fileBackup,
      downloadBackup,
      onUploadBackup,
      uploadBackupFile
    }
  }
})
</script>
