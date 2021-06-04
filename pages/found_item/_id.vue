<template>
  <div>
    <template v-if="!loading">
      <v-row justify="center" class="mt-6">
        <lost-item :lost-item="lostItem" />
      </v-row>
    </template>
    <template v-else>
      <loading-spinner />
    </template>
  </div>
</template>

<script>
import LostItem from '@/components/LostItem'
import RestService from '~/common/rest.service'
import LoadingSpinner from '~/components/LoadingSpinner'

export default {
  components: { LostItem, LoadingSpinner },

  data: () => ({
    lostItem: {},
    deleteError: {},
    resolveError: {},

    getError: {},

    loading: false,
  }),

  mounted() {
    this.$store.dispatch('setPageName', '')

    this.lostItem = {}
    this.getLostItem()
  },

  methods: {
    getLostItem() {
      this.loading = true
      RestService.getLostItem(this.$axios, this.$route.params.id)
        .then((res) => {
          this.lostItem = res.data
          this.loading = false
        })
        .catch((err) => {
          this.getError = err
        })
    },
  },
}
</script>