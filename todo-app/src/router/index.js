import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import PaginaNaoEncontrada from "../views/PaginaNaoEncontrada.vue"

import LocalStorageManager from "@/utils/LocalStorageManager"
import store from "@/store"
import { actionTypes } from "@/constants"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "*",
    name: "PaginaNaoEncontrada",
    component: PaginaNaoEncontrada,
    meta: {
      requiresAuth: false
    }
  }
]

let router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  const usuario = await LocalStorageManager.getItem()
  
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      if (!usuario || !usuario.token) {
        next({ name: "Login" })
      } else {
        await store.dispatch(actionTypes.COMUM.VERIFICA_TOKEN)
        next()
      }
    } catch (error) {
      await LocalStorageManager.removeItem()
    }
  } else {
    next()
  }
})

export default router
