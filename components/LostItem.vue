<template>
  <v-card>
    <v-card-title>Tytuł: {{ lostItem.title }}</v-card-title>
    <v-card-text>
      <v-text-field>
      Kategoria: {{lostItem.category}}
      </v-text-field>
      <v-text-field>
      Opis: {{lostItem.description}}
      </v-text-field>
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