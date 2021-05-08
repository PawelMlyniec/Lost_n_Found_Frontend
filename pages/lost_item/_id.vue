<template>
  <v-card>
    <v-card-title>{{ lostItem.title }}</v-card-title>
    <v-card-text>
      Kategoria: {{ lostItem.category }}
      <br />
      Opis: {{ lostItem.description }}
    </v-card-text>
    <v-row>
      <v-col>
        <v-btn @click.prevent="resolve_post()">> Oznacz jako znalezione </v-btn>
      </v-col>
      <v-col>
        <v-btn @click.prevent="edit_post()">> Edytuj post </v-btn>
      </v-col>
      <v-col>
        <v-btn @click.prevent="delete_post()">> Usuń post </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      lostItem: {},
    }
  },
  mounted() {
    this.getPost()
  },
  methods: {
    delete_post() {
      axios.delete(
          'http://34.98.81.177/lostReports/' +
            this.lostItem.lostReportId +
            '/delete'
        )
        .then((res) => {
          var odp = res
          this.$router.push({
            path: 'deleted_post',
          })
        })
        .catch((error) => {
          // error.response.status Check status code
        })
        .finally(() => {
          this.$router.push({
            path: 'deleted_post',
          })
        })
      this.$router.push({
        path: 'deleted_post',
      })
    },
    getPost() {
      const Id = this.$route.params.id
      //RestService.getLostItemSingle(this.$axios,Id)
      this.$axios
        .get('http://34.98.81.177/lostReports/' + Id)
        .then((res) => {
          this.lostItem = res.data
        })
        .catch((err) => {
          // error occured
          this.error = err
        })
    },
    resolve_post() {
      axios
        .post(
          'http://34.98.81.177/lostReports' +
            this.lostItem.lostReportId +
            '/resolve'
        )
        .then((res) => {
          var odp = res
          this.$router.push({
            path: 'resolved_post',
          })
        })
        .catch((error) => {
          // error.response.status Check status code
        })
        .finally(() => {
          this.$router.push({
            path: 'resolved_post',
          })
        })
      this.$router.push({
        path: 'resolved_post',
      })
    },
    edit_post() {
      this.$router.push({
        path: 'edit/' + this.lostItem.lostReportId,
      })
    },
    created() {},
  },
}
</script>

