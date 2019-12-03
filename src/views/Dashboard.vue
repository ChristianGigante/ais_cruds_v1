<template>
  <div>
    <Nav />
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1 container"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>My Inventory</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <!-- search field -->
          <v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            autofocus
          ></v-text-field>
          <v-spacer></v-spacer>
          <!-- dialog card -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" outlined dark class="mb-2" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Item Name" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.quantity "
                        label="Quantity"
                        required
                        type="number"
                        min="1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.priority"
                        label="Priority"
                        required
                        type="number"
                        min="1"
                        max="3"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                    </v-col>-->
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" outlined text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" outlined text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item.id)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import axios from "axios";
import Nav from "../components/Nav.vue";
export default {
  name: "Dashboard",

  components: {
    Nav
  },

  data() {
    return {
      search: "",
      dialog: false,
      headers: [
        {
          text: "Item Name",
          align: "left",
          sortable: true,
          value: "name"
        },
        { text: "Quantity", value: "quantity" },
        { text: "Priority", value: "priority" },
        // { text: 'Carbs (g)', value: 'carbs' },
        // { text: 'Protein (g)', value: 'protein' },
        { text: "Actions", value: "action", sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        quantity: 0,
        priority: 0
        // carbs: 0,
        // protein: 0,
      },
      defaultItem: {
        name: "",
        quantity: 0,
        priority: 0
        // carbs: 0,
        // protein: 0,
      }
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  // created() {
  //   this.populate();
  // },

 mounted() {
    this.populate();
  },

  methods: {
    populate() {
      axios.get("http://localhost:3000/ais/retrieveItems").then(response => {
        // alert(JSON.stringify(response.data.data))
        var datax = response.data.data;
        // this.desserts = datax;
        var counter = 0;
        for (counter; counter < datax.length; counter++) {
          this.desserts.push({
            id: datax[counter]._id,
            name: datax[counter].name,
            quantity: datax[counter].quantity,
            priority: datax[counter].priority,
          });
        }
      });
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      let ans = confirm("Are you sure you want to delete this item?");
      if (ans) {
        axios
          .delete("http://localhost:3000/ais/deleteItem/" + item)
          .then( () => {
            alert("Successfully Deleted!")
          });
        this.desserts.splice(index, 1)
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        // this.desserts.push(this.editedItem) //add new Item
        axios
          .post("http://localhost:3000/ais/createItem", this.editedItem)
          .then(() => {
            this.desserts.push(this.editedItem); //add new Item
          });
      }
      this.close();
    }
  }
};
</script>