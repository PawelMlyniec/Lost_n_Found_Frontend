<template>
  <v-col>
    <v-row no-gutters justify="center">
      <v-textarea v-model="message" filled auto-grow rows="1" />
    </v-row>
    <v-row no-gutters justify="center">
      <v-btn v-if="closeable" text @click="close">Close</v-btn>
      <v-spacer />
      <v-btn color="primary" @click="sendMessage">Send</v-btn>
    </v-row>
  </v-col>
</template>

<script>
export default {
  props: {
    closeable: { type: Boolean, default: () => false },
  },

  data: () => ({
    message: '',
  }),

  methods: {
    close() {
      this.$emit('closeNewMsg')
    },

    sendMessage() {
      this.$emit('sendMessage', this.message)
    },
  },
}
</script>
