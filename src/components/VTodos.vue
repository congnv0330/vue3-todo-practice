<template>
  <div class="divide-y divide-gray-200 dark:divide-gray-700">
    <div
      v-show="todos.length === 0"
      class="px-4 md:px-5 py-4 bg-white border-t border-gray-200 dark:border-gray-700"
    >
      No todo available ...
    </div>
    <transition-group
      move-class="transition-transform duration-300"
    >
      <v-todo
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @updateTodo="updateTodo"
        @deleteTodo="deleteTodo"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import VTodo from './VTodo.vue'
import { Todo } from '@/types'

export default defineComponent({
  name: 'VTodos',
  components: {
    VTodo
  },
  emits: ['updateTodo', 'deleteTodo'],
  props: {
    todos: {
      type: Object as PropType<Todo[]>,
      required: true
    }
  },
  setup (props, { emit }) {
    const updateTodo = (todo: Todo) => {
      emit('updateTodo', todo)
    }

    const deleteTodo = (id: string) => {
      emit('deleteTodo', id)
    }

    return {
      updateTodo,
      deleteTodo
    }
  }
})
</script>
