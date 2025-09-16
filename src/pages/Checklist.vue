<template>
  <section>
    <div class="mb-6">
      <h2 class="text-2xl font-semibold">Checklist Diário de Bem-Estar</h2>
      <p class="text-slate-600">Marque o que você fez hoje. O progresso fica salvo no seu navegador.</p>
    </div>

    <div class="flex items-center gap-3 mb-4">
      <span class="badge">{{ todayLabel }}</span>
      <button class="text-sm text-slate-500 underline" @click="resetDay">Limpar de hoje</button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div v-for="item in items" :key="item.id" class="card p-0">
        <ChecklistItem :label="item.label" v-model="state[item.id]" @update:modelValue="save" />
      </div>
    </div>

    <div class="mt-6 text-sm text-slate-600">
      Dica: você pode personalizar os itens editando o array "defaultItems" neste arquivo.
    </div>
  </section>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import ChecklistItem from '../components/ChecklistItem.vue'

const defaultItems = [
  { id: 'agua', label: 'Bebi 2L de água' },
  { id: 'caminhada', label: 'Caminhei 30 minutos' },
  { id: 'sono', label: 'Descansei bem (7-8h)' },
  { id: 'alongamento', label: 'Fiz alongamentos' },
  { id: 'mentais', label: 'Cuidei da minha saúde mental' },
]

const items = defaultItems

const todayKey = computed(() => {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `checklist:${yyyy}-${mm}-${dd}`
})

const todayLabel = computed(() => {
  return todayKey.value.replace('checklist:', '')
})

function load() {
  try {
    const raw = localStorage.getItem(todayKey.value)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

const state = reactive(load())

function save() {
  localStorage.setItem(todayKey.value, JSON.stringify(state))
}

watch(todayKey, () => {
  const loaded = load()
  for (const k of Object.keys(state)) delete state[k]
  Object.assign(state, loaded)
})

function resetDay() {
  localStorage.removeItem(todayKey.value)
  for (const k of Object.keys(state)) delete state[k]
}
</script>

<style scoped>
</style>
