import { mutationTypes } from "@/constants"
import LocalStorageManager from "@/utils/LocalStorageManager"

export default {
  [mutationTypes.COMUM.SET_USUARIO_LOGADO](state, usuario) {
    LocalStorageManager.setItem(usuario)
    usuario.token = null
    state.comum.usuarioLogado = usuario
  },

  [mutationTypes.COMUM.UPDATE_USUARIO_LOGADO](state, usuario) {
    // LocalStorageManager.updateItem(usuario)
    // usuario.token = null
    console.log(usuario);
    
    state.comum.usuarioLogado = usuario
  }
}
