<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  message: String,
  type: { type: String, default: 'info' }, // 'success', 'error', 'info', 'warning'
  show: Boolean,
  duration: { type: Number, default: 3000 },
})
const emit = defineEmits(['close'])

const visible = ref(props.show)

watch(
  () => props.show,
  (val) => {
    visible.value = val
    if (val && props.duration > 0) {
      setTimeout(() => {
        visible.value = false
        emit('close')
      }, props.duration)
    }
  },
  { immediate: true },
)

function close() {
  visible.value = false
  emit('close')
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="visible"
      :class="[
        'fixed top-4 left-4 z-50 min-w-[250px] max-w-xs px-4 py-3 rounded shadow-lg flex items-center gap-2',
        'bg-white',
        props.type === 'success' ? 'border-l-4 border-green-500 text-green-800' : '',
        props.type === 'error' ? 'border-l-4 border-red-500 text-red-800' : '',
        props.type === 'info' ? 'border-l-4 border-blue-500 text-blue-800' : '',
        props.type === 'warning' ? 'border-l-4 border-yellow-500 text-yellow-800' : '',
      ]"
      role="alert"
      style="box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15)"
    >
      <span class="flex-1 break-words">{{ props.message }}</span>
      <button class="ml-2 btn btn-xs btn-ghost" @click="close" aria-label="Cerrar">✕</button>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
