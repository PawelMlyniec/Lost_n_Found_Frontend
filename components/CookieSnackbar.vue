<template>
  <v-snackbar
    v-if="accepted !== 'true'"
    v-model="snackbar"
    multi-line
    timeout="-1"
  >
    {{ cookiePolicy }} <a href="/COOKIES.pdf">Cookies policy</a>
    <template #action="{ attrs }">
      <v-btn
        color="primary"
        text
        v-bind="attrs"
        class="mr-2"
        @click="snackbar = false"
      >
        Close
      </v-btn>
      <v-btn color="primary" v-bind="attrs" @click="close">Accept</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    cookiePolicy:
      'This website uses cookies so that we can provide you with the best user experience. See our ',
  }),

  computed: {
    accepted() {
      return localStorage.getItem('cookies_accept')
    },
  },

  mounted() {
    this.snackbar = true
  },

  methods: {
    close() {
      localStorage.setItem('cookies_accept', 'true')
      this.snackbar = false
    },
  },
}
</script>
