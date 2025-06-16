<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <form class="bg-base-100 p-8 rounded-lg shadow-md w-full max-w-sm space-y-6">
      <h2 class="text-2xl font-bold text-center mb-4">Iniciar sesión</h2>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Usuario</span>
        </label>
        <input
          v-model="username"
          type="text"
          placeholder="Usuario"
          class="input input-bordered w-full"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Contraseña</span>
        </label>
        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          class="input input-bordered w-full"
        />
      </div>
      <button class="btn btn-primary w-full" @click.prevent="login">Entrar</button>
      <div v-if="error" class="text-error text-center mt-2">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthUser } from '@/composables/useAuthUser'
const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const { setUser } = useAuthUser()

function login() {
  if (!username.value || !password.value) {
    error.value = 'Completa todos los campos.'
    return
  }
  // Validación local: usuario y contraseña fijos
  if (username.value === 'admin' && password.value === '1234') {
    localStorage.setItem('auth', 'true')
    localStorage.setItem('username', username.value)
    setUser(username.value)
    error.value = ''
    router.push({ name: 'DashboardHome' })
  } else {
    error.value = 'Usuario o contraseña incorrectos.'
  }
}
</script>
