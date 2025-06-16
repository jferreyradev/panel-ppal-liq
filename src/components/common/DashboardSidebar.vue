<template>
  <aside class="w-60 min-h-full bg-base-200 flex flex-col justify-between">
    <ul class="menu p-4">
      <li><router-link to="/">Dashboard</router-link></li>
      <li><router-link to="/usuarios">Usuarios</router-link></li>
      <li><router-link to="/reportes">Reportes</router-link></li>
      <li><router-link to="/configuracion">Configuración</router-link></li>
    </ul>
    <div class="p-4">
      <button class="btn btn-error btn-sm w-full" @click="emit('logout')">Salir</button>
    </div>
  </aside>
</template>

<script setup>
const emit = defineEmits(['logout'])
</script>
