<template>
  <v-col cols="12" md="6" class="text-center py-16">
    <h1 class="text-h4 font-weight-bold mb-6">Knowledge quiz results</h1>

    <v-table>
      <tbody>
        <tr>
          <td>Number of questions</td>
          <td>
            {{ numberOfQuestions }}
          </td>
        </tr>
        <tr>
          <td>Correct answers</td>
          <td class="text-green">
            {{ correctAnswers ? correctAnswers : '0' }}
          </td>
        </tr>
        <tr>
          <td>Wrong answers</td>
          <td class="text-red">
            {{ wrongAnswers }}
          </td>
        </tr>
        <tr>
          <td>Correct percentage</td>
          <td :class="{ 'text-red': percentSuccess < 50, 'text-green': percentSuccess >= 50 }">
            {{ percentSuccess + '%' }}
          </td>
        </tr>
        <tr>
          <td>Time</td>
          <td>
            {{ quizTime }}
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-btn @click.prevent="startQuiz()" color="blue-darken-1" flat class="mt-4">
      Start new quiz
    </v-btn>
    <p v-if="error" class="text-error mt-4">Something went wrong try starting quiz later.</p>
  </v-col>
</template>
<script>
import { mapStores } from 'pinia'
import useQuestionsStore from '../../stores/questions'
import moment from 'moment'

export default {
  name: 'FormResultsComponent',
  data() {
    return {
      error: false
    }
  },
  computed: {
    ...mapStores(useQuestionsStore),
    wrongAnswers() {
      return this.questionsStore.numberOfQuestions - this.questionsStore.answeredCorrectly
    },
    correctAnswers() {
      return this.questionsStore.answeredCorrectly
    },
    numberOfQuestions() {
      return this.questionsStore.numberOfQuestions
    },
    percentSuccess() {
      const percentage =
        (this.questionsStore.answeredCorrectly / this.questionsStore.numberOfQuestions) * 100
      const duration = this.questionsStore.endTime - this.questionsStore.startTime

      if (duration) {
        if (!localStorage.previousResults) {
          localStorage.previousResults = ''
          this.questionsStore.storedResults.push({ percentage, duration })
          localStorage.setItem('previousResults', JSON.stringify(this.questionsStore.storedResults))
        } else {
          let retrievedResults = localStorage.getItem('previousResults')

          let parsedStorage = JSON.parse(retrievedResults)

          this.questionsStore.storedResults = parsedStorage
          this.questionsStore.storedResults.push({ percentage, duration })
          localStorage.setItem('previousResults', JSON.stringify(this.questionsStore.storedResults))
        }
      }
      return percentage
    },
    quizTime() {
      const duration = moment.duration(this.questionsStore.endTime - this.questionsStore.startTime)

      return duration._data.minutes + ' minutes ' + duration._data.seconds + ' seconds'
    }
  },

  methods: {
    startQuiz() {
      this.error = false
      this.$router.push({ path: '/question/1', query: { newQuiz: true } })
    }
  }
}
</script>
