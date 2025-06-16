import { createRouter, createWebHistory } from 'vue-router'
import DashboardHome from '@/views/DashboardHome.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/dashboard',
    name: 'DashboardHome',
    component: DashboardHome,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
