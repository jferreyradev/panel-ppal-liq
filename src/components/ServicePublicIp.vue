<script setup>
import { useFetchCache } from '../composables/useFetchCache'
import { ref } from 'vue'
import { copyToClipboard } from '@/utils/copyToClipboard'

const { data, error, loading } = useFetchCache(
  'services',
  'https://josrferreyr-apiserverde-79.deno.dev/items',
  {},
  true, // auto en true para que haga fetch al montar
  true,
)

const copiedValue = ref(null)
function handleCopy(cell) {
  copyToClipboard(cell, (text) => {
    copiedValue.value = text
    setTimeout(() => {
      copiedValue.value = null
    }, 500)
  })
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold">Ip publicas</h2>
    </div>
    <div v-if="loading" class="flex justify-center items-center py-8">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>
    <div v-else>
      <table class="table w-full">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ip</th>
            <th>Último cambio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in Array.isArray(data) ? data : []" :key="s.value.name + s.value.ip">
            <td>{{ s.value.name }}</td>
            <td>
              <span>{{ s.value.ip }}</span>
              <button class="btn btn-xs btn-ghost ml-2" @click="handleCopy(s.value.ip)">
                <span v-if="copiedValue === s.value.ip" class="text-success">Copiado!</span>
                <span v-else>
                  <!-- SVG de copiar -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                    />
                    <rect
                      x="3"
                      y="3"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                    />
                  </svg>
                </span>
              </button>
            </td>
            <td>{{ new Date(s.value.date).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="error" class="text-error mt-2">{{ error.message }}</div>
    </div>
  </div>
</template>
