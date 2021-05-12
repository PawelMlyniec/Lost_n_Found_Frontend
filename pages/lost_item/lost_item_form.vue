<template>
  <v-card>
    <v-card-title class="headline justify-center mb-1">
      formularz zgłoszenia straty przedmiotu
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12" md="4">
            <v-subheader>Tytuł ogłoszenia</v-subheader>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Tytuł" v-model="entered_title"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-subheader>Dane kontaktowe</v-subheader>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="email" v-model="entered_email"></v-text-field>
            <v-text-field
              label="numer telefonu"
              v-model="entered_phone"
            ></v-text-field>
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
              v-model="selected_category"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-subheader>Dodatkowe tagi</v-subheader>
          </v-col>
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
                placeholder="Wprowadź dodatkowe tagi"
                class="tag-input__text"
                @keydown.enter="addTag"
                @keydown.188="addTag"
                @keydown.delete="removeLastTag"
              />
            </div>
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
            <v-subheader>Dodatkowe uwagi</v-subheader>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              filled
              name="extra_comment"
              label="Dodatkowe uwagi"
              v-model="extra_comment"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-layout justify-center>
          <v-btn color="primary" @click.prevent="publish()">Opublikuj</v-btn>
        </v-layout>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import RestService from '~/common/rest.service'

export default {
  data: () => ({
    selected_dates: ['2021-09-10', '2021-09-20'],
    categories: ['Odziez', 'Artykuły biurowe', 'Akcesoria skurzane', 'inne'],
    cities: ['Warszawa', 'Gdańsk', 'Poznań', 'Kraków'],
    tags: [],
    extra_comment: [],
    selected_city: '',
    selected_category: '',
    entered_email: '',
    entered_phone: '',
    entered_title: '',
  }),
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
    publish() {
      // var comment = this.extra_comment
      // var city = this.selected_city
      // var category = this.selected_category
      // var dates = this.selected_dates
      // var email = this.entered_email
      // var phone = this.entered_phone
      // var title = this.entered_title

      RestService.addLostItemPost(this.$axios, {
        title: this.entered_title,
        description: this.extra_comment,
        category: this.selected_category,
      })
        .then((res) => {
          this.$router.push({
            path: 'form_publish_success',
          })
        })
        .catch((error) => {
          // error.response.status Check status code
        })
        .finally(() => {
          this.$router.push({
            path: 'form_publish_success',
          })
        })
      this.$router.push({
        path: 'form_publish_success',
      })
    },
  },
}
</script>

<style scoped>
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
