<template>
  <v-row justify="center">
    <v-col cols="8">
      <message-list />
    </v-col>
  </v-row>
</template>

<script>
import MessageList from '~/components/MessageList'

export default {
  components: {
    MessageList,
  },
}
</script>
