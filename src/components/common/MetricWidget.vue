<script setup>
defineProps({
  label: String,
  value: [String, Number],
})
</script>

<template>
  <div class="stat bg-base-200 rounded-box shadow p-4">
    <div class="stat-figure text-primary">
      <slot name="icon"></slot>
    </div>
    <div class="stat-title">{{ label }}</div>
    <div class="stat-value">{{ value }}</div>
  </div>
</template>
