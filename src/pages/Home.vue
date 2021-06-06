<template>
  <div class="p-4 md:p-5 border-b border-gray-200">
    <h2 class="text-gray-700 mb-4">
      Todos
    </h2>
    <v-create-todo
      @newTodo="createTodo"
    />
  </div>
  <v-filter
    @filter="filterTodo"
  />
  <v-todos
    :todos="todos"
    @updateTodo="updateTodo"
    @deleteTodo="deleteTodo"
  />
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import VTodos from '@/components/VTodos.vue'
import VCreateTodo from '@/components/VCreateTodo.vue'
import VFilter from '@/components/VFilter.vue'
import todoService from '@/services/todo'
import { Todo, TodoFilter } from '@/types/todo'

export default defineComponent({
  name: 'HomePage',
  components: {
    VTodos,
    VCreateTodo,
    VFilter
  },
  setup () {
    const todos = ref<Todo[]>([])

    let filterOption = reactive<TodoFilter>({
      q: '',
      sortDesc: true
    })

    const fetchTodos = () => {
      todos.value = todoService.getInstance().get(filterOption)
    }

    const filterTodo = (filter: TodoFilter) => {
      filterOption = filter
      fetchTodos()
    }

    const createTodo = (todo: Todo) => {
      todoService.getInstance().create(todo)
      fetchTodos()
    }

    const updateTodo = (todo: Todo) => {
      todoService.getInstance().update(todo.id, todo);
      fetchTodos()
    }

    const deleteTodo = (id: string) => {
      todoService.getInstance().delete(id)
      fetchTodos()
    }

    fetchTodos()

    return {
      todos,
      filterTodo,
      createTodo,
      updateTodo,
      deleteTodo
    }
  }
})
</script>
