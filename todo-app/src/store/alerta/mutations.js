import { mutationTypes } from "./../../constants"

export default {
  [mutationTypes.ALERTA.EXIBIR_ALERTA](state, dados) {
    state.msg = dados.msg
    state.tipo = dados.tipo
    state.mostrar = dados.mostrar

    setTimeout(() => {
      state.msg = ""
      state.mostrar = false
    }, 1500)
  },

  [mutationTypes.ALERTA.FECHAR_ALERTA](state) {
    ;(state.msg = ""), (state.mostrar = false)
  }
}
