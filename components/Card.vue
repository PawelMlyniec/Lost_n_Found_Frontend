<template>
  <v-card>
    <v-card-title>Example card</v-card-title>
    <v-card-text>{{ item }}</v-card-text>
  </v-card>
</template>

<script>
import RestService from '~/common/rest.service.js'

export default {
  data: () => ({
    item: 'abc',
    error: {},
  }),

  mounted() {
    this.getItem()
  },

  methods: {
    getItem() {
      RestService.getItem(this.$axios)
        .then((res) => {
          this.item = res.data
        })
        .catch((err) => {
          // error occured
          this.error = err
        })
    },
  },
}
</script>
