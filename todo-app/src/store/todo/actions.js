import axios from "axios"
import { actionTypes } from "@/constants"

export default {
  async [actionTypes.TODO.BUSCAR_TODOS](context, params = {}) {
    const response = await axios.get("api/todos", params)
    return response
  },

  async [actionTypes.TODO.CADASTRAR_TODO](context, tarefa) {
    const response = await axios.post("api/todos", tarefa)
    return response
  },

  async [actionTypes.TODO.ATUALIZAR_TODO](context, tarefa) {
    const response = await axios.put(`api/todos/${tarefa.id}`, tarefa)
    return response
  },

  async [actionTypes.TODO.REMOVER_TODO](context, id) {
    const response = await axios.delete(`api/todos/${id}`)
    return response
  }
}
