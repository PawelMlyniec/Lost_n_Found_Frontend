<template>
  <v-card>
    <v-card-title class="headline justify-center mb-1">
      Fill in the found item form
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12" md="4">
            <v-subheader>Listing title</v-subheader>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="entered_title"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-subheader>Contact info</v-subheader>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="entered_email" label="E-mail"></v-text-field>
            <v-text-field
              v-model="entered_phone"
              label="Phone number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-subheader>Date when object was found</v-subheader>
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
              v-model="selected_category"
              :items="categories"
              label="Category"
            ></v-select>
          </v-col>
        </v-row>
        <!--<v-row>
          <v-col cols="12" md="4">
            <v-subheader>Additional tags</v-subheader>
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
                placeholder="Additional tags"
                class="tag-input__text"
                @keydown.enter="addTag"
                @keydown.188="addTag"
                @keydown.delete="removeLastTag"
              />
            </div>
          </v-col>
        </v-row>-->
        <v-row>
          <v-col cols="12" md="4">
            <v-subheader>City in which you found the item</v-subheader>
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
              v-model="extra_comment"
              filled
              name="extra_comment"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-checkbox v-model="rodo_checkbox" :label="`I accept RODO policy`">
        </v-checkbox>
        <v-layout justify-center>
          <v-btn
            :disabled="!rodo_checkbox"
            color="primary"
            @click.prevent="publish()"
            >Post</v-btn
          >
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
    categories: ['Clothes', 'Office supplies', 'Accessories', 'Cars', 'Other'],
    cities: ['Warszawa', 'Gdańsk', 'Poznań', 'Kraków'],
    tags: [],
    extra_comment: '',
    selected_city: '',
    selected_category: '',
    entered_email: '',
    entered_phone: '',
    entered_title: '',
    rodo_checkbox: false,
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
      let foundDate = ''
      if (this.selected_dates != null) {
        foundDate = new Date(this.selected_dates[0]).toISOString()
      }
      var body = {
        title: this.entered_title,
        description: this.extra_comment,
        category: this.selected_category,
        foundDate: foundDate,
        telephoneNumber: this.entered_phone,
        emailAddress: this.entered_email,
        city: this.selected_city
      }

      RestService.addFoundItemPost(this.$axios, body)
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
