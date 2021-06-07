import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/pages/Home.vue'

const routes : Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/pages/Setting.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
