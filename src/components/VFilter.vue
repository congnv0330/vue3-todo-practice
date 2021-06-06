<template>
  <div class="p-4 md:p-5">
    <a
      href="javascript:void(0)"
      class="hover:underline"
      @click="isShow = !isShow"
    >
      <h5
        class="flex items-center"
        :class="{ 'mb-2': isShow }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filter?
      </h5>
    </a>
    <div v-show="isShow">
      <v-input
        v-model="filter.q"
        placeholder="Search..."
        class="mb-2"
      />
      <div>
        <a
          href="javascript:void(0)"
          class="text-gray-600 hover:underline"
          :class="{ 'underline': filter.sortDesc }"
          @click="filter.sortDesc = true"
        >
          Newest
        </a>
        <span class="mx-1">-</span>
        <a
          href="javascript:void(0)"
          class="text-gray-600 hover:underline"
          :class="{ 'underline': !filter.sortDesc }"
          @click="filter.sortDesc = false"
        >
          Oldest
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, watch, defineComponent } from 'vue'
import VInput from './VInput.vue'
import { TodoFilter } from '@/types/todo'
import debounce from 'lodash/debounce'

export default defineComponent({
  name: 'VFilter',
  components: {
    VInput
  },
  emits: ['filter'],
  setup (props, { emit }) {
    const isShow = ref<boolean>(false)

    const filter =  reactive<TodoFilter>({
      q: '',
      sortDesc: true
    })

    watch(
      () => filter.q,
      debounce((value: string) => {
        emit('filter', filter)
      }, 300)
    )

    watch(
      () => filter.sortDesc,
      (value: boolean) => {
        emit('filter', filter)
      }
    )

    return {
      isShow,
      filter
    }
  },
})
</script>
