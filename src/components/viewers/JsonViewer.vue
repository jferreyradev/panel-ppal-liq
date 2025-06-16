<script setup>
import { computed, ref, nextTick, watch } from 'vue'

const props = defineProps({
  json: { type: Object, default: () => ({}) }
})

const search = ref('')
const searchInput = ref(null)
const preRef = ref(null)

// Computed para las claves del JSON recibido
const jsonKeys = computed(() => {
  if (!props.json || typeof props.json !== 'object') return []
  return Object.keys(props.json)
})

const selectedJsonKey = ref('')

watch(
  () => props.json,
  () => {
    selectedJsonKey.value = jsonKeys.value[0] || ''
  },
  { immediate: true }
)

const formattedJson = computed(() => {
  if (!props.json) return ''
  let jsonStr = ''
  if (selectedJsonKey.value && props.json[selectedJsonKey.value] !== undefined) {
    jsonStr = JSON.stringify(props.json[selectedJsonKey.value], null, 2)
  } else {
    jsonStr = JSON.stringify(props.json, null, 2)
  }
  if (search.value) {
    const escaped = search.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escaped, 'gi')
    jsonStr = jsonStr.replace(regex, match => `<mark>${match}</mark>`)
  }
  return jsonStr
})

watch([formattedJson, search], async () => {
  await nextTick()
  if (preRef.value && search.value) {
    const mark = preRef.value.querySelector('mark')
    if (mark) {
      mark.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
})

function selectInput() {
  nextTick(() => {
    if (searchInput.value) searchInput.value.select()
  })
}
</script>

<template>
  <div>
    <div class="flex items-center gap-2 mb-2">
      <select v-model="selectedJsonKey" class="select select-sm select-bordered" v-if="jsonKeys.length">
        <option value="">Todos</option>
        <option v-for="k in jsonKeys" :key="k" :value="k">
          {{ k }}
        </option>
      </select>
      <input
        ref="searchInput"
        v-model="search"
        type="text"
        placeholder="Buscar palabra..."
        class="input input-sm input-bordered"
        @keyup.enter="selectInput"
      />
    </div>
    <pre
      ref="preRef"
      class="p-4 rounded overflow-auto text-xs"
      v-html="formattedJson"
      style="max-height: 60vh;"
    ></pre>
  </div>
</template>

<style scoped>
mark {
  background: #ffe066;
  color: #222;
  padding: 0 2px;
  border-radius: 2px;
}
</style>
