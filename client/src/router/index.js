import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "PetFinder",
    component: () => import("@/views/PetFinder/index"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
