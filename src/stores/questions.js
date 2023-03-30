import { defineStore } from 'pinia'
import api from '../plugins/axios'

export default defineStore('questions', {
  state: () => {
    return {
      numberOfQuestions: 4,
      questions: [],
    }
  },

  actions: {
    async getQuestions() {
      this.previousQuery = '';
      try {
        const response = await api.get(`api.php?amount=${this.numberOfQuestions}&type=multiple`)

        this.questions = response.data
        this.resetError()
      } catch (error) {
        console.log(error)
        // this.setError(this.stringGeneralError)
      }
    },
  }
})
