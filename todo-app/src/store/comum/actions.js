import axios from "axios"
import { apiClient, actionTypes, mutationTypes } from "@/constants"

export default {
  async [actionTypes.COMUM.EFETUAR_LOGIN](context, usuario) {
    const response = axios.post(`${apiClient.URL_COMUM.AUTENTICAR}`, usuario)
    return response
  },

  async [actionTypes.COMUM.VERIFICA_TOKEN]({ commit }) {
    const { data } = await axios.get(apiClient.URL_COMUM.VERIFICA_TOKEN)

    if (data) {
      commit(mutationTypes.COMUM.UPDATE_USUARIO_LOGADO, data)
    }
  },

  async [actionTypes.COMUM.LOGOUT]({ commit }) {
    const { data } = await axios.post(apiClient.URL_COMUM.LOGOUT, {})

    if (data) {
      commit(mutationTypes.COMUM.UPDATE_USUARIO_LOGADO, data)
    }
  }
}
