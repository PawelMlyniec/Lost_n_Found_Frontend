<template>
  <v-card class="mt-6">
    <v-form >
       <v-text-field v-model="titlePart" label="Fragment nazwy"></v-text-field>
       <v-select label="Kategoria" v-model="category" :items="categories"></v-select>
         <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Zgubony od"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        v-model="date"
        :max="new Date().toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>
      <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Zgubony do"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        v-model="date"
        :max="new Date().toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>
    </v-form>
          <v-card
        class="d-flex justify-center mb-6"
        :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
        flat
        tile
      >
    <v-btn color="primary" @click.prevent="search()">Wyszukaj</v-btn>
          </v-card>
    <v-data-table
      :headers="headers"
      :items="lostItems"
      :sort-by="'date'"
      :sort-desc="true"
      @click:row="rowClick"
    >
    </v-data-table>
  </v-card>
</template>

<script>
import RestService from '~/common/rest.service'
export default {
  data: () => ({
    headers: [
      { text: 'Title', value: 'title' },
      { text: 'Description', value: 'description' },
      { text: 'Category', value: 'category' },
      { text: 'Date', value: 'reportedAt' },
    ],
   date: null,
    lostItems: [],
    titlePart:"",
    category:"",
    menu: false,
    categories:['car', 'Odzież','Akcesoria biurowe']
,
  }),
   watch: {
    form (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },

  mounted() {
    var body = {
    titleFragment: "",
    reportedFrom: "",
    reportedTo: "",
    category: ""
    }
    
    RestService.getLostItems(this.$axios, 0,20, body)
        .then((res) => {
          this.lostItems = res.data.content
        })
        .catch((err) => {
          this.getError = err
        })

 
  },

  methods: {
    rowClick(row) {
      this.$router.push(`/lost_item/${row.id}`)
    },
    save (date) {
      this.$refs.menu.save(date)
    },
    search(){

    }
  },
}
</script>
