<script setup>
import { useRouter } from 'vue-router'
import { useAuthUser } from '@/composables/useAuthUser'
import IconProfile from '@/components/icons/IconProfile.vue'
const router = useRouter()
const { clearUser } = useAuthUser()

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
    <!-- Slot para notificaciones -->
    <slot name="notificaciones"></slot>
    <div class="flex items-center gap-2 flex-shrink-0 ml-4">
      <!-- Perfil de usuario -->
      <div class="dropdown dropdown-end z-40 relative flex items-center">
        <label tabindex="0" class="btn btn-ghost flex items-center gap-1 px-2 py-1 cursor-pointer">
          <IconProfile />
          <span class="font-bold align-middle">{{ props.user }}</span>
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
    </div>
  </header>
</template>
