<template>
  <v-card v-if="foundItem !== {}" width="800">
    <v-card-title>{{ foundItem.title }}</v-card-title>
    <v-card-text>
      <v-col>
        <span>Category: {{ foundItem.category }}</span>
        <br />
        <span>Description: {{ foundItem.description }}</span>
        <br />
        <span>City: {{ foundItem.city }}</span>
        <br />
        <span>Email: {{ foundItem.emailAddress }}</span>
        <br />
        <span>Phone: {{ foundItem.telephoneNumber }}</span>
        <br />
        <span>Found date: {{ foundItem.foundDate | formatDate }}</span>
        <br />
        <span>Reported at: {{ foundItem.reportedAt | formatDate }}</span>
        <br />
      </v-col>
    </v-card-text>
    <template v-if="isReporter">
      <v-card-actions>
        <v-btn color="green" @click.prevent="resolvePost">Mark as found</v-btn>
        <v-spacer />
        <v-btn @click.prevent="editPost()">Edit post</v-btn>
        <v-btn color="red" @click.prevent="deletePost">Delete post</v-btn>
      </v-card-actions>
    </template>
    <template v-else>
      <template v-if="!writingNewMsg">
        <v-card-actions>
          <v-btn color="primary" @click="writingNewMsg = true"
            >Contact reporter</v-btn
          >
        </v-card-actions>
      </template>
      <template v-else>
        <new-message
          closeable
          @closeNewMsg="writingNewMsg = false"
          @sendMessage="sendMessage"
        />
      </template>
    </template>
  </v-card>
</template>

<script>
import NewMessage from '~/components/NewMessage'
import RestService from '~/common/rest.service'
export default {
  components: { NewMessage },

  props: {
    foundItem: { type: Object, default: () => {} },
  },

  data: () => ({
    writingNewMsg: false,
  }),

  computed: {
    isReporter() {
      if (this.$auth.user) {
        return this.foundItem.userId === this.$auth.user.sub
      } else {
        return false
      }
    },
  },

  methods: {
    resolvePost() {
      RestService.resolveFoundItem(this.$axios, this.foundItem.id).then(
        (res) => {
          this.$router.push('/found_item/resolved_post')
        }
      )
    },

    editPost() {
      this.$router.push(`/found_item/edit/${this.foundItem.id}`)
    },

    deletePost() {
      RestService.deleteFoundItem(this.$axios, this.foundItem.id).then(
        (res) => {
          this.$router.push('deleted_post')
        }
      )
    },

    sendMessage(value) {
      RestService.sendMessage(this.$axios, {
        sourceUserId: this.$auth.user.sub,
        targetUserId: this.foundItem.userId,
        content: value,
      })
        .then((res) => {
          this.writingNewMsg = false
        })
        .catch((err) => {
          this.error = err
        })
    },
  },
}
</script>
