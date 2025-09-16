import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './index.css'
import Guide from './pages/Guide.vue'
import Checklist from './pages/Checklist.vue'
import Challenges from './pages/Challenges.vue'
import Resources from './pages/Resources.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/guia' },
    { path: '/guia', component: Guide, meta: { title: 'Guia de Hábitos' } },
    { path: '/checklist', component: Checklist, meta: { title: 'Checklist Diário' } },
    { path: '/desafios', component: Challenges, meta: { title: 'Desafios de 21 Dias' } },
    { path: '/recursos', component: Resources, meta: { title: 'Recursos da Comunidade' } },
  ],
  scrollBehavior() { return { top: 0 } }
})

router.afterEach((to) => {
  document.title = to.meta?.title ? `${to.meta.title} • Hábitos Saudáveis` : 'Hábitos Saudáveis'
})

createApp(App).use(router).mount('#app')
