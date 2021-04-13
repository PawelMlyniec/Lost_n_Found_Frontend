<template>
  <v-card>
    <v-card-title>{{ lost_item.title }}</v-card-title>
    <v-card-text></v-card-text>
  </v-card>
</template>

<script>
export default {
  props:["lost_item"]
};
</script>