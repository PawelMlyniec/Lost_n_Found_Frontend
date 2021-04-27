<template>
  <v-card>
    <v-card-title>{{ lostItem.title }}</v-card-title>
    <v-card-text>
      Kategoria: {{lostItem.category}}
      <br/>
      Opis: {{lostItem.description}}
       </v-card-text>
      <v-btn @click.prevent="resolve_post()">>
        Oznacz jako znalezione
      </v-btn>
      <v-btn @click.prevent="edit_post()">>
        Edytuj post
      </v-btn>
   
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return {
      lostItem: {},
    }
  },
  mounted(){
    this.getPost()
  },
  methods: {
      getPost() {
          const Id = this.$route.params.id;
          //RestService.getLostItemSingle(this.$axios,Id)
          this.$axios
          .get('http://localhost:8080/lostReports/'+Id)
            .then((res) => {
              this.lostItem = res.data
            })
            .catch((err) => {
              // error occured
              this.error = err
            })
      },
      resolve_post(){
        axios.post('/lostReports'+this.lostItem.lostReportId+'/resolve')
                 .then((res) => {
                           var odp=res
                           this.$router.push({
                            path: 'resolved_post',
                            })
                 })
                 .catch((error) => {
                     // error.response.status Check status code
                 }).finally(() => {
                           this.$router.push({
                            path: 'resolved_post',
                            })
                 });
      this.$router.push({
        path: 'resolved_post',
      
       })
  },
  edit_post(){
    this.$router.push({
        path: "edit/"+this.lostItem.lostReportId,
      })
  },
  created() {
  }
}
}
</script>

