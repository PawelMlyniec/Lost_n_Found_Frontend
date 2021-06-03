<template>
  <v-card v-if="lostItem !== {}" width="800">
    <v-card-title>{{ lostItem.title }}</v-card-title>
    <v-card-text>
      <v-col>
        <span>Category: {{ lostItem.category }}</span>
        <br />
        <span>Description: {{ lostItem.description }}</span>
        <br />
        <span>Date from: {{ lostItem.dateFrom | formatDate }}</span>
        <br />
        <span>Date to: {{ lostItem.dateTo | formatDate }}</span>
        <br />
        <span>Date to: {{ lostItem.reportedAt | formatDate }}</span>
        <br />
        <span>Tags:</span>
        <span v-for="tag in lostItem.tags" :key="tag"> {{ tag }} / </span>
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
      <v-card-actions>
        <v-btn color="priamry" @click.prevent="contactReporter"
          >Contact reporter</v-btn
        >
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
import RestService from '~/common/rest.service'
export default {
  props: {
    lostItem: { type: Object, default: () => {} },
  },

  computed: {
    isReporter() {
      if (this.$auth.user) {
        return this.lostItem.userId === this.$auth.user.sub
      } else {
        return false
      }
    },
  },

  methods: {
    resolvePost() {
      // TODO: possibly temp
      RestService.resolveLostItem(this.$axios, this.lostItem.lostReportId).then(
        (res) => {
          this.$router.push('/lost_item/resolved_post')
        }
      )
    },

    editPost() {
      this.$router.push(`/lost_item/edit/${this.lostItem.lostReportId}`)
    },

    deletePost() {
      RestService.deleteLostItem(this.$axios, this.lostItem.lostReportId).then(
        (res) => {
          this.$router.push('deleted_post')
        }
      )
    },
  },
}
</script>
