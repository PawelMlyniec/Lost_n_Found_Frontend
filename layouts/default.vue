<template>
  <v-app dark>
    <v-app-bar dense app>
      <v-btn icon to="/" :ripple="false" depressed class="ml-1 mr-4">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({}),

  computed: {
    pageName() {
      return this.$store.getters.pageName
    },
  },
}
</script>
