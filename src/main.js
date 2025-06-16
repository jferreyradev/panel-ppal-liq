import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Simulación de autenticación simple con localStorage
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('auth') === 'true'
  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'DashboardHome' })
  } else {
    next()
  }
})

const app = createApp(App)

app.use(router)

app.mount('#app')
