<template>
  <v-card>
    <v-card-title>{{ lost_item.title }}</v-card-title>
    <v-card-text>
            <div v-for="lost_item in lost_items" :lost_item="lost_item" :key="lost_item.id" class="column is-one-quarter">
                <router-link :to="`/lost_item/view/${lost_item.id}`">
                    <LostItem :lost_item="lost_item" />
                </router-link>
            </div>
    </v-card-text>
  </v-card>
</template>
<script>
import LostItem from "@/components/LostItem";
import RestService from '~/common/rest.service.js'

export default {
  name: "LostItemList",
  components: {
   LostItem
  },
  data() {
    return {
      lost_item: {},
      lost_items: []
    };
  },
  created() {
    this.getLostItemsData(); // NEW - call getEventData() when the instance is created
  },
  // NEW
  methods: {
    async getLostItemsData() {
      // NEW - Use the eventService to call the getEvents() method
      RestService.getLostItems()
      .then(
        (lost_items => {
          this.$set(this, "lost_items", lost_items);
        }).bind(this)
      );
    }
  }
};
</script>
