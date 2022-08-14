import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from 'vue'

import itemPage from "../views/ItemView.vue"



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/data",
      name: "data",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/DataView.vue"),
    },
    {
      path: "/list",
      name: "list",
      component: () => import("../views/ListView.vue"),
    },
    {
      path: "/items/:itemId/details",
      name: "itemPage",
      component: itemPage,
      params: {itemId: {type: Number, required: true}},
      props: 
        route => ({ itemId: route.params.itemId }),
    },
    {
      path: "/new",
      component: () => import("../views/NewItemView.vue")
    }
  ],
});

export default router;
