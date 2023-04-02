<script setup>
import FormResults from '../components/form-results/FormResults.vue'
import FormPreviousResults from '../components/form-results/FormPreviousResults.vue'
</script>

<template>
  <v-container>
    <v-row justify="center"> <FormResults /> </v-row>
    <v-row justify="center"> <FormPreviousResults /> </v-row>
  </v-container>
</template>
