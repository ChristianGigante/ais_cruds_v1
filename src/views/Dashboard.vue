<template>
  <v-app
    id="inspire"
    :style="`background :linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(${background})`"
  >
    <Nav />
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1 container"
      :search="search"
      id="table"
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
        <v-btn color="primary" @click="populate">Reset</v-btn>
      </template>
    </v-data-table>
  </v-app>
</template>
<script>
import axios from "axios";
import Nav from "../components/Nav.vue";
import swal from "sweetalert";
export default {
  name: "Dashboard",

  components: {
    Nav
  },

  data() {
    return {
      background: require("../assets/bg.jpg"),
      search: "",
      dialog: false,
      headers: [
        {
          text: "Item Name",
          align: "center",
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
        id: "",
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
  created() {
    axios.get("https://source.unsplash.com/user/esteejanssens").then(res => {
      this.background = res.request.responseURL;
    });
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
            priority: datax[counter].priority
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
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this data!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          axios
            .delete("http://localhost:3000/ais/deleteItem/" + item)
            .then(() => {
              swal("Poof! Your data has been deleted!", {
                icon: "success"
              });
            });
          this.desserts.pop(index);
        } else {
          swal("Your data is safe!");
        }
      });
      this.desserts = [];
      this.populate();
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedItem.name == "") {
        alert("Name must be filled with Letters!");
      } else if (this.editedItem.quantity < 1) {
        alert("Quantity Must not be 0 or negative!");
      } else if (this.editedItem.priority < 1 && this.editedItem.priority > 4) {
        alert("Priority must be 1-3!");
      } else {
        if (this.editedIndex > -1) {
          if (
            this.editedItem.name != "" &&
            this.editedItem.quantity != "" &&
            this.editedItem.priority != ""
          ) {
            axios
              .post(
                "http://localhost:3000/ais/updateItem/" + this.editedItem.id,
                this.editedItem
              )
              .then(res => {
                swal({ title: res.data.message, icon: "success" });
                // alert(res.data.message);
              })
              .catch(err => {
                swal({
                  title: "Failed to Update!",
                  text: err,
                  icon: "warning"
                });
              });
            Object.assign(this.desserts[this.editedIndex], this.editedItem); //updateItem
          } else {
            swal({ title: "Failed to Update!", icon: "warning" });
            // this.close();
          }
        } else {
          // this.desserts.push(this.editedItem) //add new Item
          axios
            .post("http://localhost:3000/ais/createItem", this.editedItem)
            .then(() => {
              swal({ title: "Successfully Added!", icon: "success" });
              this.desserts.push(this.editedItem); //add new Item
            })
            .catch(err => {
              swal({ title: "Failed to Update!", text: err, icon: "warning" });
            });
        }
      }
      this.close();
    }
  }
};
</script>
<style  scoped>
#table {
  /* position: absolute; */
  margin-top: 5%;
  margin-bottom: 5%;
  /* margin-left: 12%;
  margin-right: 300px; */
}
#inspire {
  height: 100% !important;
  width: 100% !important;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("https://source.unsplash.com/user/esteejanssens");
  background-size: cover !important  ;
  background-position: top center !important;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
}
</style>