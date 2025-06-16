<script setup>
import { computed, watch } from 'vue'
import { useFetchCache } from '@/composables/useFetchCache'

const props = defineProps({
  url: {
    type: String,
    default: '',
  },
  auto: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['result'])

const key = computed(() => props.url)
const endpointUrl = computed(() => props.url)

const { data, loading, error, reload, clear } = useFetchCache(key, endpointUrl, {}, false, false)

watch(
  endpointUrl,
  () => {
    clear()
    if (props.auto && endpointUrl.value) reload()
  },
  { immediate: true },
)

function testConnection() {
  clear()
  if (endpointUrl.value) reload()
  emit('result', {
    url: endpointUrl.value,
    data: data.value,
    error: error.value,
    loading: loading.value,
    reload,
    clear,
  })
}
</script>

<template>
  <div v-if="visible">
    <button
      class="btn"
      :class="{
        'btn-primary': !error,
        'btn-error': !!error,
        'animate-shake': !!error,
      }"
      @click="testConnection"
      :disabled="loading || !endpointUrl"
    >
      <span v-if="loading" class="loading loading-spinner loading-xs mr-2"></span>
      <span v-else>Probar conexión</span>
    </button>
  </div>
</template>
