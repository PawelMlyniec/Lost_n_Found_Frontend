<template>
  <v-app dark>
    <v-app-bar dense app>
      <v-row no-gutters>
        <v-col cols="3" align-self="center">
          <v-row align="center">
            <v-btn icon to="/" :ripple="false" depressed class="ml-1 mr-4">
              <v-icon>mdi-home</v-icon>
            </v-btn>

            <span>{{ pageName }}</span>
          </v-row>
        </v-col>
        <v-col cols="6" align-self="center">
          <v-row no-gutters justify="center" align="center">
            <template v-if="loginStatus">
              <v-btn color="primary" class="mr-4" :to="'/new'">Add post</v-btn>
            </template>
            <v-btn text :to="'/found_item/list'" :ripple="false" class="mr-4"
              >Found</v-btn
            >
            <v-btn text :to="'/lost_item/list'" :ripple="false">Lost</v-btn>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-row justify="end" align="center" no-gutters>
            <template v-if="!loginStatus">
              <v-btn color="primary" @click="login">Login</v-btn>
            </template>
            <template v-else>
              <v-btn icon :to="'/messages'" :ripple="false" class="mr-4">
                <v-badge
                  :content="unreadCount"
                  :value="unreadCount"
                  color="primary"
                  overlap
                >
                  <v-icon>mdi-forum</v-icon>
                </v-badge>
              </v-btn>
              <v-btn color="primary" @click="logout">Logout</v-btn>
            </template>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
    <cookie-snackbar />
    <v-footer color="primary lighten-1" padless>
      <v-row justify="center" no-gutters>
        <v-col cols="2">
          <v-row
            no-gutters
            align="center"
            class="py-4 px-4 text-center white--text"
          >
            <strong>Lost&Found</strong>
          </v-row>
        </v-col>
        <v-col cols="8">
          <v-row no-gutters justify="center" align="center" class="flex-grow-1">
            <v-btn color="white" text rounded class="my-2" href="/contact">
              Contact
            </v-btn>
            <v-btn
              color="white"
              text
              rounded
              class="my-2"
              href="/RODO.pdf"
              download=""
            >
              RODO Politics
            </v-btn>
            <v-btn
              color="white"
              text
              rounded
              class="my-2"
              href="/COOKIES.pdf"
              download=""
            >
              Cookies Politics
            </v-btn>
          </v-row>
        </v-col>
        <v-col cols="2"> </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import CookieSnackbar from '~/components/CookieSnackbar.vue'
import RestService from '~/common/rest.service.js'
export default {
  components: { CookieSnackbar },

  data: () => ({
    loginStatus: false,
    unreadCount: 0,
  }),

  computed: {
    pageName() {
      return this.$store.getters.pageName
    },
  },

  mounted() {
    this.loggedIn()
  },

  methods: {
    loggedIn() {
      setTimeout(() => {
        this.loginStatus = this.$auth.isAuthenticated
        if (this.loginStatus) {
          this.getUnreadCount()
        }
      }, 500)
    },

    getUnreadCount() {
      RestService.getMessageUnreadCount(this.$axios, this.$auth.user.sub).then(
        (res) => {
          this.unreadCount = res.data
        }
      )
    },

    login() {
      this.$auth.login()
    },

    logout() {
      this.$auth.logout()
    },
  },
}
</script>

<style scoped>
v-btn {
  color: white;
  background-color: transparent;
  text-decoration: none;
}
</style>
