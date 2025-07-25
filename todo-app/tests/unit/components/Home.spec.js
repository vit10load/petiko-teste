import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import Home from "../../../src/views/Home.vue";
import actionTypes from "@/constants/actionTypes";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Teste Gerenciar tarefas", () => {
  let wrapper;
  let actionsStore;
  let store;
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify({
      icons: {
        iconfont: "mdi",
      },
    });

    actionsStore = {
      [actionTypes.TODO.BUSCAR_TODOS]: jest.fn().mockResolvedValue({
        data: {
          data: [
            {
              id: 1,
              title: "Tarefa Teste",
              completed: false,
              data_vencimento: "2025-07-25",
            },
          ],
          last_page: 1,
        },
      }),
    };

    store = new Vuex.Store({
      modules: {
        comum: {
          namespaced: true,
          state: {
            comum: {
              usuarioLogado: { id: 1, name: "Admin", is_admin: true },
            },
          },
        },
        todo: {
          namespaced: true,
          state: { tarefas: [] },
          actions: actionsStore,
        },
      },
    });
  });

  it("componente Home monta corretamente", () => {
    wrapper = shallowMount(Home, {
      localVue,
      store,
      vuetify,
      attachTo: document.body,
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("carrega tarefas ao montar", async () => {
    wrapper = shallowMount(Home, {
      localVue,
      store,
      vuetify,
    });

    await flushPromises();
    await wrapper.vm.$nextTick();

    expect(actionsStore[actionTypes.TODO.BUSCAR_TODOS]).toHaveBeenCalled();

    expect(wrapper.vm.tarefas).toHaveLength(1);
    expect(wrapper.vm.tarefas[0].title).toBe("Tarefa Teste");
  });

  it("cria uma nova tarefa com sucesso", async () => {
    const mockTarefa = {
      id: 2,
      title: "Nova Tarefa",
      completed: false,
      data_vencimento: "2025-07-26",
    };

    store.hotUpdate({
      modules: {
        todo: {
          namespaced: true,
          actions: {
            ...actionsStore,
            [actionTypes.TODO.CADASTRAR_TODO]: jest
              .fn()
              .mockResolvedValue({ data: mockTarefa }),
          },
        },
      },
    });

    wrapper = shallowMount(Home, {
      localVue,
      store,
      vuetify,
    });

    wrapper.setData({
      tarefa: {
        title: "Nova Tarefa",
        completed: false,
        data_vencimento: "2025-07-26",
      },
    });

    await wrapper.vm.criarTarefa();

    expect(wrapper.vm.tarefas).toContainEqual(mockTarefa);
  });

  it("atualiza uma tarefa existente com sucesso", async () => {
    const tarefaEditada = {
      id: 1,
      title: "Tarefa Atualizada",
      completed: true,
      data_vencimento: "2025-07-27",
    };

    store.hotUpdate({
      modules: {
        todo: {
          namespaced: true,
          actions: {
            ...actionsStore,
            [actionTypes.TODO.ATUALIZAR_TODO]: jest
              .fn()
              .mockResolvedValue({ data: tarefaEditada }),
          },
        },
      },
    });

    wrapper = shallowMount(Home, {
      localVue,
      store,
      vuetify,
    });

    wrapper.setData({ tarefa: tarefaEditada });

    await wrapper.vm.editarTarefa();

    // Como a atualização não modifica o array diretamente, não há push
    expect(wrapper.vm.tarefa.title).toBe("Tarefa Atualizada");
  });

  it("exclui uma tarefa com sucesso", async () => {
    const mockRemoverTodo = jest.fn().mockResolvedValue();

    store.hotUpdate({
      modules: {
        todo: {
          namespaced: true,
          actions: {
            ...actionsStore,
            [actionTypes.TODO.REMOVER_TODO]: mockRemoverTodo,
          },
        },
      },
    });

    wrapper = shallowMount(Home, {
      localVue,
      store,
      vuetify,
    });

    wrapper.setData({
      tarefaExcluir: { id: 1 },
      confirmDialog: true,
    });

    await wrapper.vm.confirmaExclusao();

    expect(mockRemoverTodo).toHaveBeenCalledWith(expect.any(Object), 1);
    expect(wrapper.vm.confirmDialog).toBe(false);
  });

  it('filtra as tarefas por título', async () => {
    wrapper = shallowMount(Home, {
      localVue,
      store,
      vuetify,
    });
  
    const spy = jest.spyOn(wrapper.vm, 'carregarTarefas');
  
    wrapper.setData({ filtroTitulo: 'Teste' });
    wrapper.vm.filtrar();
  
    await flushPromises();
    expect(wrapper.vm.paginaAtual).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

});
