<template>
  <v-card>
    <v-card-title>{{ lostItem.title }}</v-card-title>
    <v-card-text></v-card-text>
  </v-card>
</template>

<script>
export default {
  data(){
    return {
      lostItem: {},
      lostItems: [
        {
          id: 1,
          title: 'Dlugopis',
          category: 'Akcesoria biurowe',
          description: 'Zgubiony dlugopis wczoraj',
          location: '1234 Fancy Ave',
          date: '12-25-2019'
        },
        {
          id: 2,
          title: 'Szalik',
          category: 'Odzież',
          description: 'Zgubiony szalik wczoraj',
          location: 'Gdańsk',
          date: '12-25-2019'
        }
      ]
    }
  },
  created() {
    const ID = Number(this.$route.params.id);
    let lostItem = this.lostItems.find(lostItem => lostItem.id === ID);
    this.lostItem = lostItem;
  }
}
</script>

