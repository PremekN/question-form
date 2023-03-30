<template>
  <v-col cols="12" md="6" lg="4" class="text-center py-16">
    <h1 class="text-h4 font-weight-bold mb-6">Knowledge quiz</h1>
    <p>Question number {{ $route.params.step }} of {{}}</p>
    <v-btn @click.prevent="startQuiz()" color="blue-darken-1" flat> Start new quiz </v-btn>
  </v-col>
</template>
<script>
import { mapStores } from 'pinia'
import useQuestionsStore from '../../stores/questions'

export default {
  name: 'FormQuestionComponent',
  data() {
    return {}
  },
  computed: {
    ...mapStores(useQuestionsStore)
  },
  created() {},
  mounted() {
    console.log(this.$route.params.step)
  },
  methods: {
    startQuiz() {}
  }
}
</script>
