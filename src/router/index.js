import { createRouter, createWebHistory } from 'vue-router'
import Start from '../views/Start.vue'
import Results from '../views/Results.vue'
import Question from '../views/Question.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'form-start',
      component: Start,
    },
    {
      path: '/results',
      name: 'form-results',
      component: Results,
    },
    {
      path: '/question/:step',
      name: 'form-question',
      component: Question,
    },
  ],
})

export default router
