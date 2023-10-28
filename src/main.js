import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import loader from "vue-ui-preloader";

Vue.config.productionTip = false;
Vue.use(loader);

new Vue({
  store,
  loader,
  vuetify,
  render: h => h(App),
}).$mount("#app");
