<template>
  <v-row justify="center" align="center">
    <v-card class="mt-6">
      <template v-if="!loading">
      <v-card-title>Post has been added successfully</v-card-title>

      <v-card-title>Matched found item posts:</v-card-title>
      <v-data-table
      :hide-default-footer="true"
      :headers="headers"
      :items="foundItems"
      :sort-by="'foundDate'"
      :sort-desc="true"
      @click:row="rowClick"
    >
      <template v-slot:item.foundDate="{ item }">
        <span>{{ item.foundDate | formatDate }}</span>
      </template>
    </v-data-table>
    </template>
        <template v-else>
      <loading-spinner />
    </template>
    </v-card>
    

  </v-row>
</template>

<script>
import RestService from '~/common/rest.service'
import LoadingSpinner from '~/components/LoadingSpinner'
export default {
  components: {LoadingSpinner },
  data: () => ({
    headers: [
      // { text: 'id', value: 'lostReportId' },
      { text: 'Title', value: 'title' },
      { text: 'Description', value: 'description' },
      { text: 'Category', value: 'category' },
      { text: 'foundDate', value: 'foundDate' },
      { text: 'City', value: 'city' },
    ],
    foundItems:[],
    lostItem:[],
    loading:false,
  }),
  mounted() {
    this.loading = true
      RestService.getLostItem(this.$axios, this.$route.params.id)
        .then((res) => {
          this.lostItem = res.data
          this.loading = false
        })
        .catch((err) => {
          this.getError = err
        })
    const body = {
        title: this.lostItem.title,
        description: this.lostItem.description,
        category: this.lostItem.category,
        dateFrom: this.lostItem.dateFrom,
        dateTo: this.lostItem.dateTo,
        tags: this.lostItem.tags,
        city: this.lostItem.city,
        telephoneNumber: this.lostItem.telephoneNumber,
        emailAddress: this.lostItem.emailAddress
    }
    // RestService.getToken(this.$axios).then((res) => {
    // console.log(res)
    RestService.getMatchingFoundItems(this.$axios, 0, 20, body)
      .then((res) => {
        this.foundItems = res.data.content
      })
      .catch((err) => {
        this.getError = err
      })
    // })
  },

  methods: {
    
        rowClick(row) {
      console.log('asd', row)
      this.$router.push(`/found_item/${row.id}`)
    },
  }
}
</script>