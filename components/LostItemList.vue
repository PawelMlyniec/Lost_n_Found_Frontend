<template>
  <v-card class="mt-6">
    <v-data-table
      :headers="headers"
      :items="lostItems"
      :sort-by="'date'"
      :sort-desc="true"
      @click:row="rowClick"
    >
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: 'Title', value: 'title' },
      { text: 'Description', value: 'description' },
      { text: 'Category', value: 'category' },
      { text: 'Location', value: 'location' },
      { text: 'Date', value: 'date' },
    ],
    lostItems: [],
  }),

  mounted() {
    this.lostItems = [
      {
        id: 1,
        title: 'Dlugopis',
        category: 'Akcesoria biurowe',
        description: 'Zgubiony dlugopis wczoraj',
        location: '1234 Fancy Ave',
        date: '12-25-2019',
      },
      {
        id: 2,
        title: 'Szalik',
        category: 'Odzież',
        description: 'Zgubiony szalik wczoraj',
        location: 'Gdańsk',
        date: '12-25-2019',
      },
    ]
  },

  methods: {
    rowClick(row) {
      this.$router.push(`/lost_item/${row.id}`)
    },
  },
}
</script>
