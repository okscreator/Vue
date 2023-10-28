<template>
  <v-col>
    <v-dialog v-model="dialog" max-width="500px" :retain-focus="false">
      <template class="btn-add" v-slot:activator="{ on, attrs }">
        <v-chip
          class="ma-2"
          link
          v-bind="attrs"
          v-on="on"
          @click="handleDialogBtnClick('food', 1582)"
        >
          FOOD
          <v-icon right> mdi-food </v-icon>
        </v-chip>
        <v-chip
          class="ma-2"
          link
          v-bind="attrs"
          v-on="on"
          @click="handleDialogBtnClick('transport', 245)"
        >
          TRANSPORT
          <v-icon right> mdi-train-car </v-icon>
        </v-chip>
        <v-chip
          class="ma-2"
          link
          v-bind="attrs"
          v-on="on"
          @click="handleDialogBtnClick('entertainment', 1000)"
        >
          ENTERTAINMENT
          <v-icon right> mdi-party-popper </v-icon>
        </v-chip>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.category"
                  label="Category"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.value"
                  label="Value"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.date"
                  label="Date"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="costsList"
      sort-by="#"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My Personal Costs</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template class="btn-add" v-slot:activator="{ on, attrs }">
              <v-btn dark class="mb-2" color="teal" v-bind="attrs" v-on="on">
                ADD NEW +
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.category"
                        label="Category"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.value"
                        label="Value"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.date"
                        label="Date"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-col>
</template>

<script>
export default {
  name: "List",

  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "#",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Date", value: "date" },
      { text: "Category", value: "category" },
      { text: "Value", value: "value" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    costsList: [],
    editedIndex: -1,
    editedItem: {
      category: "",
      value: 0,
      date: new Date().toLocaleDateString(),
    },
    defaultItem: {
      category: "",
      value: 0,
      date: new Date().toLocaleDateString(),
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.costsList = this.$store.subscribe((mutation, state) => {
      this.costsList = this.$store.getters.getCostsList;
    });

    this.initialize();
  },

  methods: {
    initialize() {
      this.$store.dispatch("loadCosts");
      this.costsList = this.$store.getters.getCostsList;
    },

    editItem(item) {
      this.editedIndex = this.costsList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.costsList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.commit("removeCostsList", this.editedItem);
      console.log(this.editedItem);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.$store.commit("editCostsList", {
          id: this.editedItem.id,
          date: this.editedItem.date,
          category: this.editedItem.category.toLowerCase(),
          value: +this.editedItem.value,
        });
      } else {
        this.$store.commit("addCostsList", {
          id: this.$store.getters.getMaxId + 1,
          date: this.editedItem.date,
          category: this.editedItem.category.toLowerCase(),
          value: +this.editedItem.value,
        });
      }
      this.close();
    },
    handleDialogBtnClick(category, value) {
      this.editedItem.category = category;
      this.editedItem.value = value;
      console.log(category);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.costs-list {
  width: 600px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  &__item {
    height: 50px;
    border-bottom: 1px solid #000;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  &__title {
    font-weight: bold;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  &__title span {
    flex-basis: 25%;
    padding: 8px 16px;
    text-align: center;
  }
}

.row {
  flex-basis: 25%;
  padding: 8px 16px;
  text-align: center;
}

.context-menu {
  cursor: pointer;
  text-decoration: none;
}

.dot {
  cursor: pointer;
}

.btn-add {
  background-color: cadetblue;
}

.list-col {
  display: inline-block;
  vertical-align: top;
}
</style>
