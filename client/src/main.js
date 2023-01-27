import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import * as filters from "./filters";
import "@/plugins/apexcharts";

Vue.config.productionTip = false;

// register global filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
