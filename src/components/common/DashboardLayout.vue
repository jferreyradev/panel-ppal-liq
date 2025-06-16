<script setup>
import DashboardHeader from './DashboardHeader.vue'
import DashboardSidebar from './DashboardSidebar.vue'
import DashboardFooter from './DashboardFooter.vue'
import EndpointSelector from '../EndpointSelector.vue'
import NotificationCenter from '../NotificationCenter.vue'
import { ref } from 'vue'
import { useAuthUser } from '@/composables/useAuthUser'
import { useRouter } from 'vue-router'

const selectedEndpoint = ref('')
const { user, clearUser } = useAuthUser()
const router = useRouter()

const showConfirmLogout = ref(false)
function logout() {
  showConfirmLogout.value = true
}
function confirmLogout() {
  localStorage.removeItem('auth')
  localStorage.removeItem('username')
  clearUser()
  showConfirmLogout.value = false
  router.push({ name: 'Login' })
}
function cancelLogout() {
  showConfirmLogout.value = false
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <DashboardHeader :titulo="'Mi Dashboard'" :user="user" :logout="logout">
      <template #selector>
        <EndpointSelector v-model="selectedEndpoint" />
      </template>
      <template #notificaciones>
        <div class="flex items-center h-full">
          <NotificationCenter floating />
        </div>
      </template>
    </DashboardHeader>
    <div class="flex flex-1 overflow-hidden">
      <DashboardSidebar @logout="logout" />
      <main class="flex-1 overflow-auto p-6 bg-base-200">
        <slot />
      </main>
    </div>
    <DashboardFooter />
    <div
      v-if="showConfirmLogout"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
    >
      <div class="bg-white rounded shadow-lg p-6 w-full max-w-xs flex flex-col items-center">
        <p class="mb-4 text-center">¿Seguro que deseas cerrar sesión?</p>
        <div class="flex gap-2 w-full">
          <button class="btn btn-error flex-1" @click="confirmLogout">Salir</button>
          <button class="btn flex-1" @click="cancelLogout">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>
