<template>
  <div class="card">
    <div class="flex items-start justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <h3 class="font-semibold">{{ resource.name }}</h3>
          <span class="badge">{{ resource.type }}</span>
        </div>
        <p class="text-sm text-slate-600 mt-1" v-if="resource.address">{{ resource.address }}</p>
        <p class="text-xs text-slate-500" v-if="resource.city">{{ resource.city }}</p>
        <p class="text-xs text-slate-500 mt-1" v-if="resource.hours">Horário: {{ resource.hours }}</p>
        <p class="text-xs text-slate-500" v-if="resource.contact">Contato: {{ resource.contact }}</p>
      </div>
      <div v-if="resource.link">
        <a class="button-primary" :href="resource.link" target="_blank" rel="noopener">Ver mais</a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  resource: { type: Object, required: true }
})
</script>

<style scoped>
</style>
