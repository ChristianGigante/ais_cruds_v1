<template>
  <v-card class="container">
    <v-card-title>
      My Inventory
      <Button/>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        prepend-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="desserts" :search="search">
    </v-data-table>
    
  </v-card>
</template>
<script>
import Button from "@/components/Button.vue";
export default {
  components: {
    Button
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: true,
          value: "name"
        },
        { text: "Quantity", value: "quantity" },
        { text: "Priority", value: "priority" }
        // { text: 'Action', value: 'carbs' },
        // { text: 'Protein (g)', value: 'protein' },
        // { text: 'Iron (%)', value: 'iron' },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          quantity: 100,
          priority: 1
        },
        {
          name: "Frozen Yogurt",
          quantity: 100,
          priority: 1
        },
        {
          name: "Frozen Yogurt",
          quantity: 100,
          priority: 1
        },
        {
          name: "Frozen Yogurt",
          quantity: 100,
          priority: 1
        },
        {
          name: "Frozen Yogurt",
          quantity: 100,
          priority: 1
        },
        {
          name: "Frozen Yogurt",
          quantity: 100,
          priority: 1
        },
        {
          name: "Frozen Yogurt",
          quantity: 100,
          priority: 1
        },
        {
          name: "Frozen Yogurt",
          quantity: 100,
          priority: 1
        },
        {
          name: "Frozen Yogurt",
          quantity: 100,
          priority: 1
        },
        {
          name: "Frozen Yogurt",
          quantity: 100,
          priority: 1
        },
        {
          name: "Frozen Yogurt",
          quantity: 100,
          priority: 1
        },
        {
          name: "Frozen Yogurt",
          quantity: 100,
          priority: 1
        },
        {
          name: "Frozen Yogurt",
          quantity: 100,
          priority: 1
        },
        {
          name: "Frozen Yogurt",
          quantity: 100,
          priority: 1
        },
        {
          name: "Frozen Yogurt",
          quantity: 100,
          priority: 1
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>

