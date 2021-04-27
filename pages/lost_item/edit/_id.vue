<template>
  <v-row justify="center" align="center">
      <v-card>
        <v-card-title>Formularz edycji ogłoszenia zagubionego przedmiotu</v-card-title>
        <v-card-text>
        <v-form>
        <v-row>
          <v-col cols="12" md="4">
            <v-subheader>Tytuł ogłoszenia</v-subheader>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Tytuł" v-model="title"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-subheader>Wybierz date, lub okres zgubienia </v-subheader>
          </v-col>
          <v-col cols="12" md="6">
            <v-date-picker v-model="selected_dates" range></v-date-picker>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-subheader>Wybierz kategorie zgubionego przedmiotu</v-subheader>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              :items="categories"
              label="Kategoria"
              v-model="category"
            ></v-select>
          </v-col>
        </v-row>
          <v-row>
          <v-col cols="12" md="4">
            <v-subheader
              >Wybierz miasto w którym zgubiono przedmiot</v-subheader
            >
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              :items="cities"
              label="Miasto"
              v-model="selected_city"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-subheader>Opis</v-subheader>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              filled
              name="extra_comment"
              label="opis"
              v-model="description"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-layout justify-center>
          <v-btn color="primary" @click.prevent="update()">Aktualizuj</v-btn>
        </v-layout>
      </v-form>
      </v-card-text>
      </v-card>
      
  </v-row>
</template>
<script>
import axios from 'axios';
export default {
 data(){
    return {
      lostItem: {},
      selected_dates: ['2021-09-10', '2021-09-20'],
      categories: ['Odziez', 'Artykuły biurowe', 'Akcesoria skurzane', 'inne', 'car'],
      cities: ['Warszawa', 'Gdańsk', 'Poznań', 'Kraków'],
      test: "fdfdfdfd",
    selected_city: '',
    category: '',
    entered_email: '',
    entered_phone: '',
    title: '',
    description:'',
    form: {
              title: '',
              description: '',
              category: ''
          }
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
              this.category=this.lostItem.category
              this.description=this.lostItem.description
              this.title = this.lostItem.title
            })
            .catch((err) => {
              // error occured
              this.error = err
            })
      },
      update(){
      this.form.description =  this.description
      this.form.title= this.title
      this.form.category=this.category
    //   axios.post('/lostReportsEdit', this.form)
    //              .then((res) => {
    //                        var odp=res
    //                        this.$router.push({
    //                         path: ""+lostItem.lostReportId,
    //                         })
    //              })
    //              .catch((error) => {
    //                  // error.response.status Check status code
    //              }).finally(() => {
    //                        this.$router.push({
    //                         path: ""+lostItem.lostReportId,
    //                         })
    //              });
      this.$router.push({
        path: "../"+this.lostItem.lostReportId,
      })
    },
      }
}

</script>