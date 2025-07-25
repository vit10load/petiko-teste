import { mutationTypes } from "@/constants"
import store from "@/store"
import LocalStorageManager from "@/utils/LocalStorageManager"

class ValidacaoErrosApi extends Error {
  constructor(data, response) {
    super(data?.message || "Erro desconhecido")

    this.name = "ValidacaoErrosApi"
    this.response = response
    this.message = data?.message || "Erro desconhecido"

    // Captura stack para debugar se quiser
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidacaoErrosApi)
    }

    // Executa SEM depender do captureStackTrace
    this.tratarErroNaoAutorizado()
    this.tratarErroValidacao()
    this.tratarErroNaoIdentificado()
  }

  tratarErroNaoAutorizado() {
    if (this.response?.status === 401) {
      store.commit(mutationTypes.ALERTA.EXIBIR_ALERTA, {
        tipo: "error",
        msg: this.message || "Usuário não autenticado!"
      })

      LocalStorageManager.removeItem()
      setTimeout(() => window.location.reload(), 3000)
    }
  }

  tratarErroValidacao() {
    if ([400, 422, 500, 403, 401].includes(this.response?.status)) {
      store.commit(mutationTypes.ALERTA.EXIBIR_ALERTA, {
        tipo: "error",
        msg: this.message
      })
    }
  }

  tratarErroNaoIdentificado() {
    if (!this.response) {
      store.commit(mutationTypes.ALERTA.EXIBIR_ALERTA, {
        tipo: "error",
        msg: "Oops, algo deu errado!"
      })

      LocalStorageManager.removeItem()
      setTimeout(() => window.location.reload(), 3000)
    }
  }
}

export default ValidacaoErrosApi