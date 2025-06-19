<script setup>
import { useFetchCache } from '../composables/useFetchCache'
import { useEndPoint } from '../composables/useEndPoint'
import JsonViewer from '../components/JsonViewer.vue'
import { computed } from 'vue'

const { activeEndPoint } = useEndPoint()

const url = computed(() => {
  if (!activeEndPoint.value.base) return null
  return activeEndPoint.value.sp + '/sp/list'
})

const { data, loading, error } = useFetchCache(url, url, {}, true, false)

</script>

<template>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">{{ error.message }}</div>
    <JsonViewer v-else :json="data" />
</template>
