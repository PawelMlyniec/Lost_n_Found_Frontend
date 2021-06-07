<template>
  <v-card class="mt-6 py-2 px-2">
    <template v-for="msg in messages">
      <v-row
        :key="msg.textMessageId"
        :justify="msg.sourceUserId === userId ? 'end' : 'start'"
        no-gutters
        class="my-3 mx-3"
      >
        <v-sheet
          :color="msg.sourceUserId === userId ? 'accent' : 'primary'"
          rounded
          class="px-2 py-1"
        >
          <span>{{ msg.content }}</span>
        </v-sheet>
      </v-row>
    </template>
    <new-message @sendMessage="sendMessage" />
  </v-card>
</template>

<script>
import NewMessage from '~/components/NewMessage.vue'
import RestService from '~/common/rest.service'

export default {
  components: { NewMessage },

  props: {
    targetId: { type: String, default: () => '' },
  },

  data: () => ({
    chatData: {},
    messages: [],
    loading: false,
    error: {},
  }),

  computed: {
    userId() {
      return this.$auth.user.sub
    },
  },

  mounted() {
    this.getMessages()
  },

  methods: {
    getMessages() {
      this.loading = true
      RestService.getChatBetweenUsers(
        this.$axios,
        this.$auth.user.sub,
        this.targetId
      )
        .then((res) => {
          this.chatData = res.data
          this.messages = this.chatData.content
          console.log(this.messages)
        })
        .catch((err) => {
          this.error = err
        })
        .finally(() => {
          this.loading = false
        })
    },

    sendMessage(value) {
      RestService.sendMessage(this.$axios, {
        sourceUserId: this.$auth.user.sub,
        targetUserId: this.$route.params.id,
        content: value,
      })
    },
  },
}
</script>
