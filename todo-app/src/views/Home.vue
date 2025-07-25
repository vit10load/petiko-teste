<template>
  <div>
    <v-container>
      <h3 class="mb-4">Gerenciar Tarefas</h3>

      <v-form v-model="valid">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Título*"
              outlined
              :rules="titleRules"
              v-model="tarefa.title"
              data-testid="input-titulo"
            />
            <v-select
              v-model="tarefa.completed"
              :items="statusOptions"
              label="Status*"
              item-text="text"
              item-value="value"
              outlined
              :rules="statusRules"
            />

            <v-menu
              v-model="menuData"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Data de Vencimento"
                  :value="dataFormatada"
                  readonly
                  outlined
                  :rules="ruleDataObrigatoria"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="tarefa.data_vencimento"
                :max="hoje"
                @input="menuData = false"
                locale="pt-br"
              />
            </v-menu>

            <v-btn
              :disabled="!valid && !this.usuarioLogado.is_admin"
              depressed
              color="primary"
              @click="salvar"
              data-testid="btn-salvar"
              >Salvar</v-btn
            >
            <v-btn depressed color="warning" @click="cancelar" class="mx-2"
              >Cancelar</v-btn
            >
          </v-col>
        </v-row>
      </v-form>

      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-label> Filtrar Por: </v-label>
          <v-text-field
            label="título"
            v-model="filtroTitulo"
            outlined
            clearable
            data-testid="input-filtro"
            @input="filtrar"
          />
        </v-col>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="tarefas"
            :items-per-page="5"
            :loading="loading"
            class="elevation-1"
          >
            <template v-slot:item.completed="{ item }">
              <v-chip :color="item.completed ? 'green' : 'orange'" dark>
                {{ item.completed ? "Completa" : "Pendente" }}
              </v-chip>
            </template>
            <template v-slot:item.data_vencimento="{ item }">
              {{
                item.data_vencimento ? formatarDataTemplate(item.data_vencimento) : "-"
              }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="preparaEdicao(item)">mdi-pencil</v-icon>
              <v-icon small @click="perguntarExclusao(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:no-data> Nenhuma tarefa cadastrada! </template>
          </v-data-table>

          <v-pagination
            v-model="paginaAtual"
            :length="totalPaginas"
            @input="carregarTarefas"
            class="mt-4"
          ></v-pagination>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-dialog v-model="confirmDialog" persistent max-width="390">
          <v-card>
            <v-card-title class="headline"
              >Tem certeza que deseja excluir esta tarefa?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="confirmDialog = false">Não</v-btn>
              <v-btn color="green darken-1" text @click="confirmaExclusao">Sim</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { actionTypes, mutationTypes } from "@/constants";

export default {
  data() {
    return {
      tarefa: { title: "", completed: false, data_vencimento: null },
      tarefas: [],
      tarefaExcluir: {},
      confirmDialog: false,
      valid: true,
      loading: false,
      titleRules: [
        (v) => !!v || "Título obrigatório",
        (v) => (v && v.length >= 3) || "Título deve ter no mínimo 3 caracteres",
      ],
      ruleDataObrigatoria: [(v) => !!v || "Data Obrigatória"],
      statusRules: [(v) => (v !== null && v !== undefined) || "Selecione o status"],
      statusOptions: [
        { text: "Pendente", value: false },
        { text: "Completa", value: true },
      ],
      headers: [
        { text: "ID", value: "id" },
        { text: "Título", value: "title" },
        { text: "Status", value: "completed" },
        { text: "Vencimento", value: "data_vencimento" },
        { text: "Ações", value: "actions", align: "end", sortable: false },
      ],
      filtroTitulo: "",
      paginaAtual: 1,
      totalPaginas: 1,
      menuData: false,
      hoje: new Date().toISOString().slice(0, 10),
    };
  },

  computed: {
    usuarioLogado() {
      return this.$store.state.comum.comum.usuarioLogado;
    },
    dataFormatada() {
      if (!this.tarefa.data_vencimento) return "";
      const [ano, mes, dia] = this.tarefa.data_vencimento.split("-");
      return `${dia}/${mes}/${ano}`;
    },
  },

  methods: {
    ...mapActions("todo", {
      buscarTodos: actionTypes.TODO.BUSCAR_TODOS,
      cadastrarTodo: actionTypes.TODO.CADASTRAR_TODO,
      atualizarTodo: actionTypes.TODO.ATUALIZAR_TODO,
      removerTodo: actionTypes.TODO.REMOVER_TODO,
    }),

    formatarDataTemplate(data) {
      if (!data) return "-";
      const [ano, mes, dia] = data.split("T")[0].split("-");
      return `${dia}/${mes}/${ano}`;
    },

    async salvar() {
      try {
        if (this.tarefa.id) {
          await this.editarTarefa();
        } else {
          await this.criarTarefa();
        }
      } catch (error) {
        this.exibirErro("Erro ao salvar a tarefa.");
      }

      this.carregarTarefas();
      this.cancelar();
    },

    async editarTarefa() {
      const { data } = await this.atualizarTodo(this.tarefa);

      if (data?.id) {
        this.$store.commit(mutationTypes.ALERTA.EXIBIR_ALERTA, {
          tipo: "success",
          msg: "Tarefa atualizada com sucesso",
        });
      } else {
        throw new Error("Falha ao atualizar");
      }
    },

    async criarTarefa() {
      const { data } = await this.cadastrarTodo(this.tarefa);

      if (data?.id) {
        this.tarefas.push(data);

        this.$store.commit(mutationTypes.ALERTA.EXIBIR_ALERTA, {
          tipo: "success",
          msg: "Tarefa cadastrada com sucesso",
        });
      } else {
        throw new Error("Falha ao cadastrar");
      }
    },

    async carregarTarefas() {
      this.loading = true;
      try {
        const response = await this.buscarTodos({
          params: {
            page: this.paginaAtual,
            title: this.filtroTitulo,
          },
        });

        this.tarefas = response.data.data || [];
        this.totalPaginas = response.data.last_page || 1;
      } finally {
        this.loading = false;
      }
    },

    preparaEdicao(tarefa) {
      this.tarefa = { ...tarefa };
    },

    cancelar() {
      this.tarefa = { title: "", completed: false };
    },

    perguntarExclusao(tarefa) {
      this.tarefaExcluir = tarefa;
      this.confirmDialog = true;
    },

    async confirmaExclusao() {
      try {
        this.confirmDialog = false;
        await this.removerTodo(this.tarefaExcluir.id);
        this.carregarTarefas();
        this.$store.commit(mutationTypes.ALERTA.EXIBIR_ALERTA, {
          tipo: "success",
          msg: "Tarefa excluída com sucesso",
        });
      } catch (error) {}
    },

    filtrar() {
      this.paginaAtual = 1;
      this.carregarTarefas();
    },
  },

  mounted() {
    this.carregarTarefas();
  },
};
</script>
