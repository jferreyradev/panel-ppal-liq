<template>
  <div>
    <button class="btn btn-primary" @click="show = true">Mostrar loading</button>
    <LoadingModal
      :show="show"
      message="Cargando datos..."
      :escapable="true"
      @close="show = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoadingModal from './LoadingModal.vue'
const show = ref(false)
</script>
