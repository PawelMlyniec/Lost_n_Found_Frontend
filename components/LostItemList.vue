<template>
  <v-card>
    <v-card-title>Lost Item list</v-card-title>
    <div v-for="lostItem in lostItems" :lostItem="lostItem" :key="lostItem.id" class="column is-one-quarter">
        <router-link :to="'/lost_item/' + lostItem.id">
          <LostItem :lostItem="lostItem" />
        </router-link>
      </div>
           <!-- <div v-for="lost_item in lost_items" :lost_item="lost_item" :key="lost_item.id" class="column is-one-quarter">
                <router-link :to="`/lost_item/view/${lost_item.id}`">
                    <LostItem :lost_item="lost_item" />
                </router-link>
            </div>-->
    
  </v-card>
</template>
<script>

  import LostItem from '@/components/LostItem';
  export default {
    components : {
      LostItem
    },
    data () {
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
  }
  }
</script>