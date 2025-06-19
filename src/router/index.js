import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/components/common/DashboardLayout.vue'
import DashboardHome from '@/views/DashboardHome.vue'
import LoginView from '@/views/LoginView.vue'

import DesarrolladorView from '@/views/DesarrolladorView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: DashboardHome,
      },
      {
        path: 'apiview',
        name: 'Desarrollo API',
        component: DesarrolladorView,
      },
      // Puedes agregar aquí más rutas hijas para el dashboard
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
