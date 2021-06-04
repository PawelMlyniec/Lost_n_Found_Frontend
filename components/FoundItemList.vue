<template>
  <v-card class="mt-6">
    <v-form>
      <v-text-field v-model="titlePart" label="Title"></v-text-field>
      <v-text-field v-model="category" label="Category"></v-text-field>
      <v-text-field v-model="city" label="City"></v-text-field>
      <v-menu
        ref="menuFrom"
        v-model="menuFrom"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            v-model="foundDate"
            label="Found date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          ref="picker"
          v-model="foundDate"
          :max="new Date().toISOString()"
          min="2020-04-18T12:50:17.876Z"
          @change="saveFrom"
        ></v-date-picker>
      </v-menu>
      
     <!-- <v-col cols="12" md="6">
        <div class="tag-input">
          <div v-for="(tag, index) in tags" :key="tag" class="tag-input__tag">
            <span @click="removeTag(index)">x</span>
            {{ tag }}
          </div>
          <input
            type="text"
            placeholder="Enter Tags"
            class="tag-input__text"
            @keydown.enter="addTag"
            @keydown.188="addTag"
            @keydown.delete="removeLastTag"
          />
        </div>
      </v-col>-->

      <br />
    </v-form>
    <v-card
      class="d-flex justify-center mb-6"
      :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
      flat
      tile
    >
      <v-btn color="primary" @click.prevent="search()">Search</v-btn>
    </v-card>
    <v-data-table
      :hide-default-footer="true"
      :headers="headers"
      :items="foundItems"
      :sort-by="'dateFrom'"
      :sort-desc="true"
      @click:row="rowClick"
    >
      <template v-slot:item.foundDate="{ item }">
        <span>{{ item.foundDate | formatDate }}</span>
      </template>
    </v-data-table>
    <v-row>
      <v-col class="text-left">
        <v-btn
          v-if="currentPage != 0"
          color="primary"
          @click.prevent="prevPage()"
          >Poprzednia strona</v-btn
        >
      </v-col>
      <v-col class="text-right">
        <v-btn
          v-if="foundItems.length == 10"
          color="primary"
          @click.prevent="nextPage()"
          >Natępna strona</v-btn
        >
      </v-col>
    </v-row>
    <br />
  </v-card>
</template>

<script>
import RestService from '~/common/rest.service'
export default {
  data: () => ({
    headers: [
      // { text: 'id', value: 'lostReportId' },
      { text: 'Title', value: 'title' },
      { text: 'Description', value: 'description' },
      { text: 'Category', value: 'category' },
      { text: 'foundDate', value: 'foundDate' },
      { text: 'City', value: 'city' },
    ],
    foundDate: null,
    foundItems: [],
    titlePart: '',
    category: '',
    menuFrom: false,
    currentPage: 0,
    city: '',
  }),

  watch: {
    form(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },

  mounted() {
    const body = {
      titleFragment: '',
      foundDate: '',
      category: '',
      city: '',
    }
    // RestService.getToken(this.$axios).then((res) => {
    // console.log(res)
    RestService.getFoundItems(this.$axios, 0, 10, body)
      .then((res) => {
        this.foundItems = res.data.content
      })
      .catch((err) => {
        this.getError = err
      })
    // })
  },

  methods: {
    addTag(event) {
      event.preventDefault()
      const val = event.target.value.trim()
      if (val.length > 0) {
        this.tags.push(val)
        event.target.value = ''
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1)
    },

    removeLastTag(event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.tags.length - 1)
      }
    },
    rowClick(row) {
      console.log('asd', row)
      this.$router.push(`/found_item/${row.lostReportId}`)
    },
    saveTo(date) {
      this.$refs.menuTo.save(date)
    },
    saveFrom(date) {
      this.$refs.menuFrom.save(date)
    },
    nextPage() {
      let foundDate
      if (this.foundDate != null) {
        foundDate = new Date(this.foundDate).toISOString()
      }
      let body = {
        titleFragment: this.titlePart,
        foundDate: foundDate,
        category: this.category,
        city: this.city,
      }
      this.currentPage = this.currentPage + 1

      RestService.getFoundItems(this.$axios, this.currentPage, 10, body)
        .then((res) => {
          this.foundItems = res.data.content
        })
        .catch((err) => {
          this.getError = err
        })
    },
    prevPage() {
      let foundDate
      if (this.foundDate != null) {
        foundDate = new Date(this.foundDate).toISOString()
      }
      let body = {
        titleFragment: this.titlePart,
        foundDate: foundDate,
        category: this.category,
        city: this.city,
      }
      if (this.currentPage - 1 >= 0) {
        this.currentPage = this.currentPage - 1
      }
      RestService.getFoundItems(this.$axios, this.currentPage, 10, body)
        .then((res) => {
          this.foundItems = res.data.content
        })
        .catch((err) => {
          this.getError = err
        })
    },

    search() {
      let foundDate
      if (this.foundDate != null) {
        foundDate = new Date(this.foundDate).toISOString()
      }
      let body = {
        titleFragment: this.titlePart,
        foundDate: foundDate,
        category: this.category,
        city: this.city,
      }
      RestService.getFoundItems(this.$axios, 0, 10, body)
        .then((res) => {
          this.foundItems = res.data.content
        })
        .catch((err) => {
          this.getError = err
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.tag-input {
  width: 100%;
  border: 1px solid #eee;
  font-size: 0.9em;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
}

.tag-input__tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #eee;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
  color: black;
}

.tag-input__tag > span {
  cursor: pointer;
  opacity: 0.75;
}

.tag-input__text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
  color: aliceblue;
}

.v-subheader {
  font-size: 25px;
}
</style>