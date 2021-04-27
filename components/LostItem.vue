<template>
  <v-card>
    <v-card-title>Tytuł: {{ lostItem.title }}</v-card-title>
    <v-card-text>
      Kategoria: {{lostItem.category}}
      Opis: {{lostItem.description}}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: [
    'lostItem'
  ]
}
</script>