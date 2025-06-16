<script setup>
import { useRouter } from 'vue-router'
import { useAuthUser } from '@/composables/useAuthUser'
const router = useRouter()
const { user, clearUser } = useAuthUser()

const props = defineProps({
  titulo: { type: String, default: 'Mi Dashboard' },
  user: { type: String, default: '' },
  logout: { type: Function, default: null },
})

function handleLogout() {
  if (props.logout) {
    props.logout()
  } else {
    localStorage.removeItem('auth')
    localStorage.removeItem('username')
    clearUser()
    router.push({ name: 'Login' })
  }
}
</script>

<template>
  <header class="w-full flex items-center justify-between px-4 py-2 bg-base-100 shadow">
    <div class="flex items-center gap-4 flex-1 min-w-0">
      <!-- Logo y título -->
      <slot name="logo"></slot>
      <span class="font-bold text-lg truncate">{{ props.titulo }}</span>
      <!-- Selector de endpoint -->
      <slot name="selector"></slot>
    </div>
    <div class="flex items-center gap-2 flex-shrink-0">
      <!-- Perfil de usuario -->
      <div class="dropdown dropdown-end ml-2">
        <label tabindex="0" class="btn btn-ghost flex items-center gap-2 cursor-pointer">
          <span class="font-bold">{{ props.user }}</span>
        </label>
        <ul
          tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li><a>Perfil</a></li>
          <li>
            <button @click="handleLogout" class="btn btn-error btn-sm w-full">Salir</button>
          </li>
        </ul>
      </div>
      <!-- Slot para notificaciones -->
      <slot name="notificaciones"></slot>
    </div>
  </header>
</template>
