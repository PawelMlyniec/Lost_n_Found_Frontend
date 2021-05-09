<template>
  <v-row justify="center" align="center">
    <v-col cols="2"> </v-col>
  </v-row>
</template>

<script>
export default {
  head: {
    title: 'Welcome',
  },

  mounted() {
    this.$store.dispatch('setPageName', '')
  },
}
</script>
