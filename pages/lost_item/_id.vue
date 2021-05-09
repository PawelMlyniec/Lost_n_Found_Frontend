<template>
  <v-row justify="center" class="mt-6">
    <lost-item :lost-item="lostItem" />
  </v-row>
</template>

<script>
import LostItem from '@/components/LostItem'
import RestService from '~/common/rest.service'

export default {
  components: { LostItem },

  data: () => ({
    lostItem: {},
    deleteError: {},
    resolveError: {},

    getError: {},
  }),

  mounted() {
    this.$store.dispatch('setPageName', '')

    this.lostItem = {
      id: 1,
      title: 'Dlugopis',
      category: 'Akcesoria biurowe',
      description: 'Zgubiony dlugopis wczoraj',
      location: '1234 Fancy Ave',
      date: '12-25-2019',
    }
    this.getLostItem()
  },

  methods: {
    getLostItem() {
      RestService.getLostItem(this.$axios, this.$route.params.id)
        .then((res) => {
          this.lostItem = res.data
        })
        .catch((err) => {
          this.getError = err
        })
    },
  },
}
</script>
