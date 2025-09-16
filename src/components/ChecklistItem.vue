<template>
  <label class="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
    <input type="checkbox" class="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" :checked="modelValue" @change="$emit('update:modelValue', !modelValue)" />
    <span class="text-sm">{{ label }}</span>
  </label>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  modelValue: { type: Boolean, default: false },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
</style>
