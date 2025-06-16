<template>
  <div class="card bg-base-100 shadow-xl p-4">
    <slot name="header">
      <h2 class="card-title text-lg">{{ title }}</h2>
    </slot>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' }
})
</script>