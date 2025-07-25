import Vue from "vue"
import Vuex from "vuex"

import alerta from "./alerta"
import todo from "./todo"
import comum from "./comum"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        alerta,
        todo,
        comum
    }
})