<template>
  <v-card class="mt-6">
    <v-data-table
      :hide-default-footer="true"
      :headers="headers"
      :items="messages"
      :sort-by="'sentAt'"
      :sort-desc="true"
      :item-class="rowBackground"
      @click:row="rowClick"
    >
      <template v-slot:item.sentAt="{ item }">
        <span>{{ item.sentAt | formatDate }}</span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import RestService from '~/common/rest.service'

export default {
  data: () => ({
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Message', value: 'content' },
      { text: 'Date', value: 'sentAt' },
    ],
    messages: [],

    loading: false,
    error: {},
  }),

  mounted() {
    this.getMessages()
  },

  methods: {
    addUserName(item, idx) {
      const id =
        this.$auth.user.sub === item.sourceUserId
          ? item.targetUserId
          : item.sourceUserId
      RestService.getUserName(this.$axios, id).then((res) => {
        this.messages[idx].name = res.data
        this.messages = [...this.messages]
      })
    },

    rowBackground(item) {
      return item.read ? 'message-read' : 'message-unread'
    },

    getMessages() {
      this.loading = true
      RestService.getMessages(this.$axios, this.$auth.user.sub)
        .then((res) => {
          this.messages = res.data
          this.messages.forEach((el, idx) => {
            this.addUserName(el, idx)
          })
          // console.log(this.messages)
        })
        .catch((err) => {
          this.error = err
        })
        .finally(() => {
          this.loading = false
        })
    },

    rowClick(row) {
      const id =
        row.targetUserId === this.$auth.user.sub
          ? row.sourceUserId
          : row.targetUserId
      this.$router.push(`/messages/${id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.message-read {
  // background-color: red;
}
.message-unread {
  background-color: blue;
}
</style>
