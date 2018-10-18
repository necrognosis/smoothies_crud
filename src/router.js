import Vue from "vue"
import Router from "vue-router"
import Home from "@/views/Home"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "About" */ "@/views/About")
    },
    {
      path: "/add-smoothie",
      name: "AddSmoothie",
      component: () => import(/* webpackChunkName: "AddSmoothie" */ "@/views/AddSmoothie")
    },
    {
      path: "/edit-smoothie/:smoothie_slug",
      name: "EditSmoothie",
      component: () => import(/* webpackChunkName: "EditSmoothie" */ "@/views/EditSmoothie")
    }
  ]
})
