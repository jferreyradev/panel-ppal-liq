<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useNotification } from '@/composables/useNotification'

const { notifications, remove } = useNotification()
const open = ref(false) // El panel inicia cerrado
const unread = ref(0)
const lastSeen = ref(Date.now())

// Si se pasa la prop floating, el panel se comporta como overlay lateral
const props = defineProps({
  floating: { type: Boolean, default: false },
})

// Actualiza el contador de no leídos cuando el panel está cerrado
watch(
  [notifications, open],
  ([notifs, isOpen]) => {
    if (isOpen) {
      unread.value = 0
      lastSeen.value = Date.now()
    } else {
      unread.value = notifs.filter((n) => n.id > lastSeen.value).length
    }
  },
  { immediate: true, deep: true },
)

function togglePanel() {
  open.value = !open.value
}

function getTitle(type) {
  switch (type) {
    case 'success':
      return 'Éxito'
    case 'error':
      return 'Error'
    case 'warning':
      return 'Advertencia'
    case 'info':
    default:
      return 'Información'
  }
}

function handleClickOutside(event) {
  if (open.value) {
    const panel = document.getElementById('notification-panel')
    const btn = document.getElementById('notification-btn')
    if (panel && !panel.contains(event.target) && btn && !btn.contains(event.target)) {
      open.value = false
    }
  }
}
onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <div v-if="props.floating" class="fixed top-0 right-0 h-full z-50 flex flex-col items-end">
    <div
      v-if="open"
      class="w-80 max-w-full h-full bg-white shadow-2xl border-l border-base-300 flex flex-col"
    >
      <div class="flex items-center justify-between px-4 py-2 border-b border-base-200 bg-base-100">
        <span class="font-bold tracking-wide text-base text-gray-700">Notificaciones</span>
        <button class="btn btn-xs btn-ghost" @click="togglePanel" aria-label="Contraer">⮞</button>
      </div>
      <div
        class="flex-1 overflow-y-auto p-3 flex flex-col gap-3 bg-gradient-to-b from-white via-gray-50 to-gray-100"
      >
        <div
          v-for="n in notifications"
          :key="n.id"
          :class="[
            'relative rounded-lg px-4 py-3 text-xs shadow-md min-h-[40px] max-w-full border flex flex-col justify-center',
            n.type === 'success' ? 'bg-green-50 text-green-900 border-green-300' : '',
            n.type === 'error' ? 'bg-red-50 text-red-900 border-red-300' : '',
            n.type === 'info' ? 'bg-blue-50 text-blue-900 border-blue-300' : '',
            n.type === 'warning' ? 'bg-yellow-50 text-yellow-900 border-yellow-300' : '',
          ]"
          role="alert"
          style="word-break: break-word; overflow-wrap: anywhere"
        >
          <button
            class="absolute top-1 right-1 flex items-center justify-center rounded-full hover:bg-gray-200 transition w-6 h-6 text-base font-bold text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 z-10"
            @click="remove(n.id)"
            aria-label="Cerrar"
          >
            <span class="text-lg">×</span>
          </button>
          <span
            class="font-semibold mb-1 text-xs"
            :class="{
              'text-green-700': n.type === 'success',
              'text-red-700': n.type === 'error',
              'text-blue-700': n.type === 'info',
              'text-yellow-700': n.type === 'warning',
            }"
            >{{ getTitle(n.type) }}</span
          >
          <span class="break-words whitespace-pre-line pr-2 max-w-full leading-relaxed">{{
            n.message
          }}</span>
        </div>
      </div>
    </div>
    <button
      v-if="!open"
      id="notification-btn"
      class="btn btn-sm btn-primary m-0 relative flex items-center justify-center"
      @click="togglePanel"
      aria-label="Abrir notificaciones"
      style="z-index: 30"
    >
      <span
        v-if="unread > 0"
        class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 border-2 border-white shadow"
        >{{ unread }}</span
      >
      Abrir notificaciones
    </button>
  </div>
  <div v-else class="relative flex flex-col items-end">
    <button
      v-if="!open"
      id="notification-btn"
      class="btn btn-sm btn-primary m-0 relative flex items-center justify-center"
      @click="togglePanel"
      aria-label="Abrir notificaciones"
      style="z-index: 30"
    >
      <span
        v-if="unread > 0"
        class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 border-2 border-white shadow"
        >{{ unread }}</span
      >
      Abrir notificaciones
    </button>
    <div
      v-if="open"
      id="notification-panel"
      class="absolute right-0 top-10 w-80 max-w-full bg-white shadow-2xl border border-base-300 flex flex-col z-40"
    >
      <div class="flex items-center justify-between px-4 py-2 border-b border-base-200 bg-base-100">
        <span class="font-bold tracking-wide text-base text-gray-700">Notificaciones</span>
        <button class="btn btn-xs btn-ghost" @click="togglePanel" aria-label="Contraer">⮞</button>
      </div>
      <div
        class="max-h-96 overflow-y-auto p-3 flex flex-col gap-3 bg-gradient-to-b from-white via-gray-50 to-gray-100"
      >
        <div
          v-for="n in notifications"
          :key="n.id"
          :class="[
            'relative rounded-lg px-4 py-3 text-xs shadow-md min-h-[40px] max-w-full border flex flex-col justify-center',
            n.type === 'success' ? 'bg-green-50 text-green-900 border-green-300' : '',
            n.type === 'error' ? 'bg-red-50 text-red-900 border-red-300' : '',
            n.type === 'info' ? 'bg-blue-50 text-blue-900 border-blue-300' : '',
            n.type === 'warning' ? 'bg-yellow-50 text-yellow-900 border-yellow-300' : '',
          ]"
          role="alert"
          style="word-break: break-word; overflow-wrap: anywhere"
        >
          <button
            class="absolute top-1 right-1 flex items-center justify-center rounded-full hover:bg-gray-200 transition w-6 h-6 text-base font-bold text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 z-10"
            @click="remove(n.id)"
            aria-label="Cerrar"
          >
            <span class="text-lg">×</span>
          </button>
          <span
            class="font-semibold mb-1 text-xs"
            :class="{
              'text-green-700': n.type === 'success',
              'text-red-700': n.type === 'error',
              'text-blue-700': n.type === 'info',
              'text-yellow-700': n.type === 'warning',
            }"
            >{{ getTitle(n.type) }}</span
          >
          <span class="break-words whitespace-pre-line pr-2 max-w-full leading-relaxed">{{
            n.message
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Elimino estilos de transición -->
