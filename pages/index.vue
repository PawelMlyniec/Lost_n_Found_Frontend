<template>
  <v-row justify="center" align="center">
    <v-col cols="2">
      <card />
    </v-col>
  </v-row>
</template>

<script>
import Card from '~/components/Card.vue'

export default {
  components: {
    Card,
  },

  head: {
    title: 'Welcome',
  },

  mounted() {
    this.$store.dispatch('setPageName', '')
  },
}
</script>
