<template>
  <v-row no-gutters justify="center" align="center">
    <v-col cols="4">
      <v-row no-gutters justify="center" class="mt-10">
        <v-btn color="primary" :to="'/lost_item/lost_item_form'"
          >Add Lost post</v-btn
        >
      </v-row>
      <v-row no-gutters justify="center" class="mt-10">
        <v-btn color="primary" :to="'/found_item/found_item_form'"
          >Add Found post</v-btn
        >
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {}
</script>
