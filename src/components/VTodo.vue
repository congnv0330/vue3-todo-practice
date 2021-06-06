<template>
  <div class="px-4 md:px-5 py-4 bg-white hover:bg-gray-100">
    <form
      v-if="isEdit"
      method="POST"
      @submit.prevent="updateTodo"
    >
      <div class="flex flex-col md:flex-row md:items-center">
        <div class="flex-1 mr-2 mb-2 md:mb-0">
          <v-input
            v-model="cloneTodo.content"
          />
        </div>
        <div>
          <v-button
            type="submit"
            class="mr-1"
            variant="success"
          >
            Update
          </v-button>
          <v-button
            type="button"
            variant="danger"
            @click="resetDefaultTodo"
          >
            Cancel
          </v-button>
        </div>
      </div>
    </form>
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2"
    >
      <div class="md:col-span-2 lg:col-span-4">
        <label
          :for="`todo-${todo.id}`"
          class="break-words"
        >
          <input
            v-model="cloneTodo.isCheck"
            :id="`todo-${todo.id}`"
            type="checkbox"
            class="inline-block h-4 w-4 rounded mr-4"
            @change="checkTodo"
          >
          <span :class="{ 'line-through': todo.isCheck }">
            {{ todo.content }}
          </span>
        </label>
      </div>
      <div class="flex justify-end items-center ">
        <button
          class="flex items-center justify-center appearance-none focus:outline-none active:opacity-60 text-gray-700 rounded-[50%] hover:text-green-500 transition mr-4 md:mr-2"
          @click="isEdit = true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span class="md:hidden ml-1">Edit</span>
        </button>
        <button
          class="flex items-center justify-center appearance-none focus:outline-none active:opacity-60 text-gray-700 rounded-[50%] hover:text-red-500 transition"
          @click="deleteTodo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span class="md:hidden ml-1">Delete</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, PropType, defineComponent } from 'vue'
import VInput from './VInput.vue'
import VButton from './VButton.vue'
import Todo from '@/types/todo'

export default defineComponent({
  name: 'VTodo',
  components: {
    VInput,
    VButton
  },
  emits: ['deleteTodo', 'updateTodo'],
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true
    }
  },
  setup (props, { emit }) {
    const isEdit = ref<boolean>(false)

    const cloneTodo = reactive<Todo>({...props.todo})

    const resetDefaultTodo = () => {
      cloneTodo.content = props.todo.content
      isEdit.value = false
    }

    const checkTodo = () => {
      emit('updateTodo', cloneTodo)
      isEdit.value = false
    }

    const updateTodo = () => {
      if (!cloneTodo.content.trim()) {
        alert('Please enter something!')
        return
      }

      if (cloneTodo.content !== props.todo.content) {
        emit('updateTodo', cloneTodo)
      }

      isEdit.value = false
    }

    const deleteTodo = () => {
      emit('deleteTodo', props.todo.id)
      isEdit.value = false
    }

    return {
      isEdit,
      cloneTodo,
      resetDefaultTodo,
      updateTodo,
      checkTodo,
      deleteTodo
    }
  }
})
</script>
