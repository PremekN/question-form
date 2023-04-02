import { defineStore } from 'pinia'
import api from '../plugins/axios'

export default defineStore('questions', {
  state: () => {
    return {
      numberOfQuestions: 4,
      answeredCorrectly: null,
      questions: [],
      questionsStored: [],
      startTime: null,
      endTime: null,
      storedResults: []
    }
  },

  actions: {
    async getQuestions() {
      try {
        const response = await api.get(`api.php?amount=${this.numberOfQuestions}&type=multiple&difficulty=easy`)

        this.questions = response.data.results.map((result) => result)
        this.questionsStored = response.data.results.map((result) => result)
        this.joinAnswers(response.data.results)
      } catch (error) {
        console.log(error)
      }
    },
    joinAnswers(questions) {

      questions.forEach((question, index) => {
        let answers = question.incorrect_answers.map((answer) => answer)

        const randomNumber = this.getRandomInt(answers.length + 1)

        answers.splice(
          randomNumber,
          0,
          question.correct_answer
        )
        this.questions[index].answers = answers
      });
    },
    resetData() {
      this.answeredCorrectly = null
      this.questions = []
      this.questionsStored = []
      this.startTime = null
      this.endTime = null
    },
    startOverResetData() {
      this.questions = this.questionsStored.map((question) => question)
      this.answeredCorrectly = null
      this.startTime = null
      this.endTime = null
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max)
    },
    sortAndSortResults() {
      let storedResults = this.storedResults.map((result) => result)

      let sorted = storedResults.sort((a, b) => a.duration - b.duration)
      sorted.sort((a, b) => b.percentage - a.percentage)
      if (sorted.length > 5) {
        sorted.pop()
      }
      localStorage.setItem('previousResults', JSON.stringify(sorted))
      return sorted
    }
  }
})
