import { mutationTypes } from '@/constants'

export default {
    [mutationTypes.TODOS.BUSCA_TODOS](state, tarefas) {
        state.tarefas = tarefas
    }
}