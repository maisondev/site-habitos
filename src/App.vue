<template>
  <div>
    <header class="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div class="container-responsive flex items-center justify-between py-4">
        <div class="flex items-center gap-3">
          <span class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">H</span>
          <div>
            <h1 class="text-lg font-semibold">Hábitos Saudáveis</h1>
            <p class="text-xs text-slate-500">Bem-estar no dia a dia</p>
          </div>
        </div>
        <nav class="hidden md:flex items-center gap-2">
          <RouterLink v-for="item in nav" :key="item.to" :to="item.to"
                      class="px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100"
                      :class="{ 'bg-brand-50 text-brand-700 ring-1 ring-brand-200': $route.path===item.to }">
            {{ item.label }}
          </RouterLink>
        </nav>
        <div class="md:hidden">
          <button class="button-primary" @click="mobileOpen = !mobileOpen" aria-label="Abrir menu">
            Menu
          </button>
        </div>
      </div>
      <div v-if="mobileOpen" class="md:hidden border-t border-slate-200 bg-white">
        <div class="container-responsive py-2 flex flex-col">
          <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="px-3 py-3 text-sm hover:bg-slate-50"
                      @click="mobileOpen=false">
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </header>

    <main class="container-responsive py-8">
      <router-view />
    </main>

    <footer class="border-t border-slate-200 py-6 mt-10">
      <div class="container-responsive text-xs text-slate-500">
        Feito com Vue 3 + Vite + TailwindCSS. Atualize os arquivos JSON em public/data para mudar o conteúdo.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mobileOpen = ref(false)
const nav = [
  { to: '/guia', label: 'Guia de Hábitos' },
  { to: '/checklist', label: 'Checklist Diário' },
  { to: '/desafios', label: 'Desafios de 21 Dias' },
  { to: '/recursos', label: 'Recursos da Comunidade' },
]
</script>

<style scoped>
</style>
