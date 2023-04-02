<template>
  <v-col cols="12" md="6" class="text-center py-16">
    <h1 class="text-h4 font-weight-bold mb-6">Knowledge quiz</h1>
    <p class="mb-3">
      Question number {{ $route.params.step }} of {{ questionsStore.numberOfQuestions }}
    </p>

    <v-form @submit.prevent="nextQuestion()">
      <p class="text-h6"><strong>Question:</strong> <span v-html="question"></span></p>
      <v-card elevation="0" max-width="350" outlined class="mx-auto">
        <v-card-text>
          <v-radio-group
            v-model="selectedAnswer"
            class="text-left"
            @update="answerSelected($event)"
            :disabled="selectedAnswer !== ''"
          >
            <template v-for="answer in answers">
              <v-radio
                :value="answer"
                color="blue-darken-1"
                :class="{
                  'text-red': selectedAnswer && answer !== correctAnswer,
                  'text-green': selectedAnswer && answer === correctAnswer
                }"
              >
                <template #label><span v-html="answer"></span></template>
              </v-radio>
            </template>
          </v-radio-group>
        </v-card-text>
      </v-card>

      <v-btn
        v-if="!firstQuestion"
        color="red-darken-1"
        flat
        @click.prevent="startOver()"
        class="ma-2"
      >
        Start over
      </v-btn>
      <v-btn type="submit" color="blue-darken-1" flat :disabled="!selectedAnswer" class="ma-2">
        {{ lastQuestion ? 'End Quiz' : 'Next question' }}
      </v-btn>
    </v-form>
  </v-col>
</template>
<script>
import { mapStores } from 'pinia'
import useQuestionsStore from '../../stores/questions'

export default {
  name: 'FormQuestionComponent',
  data() {
    return {
      selectedAnswer: '',
      answered: false,
      randomNumber: null
    }
  },
  computed: {
    questionNumber() {
      return this.$route.params.step - 1
    },
    ...mapStores(useQuestionsStore),
    answers() {
      if (this.questionsStore.questions.length) {
        return this.questionsStore.questions[this.randomNumber]?.answers
      } else {
        return []
      }
    },
    correctAnswer() {
      if (this.questionsStore.questions.length) {
        return this.questionsStore.questions[this.randomNumber]?.correct_answer
      } else {
        return ''
      }
    },

    question() {
      if (this.questionsStore.questions.length) {
        return this.questionsStore.questions[this.randomNumber]?.question
      } else {
        return ''
      }
    },
    firstQuestion() {
      return Number(this.$route.params.step) === 1
    },
    lastQuestion() {
      return Number(this.$route.params.step) === this.questionsStore.numberOfQuestions
    }
  },
  watch: {
    '$route.params.step': function () {
      this.selectedAnswer = ''
      this.randomNumber = this.getRandomInt(this.questionsStore.questions.length)
    }
  },

  created() {
    this.randomNumber = this.getRandomInt(this.questionsStore.questions.length)
    this.checkQuestions()
  },
  methods: {
    startOver() {
      this.questionsStore.startOverResetData()
      this.questionsStore.startTime = new Date()
      this.$router.push({ path: '/question/1' })
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max)
    },
    shuffleQuestions(questions) {
      questions.sort(function (a, b) {
        return getRandomInt(questions.length) - getRandomInt(questions.length)
      })
    },
    checkQuestions() {
      if (!this.questionsStore.questions.length && this.$route.query.newQuiz === 'true') {
        this.questionsStore.resetData()
        this.questionsStore.startTime = new Date()
        this.questionsStore
          .getQuestions()
          .then((response) => {})
          .catch((error) => {
            console.log(error)
            this.error = true
          })
      } else if (!this.questionsStore.questions.length) {
        this.$router.push({ path: '/' })
      }
    },
    answerSelected(event) {
      console.log(event)
    },
    nextQuestion() {
      if (this.selectedAnswer === this.correctAnswer) {
        this.questionsStore.answeredCorrectly++
      }
      this.questionsStore.questions.splice(this.randomNumber, 1)
      if (this.lastQuestion) {
        this.questionsStore.endTime = new Date()
        this.$router.push({ path: `/results` })
      } else {
        this.$router.push({ path: `/question/${Number(this.$route.params.step) + 1}` })
      }
    }
  }
}
</script>
