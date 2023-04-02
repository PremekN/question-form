<template>
  <v-col cols="12" md="6" class="text-center py-16">
    <h1 class="text-h4 font-weight-bold mb-6">Knowledge quiz</h1>
    <v-btn @click.prevent="startQuiz()" color="blue-darken-1" flat> Start new quiz </v-btn>
    <p v-if="error" class="text-error mt-4">Something went wrong try starting quiz later.</p>
  </v-col>
</template>
<script>
import { mapStores } from 'pinia'
import useQuestionsStore from '../../stores/questions'

export default {
  name: 'FormStartComponent',
  data() {
    return {
      error: false
    }
  },
  computed: {
    ...mapStores(useQuestionsStore)
  },
  mounted() {},
  methods: {
    startQuiz() {
      this.error = false
      this.questionsStore.resetData()

      this.questionsStore.startTime = new Date()
      this.questionsStore
        .getQuestions()
        .then((response) => {
          this.$router.push({ path: '/question/1' })
        })
        .catch((error) => {
          console.log(error)
          this.error = true
        })
    }
  }
}
</script>
