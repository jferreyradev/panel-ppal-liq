<script setup>
import { ref } from 'vue'
import ApiMapperViewer from '@/views/ApiMapperViewer.vue'
import ApiSpViewer from '@/views/ApiSpViewer.vue'

const leftWidth = ref(50)
let isResizing = false

function startResize(e) {
  isResizing = true
  document.body.style.cursor = 'col-resize'
}

function stopResize() {
  isResizing = false
  document.body.style.cursor = ''
}

function onResize(e) {
  if (!isResizing) return
  const container = document.getElementById('dev-split-container')
  const rect = container.getBoundingClientRect()
  let percent = ((e.clientX - rect.left) / rect.width) * 100
  if (percent < 10) percent = 10
  if (percent > 90) percent = 90
  leftWidth.value = percent
}

window.addEventListener('mousemove', onResize)
window.addEventListener('mouseup', stopResize)
</script>

<template>
  <div id="dev-split-container" class="w-full h-full flex" style="min-height:320px;">
    <div :style="`width: ${leftWidth}%`" class="transition-all duration-100">
      <ApiMapperViewer />
    </div>
    <div
      class="w-px cursor-col-resize bg-base-200 hover:bg-base-300 transition-colors"
      @mousedown="startResize"
      style="z-index:10; min-width: 2px; min-height: 100%; display: flex; align-items: stretch;"
    ></div>
    <div :style="`width: ${100 - leftWidth}%`" class="transition-all duration-100">
      <ApiSpViewer />
    </div>
  </div>
</template>
