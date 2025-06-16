<script setup>
import { ref, watch, computed } from 'vue'
import { useEndPoint } from '../composables/useEndPoint'
import { useNotification } from '@/composables/useNotification'
import { jsonToKeyValueString } from '@/utils/jsonToKeyValueString'

const props = defineProps({
  modelValue: String,
})
const emit = defineEmits(['update:modelValue'])

const { endPointsKeys, getEndPointByKey, setActive, activeEndPoint } = useEndPoint()
const selected = ref(props.modelValue || '')

watch(
  () => props.modelValue,
  (val) => {
    selected.value = val
  },
)

watch(
  selected,
  (val) => {
    emit('update:modelValue', val)
    const ep = getEndPointByKey(val)
    if (ep) {
      setActive(ep)
    }
    // Llama a handleResult cuando cambia la selección
    //handleResult()
    testConnection()
  },
  { immediate: true },
)

const url = computed(() => {
  if (!activeEndPoint.value.base) return null
  return activeEndPoint.value.base + '/api/view/configServer'
})

const loading = ref(false)
const data = ref(null)
const error = ref(null)

async function testConnection() {
  loading.value = true
  data.value = null
  error.value = null
  try {
    const resp = await fetch(url.value)
    if (!resp.ok) throw new Error(resp.statusText)
    data.value = await resp.json()
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
  handleResult()
}

watch(url, (newUrl) => {
  if (newUrl) testConnection()
})

function handleResult() {
  const { notify } = useNotification()
  if (error.value) {
    notify({ type: 'error', message: `Error al conectar a ${url.value}\nError: ${error.value}` })
  } else {
    notify({
      type: 'success',
      message: `Conexión exitosa a ${url.value}\nDatos:\n${jsonToKeyValueString(data.value)}`,
    })
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <select v-model="selected" class="select select-sm select-bordered">
        <option disabled value="">Seleccionar ambiente</option>
        <option v-for="k in endPointsKeys" :key="k" :value="k">
          {{ getEndPointByKey(k).titulo || k }}
        </option>
      </select>
    </div>
  </div>
</template>
