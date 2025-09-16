<template>
  <div class="card flex flex-col gap-3">
    <div class="flex items-start gap-3">
      <div class="text-2xl" aria-hidden="true">{{ habit.icon }}</div>
      <div>
        <h3 class="font-semibold text-lg">{{ habit.title }}</h3>
        <p class="text-sm text-slate-600">{{ habit.description }}</p>
      </div>
    </div>
    <div v-if="habit.tips?.length" class="mt-1">
      <div class="text-xs font-medium text-slate-500 mb-1">Dicas rápidas</div>
      <ul class="list-disc ml-5 space-y-1">
        <li v-for="(tip, i) in habit.tips" :key="i" class="text-sm text-slate-700">{{ tip }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  habit: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
</style>
