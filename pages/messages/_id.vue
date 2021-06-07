<template>
  <v-row justify="center">
    <v-col cols="8">
      <chat :target-id="$route.params.id" />
    </v-col>
  </v-row>
</template>

<script>
import Chat from '~/components/Chat.vue'
export default {
  components: { Chat },
}
</script>
