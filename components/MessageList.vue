<template>
  <v-card class="mt-6">
    <v-data-table
      :hide-default-footer="true"
      :headers="headers"
      :items="messages"
      :sort-by="'date'"
      :sort-desc="true"
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
      { text: 'id', value: 'textMessageId' },
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
    getMessages() {
      this.loading = true
      RestService.getMessages(this.$axios, this.$auth.user.sub)
        .then((res) => {
          this.messages = res.data
          console.log(this.messages)
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
