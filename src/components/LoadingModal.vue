<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
  >
    <div
      class="bg-base-100 p-8 rounded-lg shadow-lg flex flex-col items-center gap-4 relative min-w-[200px]"
    >
      <span class="loading loading-spinner loading-lg text-primary"></span>
      <span v-if="message" class="text-base-content">{{ message }}</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, watch } from 'vue'
const props = defineProps({
  show: Boolean,
  message: String,
  escapable: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['close'])

function close() {
  emit('close')
}

function onKey(e) {
  console.log('Key pressed:', e.key)
  if (props.escapable && props.show && e.key === 'Escape') {
    close()
  }
}

function addListener() {
  window.addEventListener('keydown', onKey)
}
function removeListener() {
  window.removeEventListener('keydown', onKey)
}

onMounted(() => {
  if (props.escapable) addListener()
})
onBeforeUnmount(() => {
  removeListener()
})

watch(
  () => props.escapable,
  (val) => {
    if (val) addListener()
    else removeListener()
  },
)
watch(
  () => props.show,
  (val) => {
    if (props.escapable && val) addListener()
    else removeListener()
  },
)
</script>
