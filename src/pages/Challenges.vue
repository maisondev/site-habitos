<template>
  <section>
    <div class="mb-6">
      <h2 class="text-2xl font-semibold">Desafios de 21 Dias</h2>
      <p class="text-slate-600">Escolha um desafio e acompanhe sua evolução por 21 dias. Mensagens motivacionais por dia.</p>
    </div>

    <div class="flex flex-wrap gap-2 mb-4">
      <button
        v-for="c in challengeKeys"
        :key="c"
        class="px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100"
        :class="{ 'bg-brand-50 text-brand-700 ring-1 ring-brand-200': currentKey===c }"
        @click="selectChallenge(c)"
      >
        {{ titleFor(c) }}
      </button>
    </div>

    <div v-if="loading" class="text-sm text-slate-500">Carregando...</div>
    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <DayCard v-for="(msg, i) in currentMessages" :key="i" :index="i" :message="msg" :done="progress[i]" @toggle="toggleDay(i)" />
      </div>

      <div class="flex items-center gap-3 mt-5">
        <span class="badge">{{ doneCount }} / 21 concluídos</span>
        <button class="text-sm text-slate-500 underline" @click="resetChallenge">Reiniciar desafio</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import DayCard from '../components/DayCard.vue'

const data = ref({})
const loading = ref(true)
const currentKey = ref('agua')

const challengeKeys = computed(() => Object.keys(data.value))

const currentMessages = computed(() => data.value[currentKey.value] || [])
const progressKey = computed(() => `desafio:${currentKey.value}`)

const progress = ref(Array(21).fill(false))

const doneCount = computed(() => progress.value.filter(Boolean).length)

function titleFor(key) {
  switch (key) {
    case 'agua': return 'Beber Água'
    case 'sono': return 'Dormir Cedo'
    case 'acucar': return 'Reduzir Açúcar'
    case 'meditacao': return 'Meditar 5 min'
    default: return key
  }
}

function selectChallenge(key) {
  currentKey.value = key
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(progressKey.value)
    const parsed = raw ? JSON.parse(raw) : Array(21).fill(false)
    progress.value = Array.isArray(parsed) ? parsed.slice(0, 21).concat(Array(21).fill(false)).slice(0, 21) : Array(21).fill(false)
  } catch {
    progress.value = Array(21).fill(false)
  }
}

function saveProgress() {
  localStorage.setItem(progressKey.value, JSON.stringify(progress.value))
}

function toggleDay(index) {
  progress.value[index] = !progress.value[index]
  saveProgress()
}

function resetChallenge() {
  progress.value = Array(21).fill(false)
  saveProgress()
}

watch(progressKey, () => loadProgress(), { immediate: true })
watch(currentMessages, () => {
  // when messages load, ensure progress length is 21
  if (progress.value.length !== 21) {
    progress.value = Array(21).fill(false)
  }
})

onMounted(async () => {
  try {
    const url = `${import.meta.env.BASE_URL}data/desafios.json`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Falha ao carregar desafios.json')
    data.value = await res.json()
    if (!data.value[currentKey.value]) {
      currentKey.value = Object.keys(data.value)[0]
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
</style>
