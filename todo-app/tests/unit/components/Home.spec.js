import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Home from '../../../src/views/Home.vue';
import actionTypes from '@/constants/actionTypes';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Teste Gerenciar tarefas', () => {
  let wrapper;
  let actionsStore;
  let store;
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify({
      icons: {
        iconfont: 'mdi',
      },
    });

    actionsStore = {
      [actionTypes.TODO.BUSCAR_TODOS]: jest.fn().mockResolvedValue({
        data: {
          data: [{ id: 1, title: 'Tarefa Teste', completed: false, data_vencimento: '2025-07-25' }],
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
              usuarioLogado: { id: 1, name: 'Admin', is_admin: true },
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

  it('componente Home monta corretamente', () => {
    wrapper = shallowMount(Home, {
      localVue,
      store,
      vuetify,
      attachTo: document.body,
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('carrega tarefas ao montar', async () => {
    wrapper = shallowMount(Home, {
      localVue,
      store,
      vuetify,
    });

    await flushPromises(); 
    await wrapper.vm.$nextTick();

    expect(actionsStore[actionTypes.TODO.BUSCAR_TODOS]).toHaveBeenCalled();

    expect(wrapper.vm.tarefas).toHaveLength(1);
    expect(wrapper.vm.tarefas[0].title).toBe('Tarefa Teste');
  });
});
