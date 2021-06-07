<template>
  <form method="POST" @submit.prevent="createTodo">
    <div class="flex">
      <v-input
        v-model="newTodo"
        class="mr-4"
        placeholder="New todo..."
      />
      <v-button type="submit">
        Create
      </v-button>
    </div>
  </form>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import VInput from './VInput.vue'
import VButton from './VButton.vue'
import { Todo } from '@/types'

export default defineComponent({
  name: 'VCreateTodo',
  components: {
    VInput,
    VButton
  },
  emits: ['newTodo'],
  setup (props, { emit }) {
    const newTodo = ref<string>('')

    const createTodo = () => {
      if (!newTodo.value.trim()) {
        alert('Please enter todo!')
        return
      }

      const todo : Todo = {
        id: Date.now().toString(),
        content: newTodo.value,
        createdAt: new Date(),
        isCheck: false
      }

      emit('newTodo', todo)

      newTodo.value = ''
    }

    return {
      newTodo,
      createTodo
    }
  }
})
</script>
