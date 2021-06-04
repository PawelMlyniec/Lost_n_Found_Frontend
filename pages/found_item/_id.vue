<template>
  <div>
    <template v-if="!loading">
      <v-row justify="center" class="mt-6">
        <found-item :found-item="foundItem" />
      </v-row>
    </template>
        <template v-else>
      <loading-spinner />
    </template>
  </div>
</template>

<script>
import FoundItem from '@/components/FoundItem'
import RestService from '~/common/rest.service'
import LoadingSpinner from '~/components/LoadingSpinner'
export default {
  components: { FoundItem, LoadingSpinner},

  data: () => ({
    foundItem: {},
    deleteError: {},
    resolveError: {},

    getError: {},

    loading: false,
  }),

  mounted() {
    this.$store.dispatch('setPageName', '')

    this.foundItem = {}
    this.getFoundItem()
  },

  methods: {
    getFoundItem() {
      this.loading = true
      RestService.getFoundItem(this.$axios, this.$route.params.id)
        .then((res) => {
          this.foundItem = res.data
          this.loading = false
        })
        .catch((err) => {
          this.getError = err
        })
    },
  },
}
</script>