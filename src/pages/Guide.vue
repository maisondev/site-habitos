<template>
  <section>
    <div class="mb-6">
      <h2 class="text-2xl font-semibold">Guia de Hábitos Saudáveis</h2>
      <p class="text-slate-600">Cards com dicas sobre alimentação, sono, atividade física e saúde mental. Editável em public/data/habitos.json.</p>
    </div>

    <div v-if="loading" class="text-sm text-slate-500">Carregando...</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      <HabitCard v-for="(h, i) in habits" :key="i" :habit="h" />
    </div>

    <div v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HabitCard from '../components/HabitCard.vue'

const habits = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await fetch('/data/habitos.json')
    if (!res.ok) throw new Error('Falha ao carregar habitos.json')
    habits.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
</style>
