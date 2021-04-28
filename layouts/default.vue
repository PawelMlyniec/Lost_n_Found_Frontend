<template>
  <v-app dark>
    <v-app-bar dense app>
      <v-btn icon to="/" :ripple="false" depressed class="ml-1 mr-4">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <span>{{ pageName }}</span>
      <v-spacer />
      <!-- <template v-if="!loggedIn"> -->
      <v-btn color="primary" class="mr-3" @click="login()">Login</v-btn>
      <!-- </template> -->
      <!-- <template v-else> -->
      <v-btn color="primary" @click="logout()">Logout</v-btn>
      <!-- </template> -->
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

    // loggedIn() {
    //   return this.$auth.loggedIn
    // },
  },

  methods: {
    login() {
      this.$auth.loginWith('auth0')
    },

    logout() {
      this.$auth.logout()
    },
  },
}
</script>
