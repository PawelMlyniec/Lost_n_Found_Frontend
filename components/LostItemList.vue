<template>
  <v-card class="mt-6">
    <v-form >
       <v-text-field v-model="titlePart" label="Fragment nazwy"></v-text-field>
       <v-text-field v-model="category" label="Kategoria"></v-text-field>
         <v-menu
      ref="menuFrom"
      v-model="menuFrom"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="reportedFrom"
          label="Zgubony od"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        v-model="reportedFrom"
        :max="new Date().toISOString()"
        min="2020-04-18T12:50:17.876Z"
        @change="saveFrom"
      ></v-date-picker>
    </v-menu>
      <v-menu
      ref="menuTo"
      v-model="menuTo"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="reportedTo"
          label="Zgubiony do"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        v-model="reportedTo"
        :max="new Date().toISOString()"
        min="2020-04-18T12:50:17.876Z"
        @change="saveTo"
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
      :hide-default-footer="true"
      :headers="headers"
      :items="lostItems"
      :sort-by="'date'"
      :sort-desc="true"
      @click:row="rowClick"
    >
    </v-data-table>
    <v-row>
    <v-col class="text-left">
    <v-btn v-if="this.currentPage!=0" color="primary" @click.prevent="prevPage()">Poprzednia strona</v-btn>
    </v-col>
    <v-col class="text-right">
    <v-btn v-if="this.lostItems.length ==20" color="primary" @click.prevent="nextPage()">Natępna strona</v-btn>
    </v-col>
    </v-row>
  </v-card>
</template>

<script>
import RestService from '~/common/rest.service'
export default {
  data: () => ({
    headers: [
      { text: 'id', value: 'lostReportId' },
      { text: 'Title', value: 'title' },
      { text: 'Description', value: 'description' },
      { text: 'Category', value: 'category' },
      { text: 'Date', value: 'reportedAt' },
    ],
   reportedFrom: null,
   reportedTo: null,
    lostItems: [],
    titlePart:"",
    category:"",
    menuFrom: false,
    menuTo: false,
    currentPage:0,
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
    
    RestService.getLostItems(this.$axios,0,20, body)
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
    saveTo (date) {
      this.$refs.menuTo.save(date)
    },
    saveFrom (date) {
      this.$refs.menuFrom.save(date)
    },
    nextPage(){
          var body = {
    titleFragment: "",
    reportedFrom: "",
    reportedTo: "",
    category: ""
    }
    this.currentPage=this.currentPage+1
    
    RestService.getLostItems(this.$axios,this.currentPage,20, body)
        .then((res) => {
          this.lostItems = res.data.content
        })
        .catch((err) => {
          this.getError = err
        }) 
  },
      prevPage(){
          var body = {
    titleFragment: "",
    reportedFrom: "",
    reportedTo: "",
    category: ""
    }
    if(this.currentPage-1>=0){
    this.currentPage=this.currentPage-1
    }
    RestService.getLostItems(this.$axios,this.currentPage,20, body)
        .then((res) => {
          this.lostItems = res.data.content
        })
        .catch((err) => {
          this.getError = err
        }) 
  },
    search(){
            var body = {
    titleFragment: "",
    reportedFrom: "",
    reportedTo: "",
    category: ""
    }
    if(this.reportedFrom != null){
    var dateFrom = new Date(this.reportedFrom).toISOString()
    }
    if(this.reportedTo != null){
    var dateTo = new Date(this.reportedTo).toISOString()
    }
    body.titleFragment = this.titlePart
    body.reportedFrom = dateFrom
    body.reportedTo = dateTo
    body.category=this.category
    RestService.getLostItems(this.$axios, 0,20, body)
        .then((res) => {
          this.lostItems = res.data.content
        })
        .catch((err) => {
          this.getError = err
        }) 
    }
  },
}
</script>
