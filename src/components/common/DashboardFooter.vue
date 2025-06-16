<script setup>
const props = defineProps({
  titulo: { type: String, default: '' },
})
</script>

<template>
  <footer class="footer p-4 bg-base-100 text-base-content border-t">
    <div>
      <span>© 2025 . Todos los derechos reservados.</span>
      <span>{{ props.titulo }}</span>
    </div>
  </footer>
</template>
