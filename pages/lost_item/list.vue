<template>
  <v-row justify="center">
    <v-col cols="8">
      <LostItemList />
    </v-col>
  </v-row>
</template>

<script>
import LostItemList from '@/components/LostItemList'

export default {
  components: {
    LostItemList,
  },
}
</script>
