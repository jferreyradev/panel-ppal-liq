<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useEndPoint } from '@/composables/useEndPoint'

const show = ref(false)
const result = ref('')
const errorMsg = ref('')
const results = ref([])
const process = ref([])
const cancelAll = ref(false)
const currentEndpoint = ref({ base: '', titulo: '' }) // Valor seguro por defecto
const testingKey = ref('')

async function testConn() {
  results.value = []
  process.value = []
  cancelAll.value = false
  for (const key of endPointsKeys.value) {
    if (cancelAll.value) break
    const endpoint = getEndPointByKey(key)
    currentEndpoint.value = endpoint
    testingKey.value = key
    process.value.push({ key, status: 'testing', message: '' })
    try {
      const resp = await fetch(endpoint.base + '/api/view/configServer')
      if (!resp.ok) throw new Error(resp.statusText)
      const data = await resp.json()
      process.value[process.value.length - 1] = {
        key,
        status: 'success',
        message: jsonToKeyValueString(data),
      }
    } catch (err) {
      process.value[process.value.length - 1] = {
        key,
        status: 'error',
        message: `Error: ${err.message}`,
      }
    }
    testingKey.value = ''
    if (cancelAll.value) break
    // Espera 500ms entre conexiones, salvo que se cancele
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
}

function cancelGlobal() {
  cancelAll.value = true
}

const { endPointsKeys, getEndPointByKey } = useEndPoint()

function jsonToKeyValueString(obj) {
  if (!obj || typeof obj !== 'object') return ''
  return Object.entries(obj)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join('\n')
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})

function onKeydown(e) {
  if (e.key === 'Escape') {
    cancelGlobal()
  }
}
</script>

<template>
  <div>
    <button class="btn btn-sm btn-primary" @click="testConn">Probar conexión</button>
    <button class="btn btn-sm btn-error ml-2" @click="cancelGlobal" :disabled="!show">
      Cancelar todo
    </button>
    <div v-if="testingKey" class="alert alert-info mt-4">
      Probando conexión de: <strong>{{ testingKey }}</strong> ({{ currentEndpoint.value.base }})
    </div>
    <div v-if="process.length" class="mt-4">
      <div
        v-for="r in process"
        :key="r.key"
        :class="[
          'alert',
          r.status === 'success'
            ? 'alert-success'
            : r.status === 'error'
              ? 'alert-error'
              : 'alert-info',
          'whitespace-pre-wrap',
          'mb-2',
        ]"
      >
        <strong>{{ r.key }}</strong>
        <template v-if="r.status === 'testing'">
          <span class="loading loading-spinner loading-xs mr-2"></span> Probando...
        </template>
        <template v-else>
          <pre class="bg-base-200 rounded p-2 overflow-x-auto text-xs">{{ r.message }}</pre>
        </template>
      </div>
    </div>
  </div>
</template>
