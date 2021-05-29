<template>
  <v-row justify="center" align="center">
    <v-card>
      <v-card-title
        >Formularz edycji ogłoszenia zagubionego przedmiotu</v-card-title
      >
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" md="4">
              <v-subheader>Listing title</v-subheader>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="title"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-subheader>Date or time period</v-subheader>
            </v-col>
            <v-col cols="12" md="6">
              <v-date-picker v-model="selected_dates" range></v-date-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-subheader>Item category</v-subheader>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="category"
                :items="categories"
                label="Category"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-subheader>City in which you lost the item</v-subheader>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="selected_city"
                :items="cities"
                label="City"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-subheader>Description</v-subheader>
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea
                v-model="description"
                filled
                name="extra_comment"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-layout justify-center>
            <v-btn color="primary" @click.prevent="update()">Update</v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-row>
</template>
<script>
import RestService from '~/common/rest.service'

export default {
  data() {
    return {
      lostItem: {},
      selected_dates: ['2021-09-10', '2021-09-20'],
      categories: [
        'Clothes',
        'Office supplies',
        'Accessories',
        'Cars',
        'Other',
      ],
      cities: ['Warszawa', 'Gdańsk', 'Poznań', 'Kraków'],
      selected_city: '',
      category: '',
      entered_email: '',
      entered_phone: '',
      title: '',
      description: '',
      form: {
        title: '',
        description: '',
        category: '',
      },
    }
  },
  mounted() {
    this.getPost()
  },
  methods: {
    getPost() {
      RestService.getLostItem(this.$axios, this.$route.params.id)
        .then((res) => {
          this.lostItem = res.data
          this.category = this.lostItem.category
          this.description = this.lostItem.description
          this.title = this.lostItem.title
        })
        .catch((err) => {
          // error occured
          this.error = err
        })
    },
    update() {
      this.form.description = this.description
      this.form.title = this.title
      this.form.category = this.category

      RestService.updateLostItem(this.$axios, this.$route.params.id, this.form)
        .then((res) => {
          this.$router.push({
            path: '' + this.lostItem.lostReportId,
          })
        })
        .catch((error) => {
          // error.response.status Check status code
        })
        .finally(() => {
          this.$router.push({
            path: '' + this.$route.params.id,
          })
        })
    },
  },
}
</script>
