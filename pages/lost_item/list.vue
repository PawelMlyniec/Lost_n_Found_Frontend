<template>
  <v-row justify="center" align="center">
    <v-col cols="2">
         <LostItemList />
    </v-col>
  </v-row>
</template>

<script>
import LostItemList from '@/components/LostItemList';

export default{
    components: {
    LostItemList
  },
}
</script>
