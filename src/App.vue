<template>
  <v-app>
    <v-app-bar app>
      <img alt="Vue logo" src="./assets/logo.png" class="logo" />
      <h3 class="title">My Personal Costs</h3>
    </v-app-bar>
    <v-main>
      <loader
        id="preloader"
        object="#41B883"
        color1="#E46651"
        color2="#00D8FF"
        size="5"
        speed="2"
        bg="#343a40"
        objectbg="#999793"
        opacity="100"
        name="circular"
        v-if="shown === true"
      ></loader>
      <v-container fluid grid-list-md fill-height>
        <v-row>
          <List></List>
          <v-col><DoughnutChart /></v-col></v-row
      ></v-container>
    </v-main>
    <v-footer v-bind="localAttrs" :padless="padless">
      <v-card flat tile width="100%" class="text-center">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import List from "./components/List.vue";
import DoughnutChart from "./components/Doughnut.vue";

export default {
  name: "App",
  components: {
    List,
    DoughnutChart,
  },
  data: () => ({
    icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"],
    items: ["default", "absolute", "fixed"],
    padless: true,
    variant: "default",
    shown: true,
  }),
  computed: {
    localAttrs() {
      const attrs = {};

      if (this.variant === "default") {
        attrs.absolute = false;
        attrs.fixed = false;
      } else {
        attrs[this.variant] = true;
      }
      return attrs;
    },
  },
  mounted() {
    this.$store.dispatch("loadCosts", this.showToggle);
  },

  methods: {
    showToggle() {
      this.shown = false;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-costs {
  width: 600px;
  margin: 30px auto;
  display: flex;
  justify-content: space-evenly;
}
.btn-costs {
  border: 2px solid cadetblue;
  border-radius: 5px;
  padding: 5px;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    background-color: rgb(240, 193, 74);
    color: white;
    border: 2px solid rgb(240, 193, 74);
  }
}

h3 {
  margin: 0;
}

.title {
  margin-left: 10px;
  color: #2c3e50;
}

.logo {
  height: 25px;
}

.container {
  height: 100%;
}

a {
  text-decoration: none;
}
</style>
