<template>
  <v-row justify="center" align="center">
    <v-card>
      <v-card-title>Edit found item post</v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" md="4">
              <v-subheader>Post title</v-subheader>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="title"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-subheader>found date</v-subheader>
            </v-col>
            <v-col cols="12" md="6">
              <v-date-picker v-model="selected_dates"></v-date-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-subheader>Item category</v-subheader>
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="category" :items="categories"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-subheader>City in which you found the item</v-subheader>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="selected_city"></v-text-field>
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
          <v-row>
            <v-col cols="12" md="4">
              <v-subheader>Contact info</v-subheader>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="email" label="E-mail"></v-text-field>
              <v-text-field v-model="phone" label="Phone number"></v-text-field>
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
          <br /><br /><br />
          <v-layout justify-center>
            <v-btn color="primary" @click.prevent="update()">Update</v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
      <br />
    </v-card>
  </v-row>
</template>
<script>
import RestService from '~/common/rest.service'

export default {
  middleware: ['authGuard'],

  data() {
    return {
      categories: [
        'Clothes',
        'Office supplies',
        'Accessories',
        'Cars',
        'Other',
      ],
      lostItem: {},
      selected_dates: '',
      selected_city: '',
      category: '',
      email: '',
      phone: '',
      title: '',
      description: '',
      form: {
        title: '',
        description: '',
        category: '',
        city: '',
        email: '',
        phone: '',
      },
      tags: [],
    }
  },
  mounted() {
    this.getPost()
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
    getPost() {
      RestService.getFoundItem(this.$axios, this.$route.params.id)
        .then((res) => {
          this.lostItem = res.data
          this.category = this.lostItem.category
          this.description = this.lostItem.description
          this.title = this.lostItem.title
          this.selected_dates[1] = ''
          this.city = this.lostItem.city
          this.email = this.lostItem.emailAddress
          this.phone = this.lostItem.telephoneNumber
          if (res.data.foundDate != '') {
            var date = new Date(res.data.foundDate)
            var year = date.getFullYear()
            var month = date.getMonth() + 1
            var dt = date.getDate()

            if (dt < 10) {
              dt = '0' + dt
            }
            if (month < 10) {
              month = '0' + month
            }
            this.selected_dates = year + '-' + month + '-' + dt
          }
        })
        .catch((err) => {
          // error occured
          this.error = err
        })
    },
    update() {
      let foundDate = ''
      if (this.selected_dates != null) {
        foundDate = new Date(this.selected_dates).toISOString()
      }
      var body = {
        title: this.title,
        description: this.category,
        category: this.description,
        foundDate: foundDate,
        city: this.city,
        emailAddress: this.email,
        telephoneNumber: this.phone,
      }

      RestService.updateFoundItem(this.$axios, this.$route.params.id, body)
        .then((res) => {
          this.$router.push('/lost_item/edited_post')
        })
        .catch((error) => {
          // error.response.status Check status code
        })
        .finally(() => {
          this.$router.push('/lost_item/edited_post')
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
  font-size: 18px;
}
</style>
