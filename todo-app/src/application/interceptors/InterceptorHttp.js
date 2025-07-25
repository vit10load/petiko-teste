import LocalStorageManager from "@/utils/LocalStorageManager"
import ValidacaoErrosApi from "@/utils/ValidacaoErrosApi"
import Axios from "axios"

class InterceptorHttp {
  async execute() {
    return new Promise((resolve) => {
      this.registrarInterceptors()

      resolve()
    })
  }

  registrarInterceptors() {
    Axios.defaults.baseURL = "http://localhost:8000"
    Axios.interceptors.request.use(this.tratarRequisicao, this.tratarErros)
    Axios.interceptors.response.use(this.tratarResposta, this.tratarErros)
  }

  async tratarRequisicao(request) {
    const usuario = await LocalStorageManager.getItem()

    if (usuario && usuario.token) {
      request.headers.Authorization = `Bearer ${usuario.token}`
    }

    return request
  }

  tratarResposta(resposta) {
    return resposta
  }

  tratarErros(error) {
    const data = error.response?.data || { message: error.message }
    const response = error.response || null
    
    throw new ValidacaoErrosApi(data, response)
  }
  
}

export default new InterceptorHttp()
