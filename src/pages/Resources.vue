<template>
  <section>
    <div class="mb-6">
      <h2 class="text-2xl font-semibold">Mapa de Recursos de Saúde da Comunidade</h2>
      <p class="text-slate-600">Locais gratuitos como postos de saúde, academias ao ar livre e campanhas. Editável em public/data/recursos.json.</p>
    </div>

    <div class="flex flex-wrap gap-3 items-center mb-5">
      <input v-model="query" type="text" placeholder="Buscar por nome ou cidade" class="w-full sm:w-64 rounded-lg border-slate-300 focus:ring-brand-500 focus:border-brand-500" />
      <select v-model="filterType" class="rounded-lg border-slate-300 focus:ring-brand-500 focus:border-brand-500">
        <option value="">Todos os tipos</option>
        <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
      </select>
      <button class="button-primary" @click="clearFilters">Limpar</button>
    </div>

    <div v-if="loading" class="text-sm text-slate-500">Carregando...</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <ResourceCard v-for="(r, i) in filtered" :key="i" :resource="r" />
    </div>

    <div v-if="!loading && filtered.length===0" class="mt-4 text-sm text-slate-500">Nenhum recurso encontrado.</div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ResourceCard from '../components/ResourceCard.vue'

const items = ref([])
const loading = ref(true)
const query = ref('')
const filterType = ref('')

const types = computed(() => Array.from(new Set(items.value.map(i => i.type))))

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return items.value.filter(i => {
    const matchesQ = !q ||
      i.name?.toLowerCase().includes(q) ||
      i.city?.toLowerCase().includes(q) ||
      i.address?.toLowerCase().includes(q)
    const matchesType = !filterType.value || i.type === filterType.value
    return matchesQ && matchesType
  })
})

function clearFilters() {
  query.value = ''
  filterType.value = ''
}

onMounted(async () => {
  try {
    const res = await fetch(new URL('data/recursos.json', import.meta.env.BASE_URL))
    if (!res.ok) throw new Error('Falha ao carregar recursos.json')
    items.value = await res.json()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
</style>
