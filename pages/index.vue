<template>
  <v-row justify="center" align="center" no-gutters class="mt-16">
    <h1>Lost 'n' Found</h1>
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
