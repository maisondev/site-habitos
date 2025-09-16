<template>
  <div class="card">
    <div class="flex items-start justify-between">
      <div>
        <div class="text-xs text-slate-500">Dia {{ index + 1 }}</div>
        <div class="font-medium">{{ message }}</div>
      </div>
      <button class="badge" @click="$emit('toggle')">
        <span v-if="done">Concluído ✓</span>
        <span v-else>Marcar</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  index: { type: Number, required: true },
  message: { type: String, required: true },
  done: { type: Boolean, default: false },
})

defineEmits(['toggle'])
</script>

<style scoped>
</style>
