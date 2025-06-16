// src/composables/useNotification.js
import { ref } from 'vue'

const notifications = ref([])

export function useNotification() {
  function notify({ type = 'info', message }) {
    // Evita duplicados consecutivos
    const last = notifications.value[notifications.value.length - 1]
    if (last && last.message === message && last.type === type) return
    const id = Date.now() + Math.random()
    notifications.value.push({ id, type, message })
  }
  function remove(id) {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }
  return { notifications, notify, remove }
}
