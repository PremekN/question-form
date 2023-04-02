<template>
  <v-col cols="12" md="6" class="text-center py-16">
    <h2 class="text-h5 font-weight-bold mb-6">Previous results</h2>

    <v-table density="compact">
      <thead>
        <tr>
          <th class="text-center">Place</th>
          <th class="text-center">Correct percentage</th>
          <th class="text-center">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(previousResult, index) in previousResults" :key="index">
          <td>{{ index + 1 + '.' }}</td>
          <td>
            <span
              :class="{
                'text-red': previousResult.percentage < 50,
                'text-green': previousResult.percentage >= 50
              }"
              >{{ previousResult.percentage + '%' }}</span
            >
          </td>
          <td>{{ quizTime(previousResult.duration) }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-col>
</template>
<script>
import { mapStores } from 'pinia'
import useQuestionsStore from '../../stores/questions'
import moment from 'moment'

export default {
  name: 'FormPreviousResultsComponent',
  data() {
    return {
      error: false
    }
  },
  computed: {
    ...mapStores(useQuestionsStore),
    previousResults() {
      return this.questionsStore.sortAndSortResults()
    }
  },

  methods: {
    quizTime(time) {
      const duration = moment.duration(time)

      return duration._data.minutes + ' minutes ' + duration._data.seconds + ' seconds'
    }
  }
}
</script>
