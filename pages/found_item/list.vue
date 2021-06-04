<template>
  <v-row justify="center">
    <v-col cols="8">
      <FoundItemList />
    </v-col>
  </v-row>
</template>

<script>
import FoundItemList from '@/components/FoundItemList'

export default {
  components: {
    FoundItemList,
  },
}
</script>
