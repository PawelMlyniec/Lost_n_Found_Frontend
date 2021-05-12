<template>
  <v-app dark>
    <v-app-bar dense app>
      <v-row no-gutters>
        <v-row align="center">
          <v-btn icon to="/" :ripple="false" depressed class="ml-1 mr-4">
            <v-icon>mdi-home</v-icon>
          </v-btn>

          <span>{{ pageName }}</span>
        </v-row>
        <v-row no-gutters justify="center" align="center">
          <v-btn color="primary" class="mr-3" :to="'/lost_item/lost_item_form'"
            >Add post</v-btn
          >
          <v-btn
            text
            :to="'/found_item/list'"
            :ripple="false"
            disabled
            class="mr-3"
            >Found</v-btn
          >
          <v-btn text :to="'/lost_item/list'" :ripple="false">Lost</v-btn>
        </v-row>
        <v-row justify="end" align="center">
          <template v-if="!loggedIn">
            <v-btn color="primary" class="mr-3" @click="login()">Login</v-btn>
          </template>
          <template v-else>
            <v-btn color="primary" @click="logout()">Logout</v-btn>
          </template>
        </v-row>
      </v-row>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
    <cookie-snackbar />
  </v-app>
</template>

<script>
import CookieSnackbar from '~/components/CookieSnackbar.vue'
export default {
  components: { CookieSnackbar },

  computed: {
    pageName() {
      return this.$store.getters.pageName
    },

    loggedIn() {
      return this.$auth.isAuthenticated()
    },
  },

  mounted() {
    this.$store.dispatch('setPageName', 'Lost items')
  },

  methods: {
    login() {
      this.$auth.login()
    },

    logout() {
      this.$auth.logout({
        returnTo: 'http://localhost:3000/',
      })
    },
  },
}
</script>
