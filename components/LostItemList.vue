<template>
  <div>
    <template v-if="!loading">
      <v-card class="mt-6">
        <v-form>
          <v-text-field v-model="titlePart" label="Title"></v-text-field>
          <v-text-field v-model="category" label="Category"></v-text-field>
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
                v-model="reportedFrom"
                label="Lost from"
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
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="reportedTo"
                label="Lost to"
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
          <v-col cols="12" md="6">
            <div class="tag-input">
              <div
                v-for="(tag, index) in tags"
                :key="tag"
                class="tag-input__tag"
              >
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
          </v-col>
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
          :items="lostItems"
          :sort-by="'dateFrom'"
          :sort-desc="true"
          @click:row="rowClick"
        >
          <template v-slot:item.dateFrom="{ item }">
            <span>{{ item.dateFrom | formatDate }}</span>
          </template>
          <template v-slot:item.dateTo="{ item }">
            <span>{{ item.dateTo | formatDate }}</span>
          </template>
        </v-data-table>
        <v-row>
          <v-col class="text-left">
            <v-btn
              v-if="currentPage != 0"
              color="primary"
              @click.prevent="prevPage()"
              >Previous page</v-btn
            >
          </v-col>
          <v-col class="text-right">
            <v-btn
              v-if="lostItems.length == 10"
              color="primary"
              @click.prevent="nextPage()"
              >Next page</v-btn
            >
          </v-col>
        </v-row>
        <br />
      </v-card>
    </template>
    <template v-else>
      <loading-spinner />
    </template>
  </div>
</template>

<script>
import RestService from '~/common/rest.service'
import LoadingSpinner from '~/components/LoadingSpinner'

export default {
  components: { LoadingSpinner },

  data: () => ({
    headers: [
      // { text: 'id', value: 'lostReportId' },
      { text: 'Title', value: 'title' },
      { text: 'Description', value: 'description' },
      { text: 'Category', value: 'category' },
      { text: 'dateFrom', value: 'dateFrom' },
      { text: 'dateTo', value: 'dateTo' },
      { text: 'Tags', value: 'tags' },
      { text: 'City', value: 'city' },
    ],
    reportedFrom: null,
    reportedTo: null,
    lostItems: [],
    titlePart: '',
    category: '',
    menuFrom: false,
    menuTo: false,
    currentPage: 0,
    tags: [],
    city: '',
    loading: false,
  }),

  watch: {
    form(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },

  mounted() {
    this.loading = true
    const body = {
      titleFragment: '',
      reportedFrom: '',
      reportedTo: '',
      category: '',
      tags: [],
      city: '',
    }
    // RestService.getToken(this.$axios).then((res) => {
    // console.log(res)
    RestService.getLostItems(this.$axios, 0, 10, body)
      .then((res) => {
        this.lostItems = res.data.content
      })
      .catch((err) => {
        this.getError = err
      })
      .finally(() => {
        this.loading = false
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
      this.$router.push(`/lost_item/${row.lostReportId}`)
    },
    saveTo(date) {
      this.$refs.menuTo.save(date)
    },
    saveFrom(date) {
      this.$refs.menuFrom.save(date)
    },
    nextPage() {
      let dateFrom, dateTo
      if (this.reportedFrom != null) {
        dateFrom = new Date(this.reportedFrom).toISOString()
      }
      if (this.reportedTo != null) {
        dateTo = new Date(this.reportedTo).toISOString()
      }
      let body = {
        titleFragment: this.titlePart,
        reportedFrom: dateFrom,
        reportedTo: dateTo,
        category: this.category,
        tags: this.tags,
        city: this.city,
      }
      this.currentPage = this.currentPage + 1

      this.loading = true
      RestService.getLostItems(this.$axios, this.currentPage, 10, body)
        .then((res) => {
          this.lostItems = res.data.content
        })
        .catch((err) => {
          this.getError = err
        })
        .finally(() => {
          this.loading = false
        })
    },
    prevPage() {
      let dateFrom, dateTo
      if (this.reportedFrom != null) {
        dateFrom = new Date(this.reportedFrom).toISOString()
      }
      if (this.reportedTo != null) {
        dateTo = new Date(this.reportedTo).toISOString()
      }
      let body = {
        titleFragment: this.titlePart,
        reportedFrom: dateFrom,
        reportedTo: dateTo,
        category: this.category,
        tags: this.tags,
        city: this.city,
      }
      if (this.currentPage - 1 >= 0) {
        this.currentPage = this.currentPage - 1
      }
      this.loading = true
      RestService.getLostItems(this.$axios, this.currentPage, 10, body)
        .then((res) => {
          this.lostItems = res.data.content
        })
        .catch((err) => {
          this.getError = err
        })
        .finally(() => {
          this.loading = false
        })
    },

    search() {
      this.loading = true
      let dateFrom, dateTo
      if (this.reportedFrom != null) {
        dateFrom = new Date(this.reportedFrom).toISOString()
      }
      if (this.reportedTo != null) {
        dateTo = new Date(this.reportedTo).toISOString()
      }
      let body = {
        titleFragment: this.titlePart,
        reportedFrom: dateFrom,
        reportedTo: dateTo,
        category: this.category,
        tags: this.tags,
        city: this.city,
      }
      RestService.getLostItems(this.$axios, 0, 10, body)
        .then((res) => {
          this.lostItems = res.data.content
        })
        .catch((err) => {
          this.getError = err
        })
        .finally(() => {
          this.loading = false
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
