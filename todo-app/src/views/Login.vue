<template>
  <v-container>
    <v-row class="align-center justify-center">
      <v-col cols="12" md="5">
        <v-card class="justify-center py-10">
          <v-card-title class="justify-center">
            <v-avatar size="150">
              <v-img src="@/assets/logo.svg"></v-img>
            </v-avatar>
          </v-card-title>
          <v-form v-model="valid">
            <v-card-text>
              <v-text-field
                outlined
                label="Nome de usuário"
                v-model="usuario.email"
                :rules="usernameRules"
              >
              </v-text-field>
              <v-text-field
                outlined
                label="Senha"
                v-model="usuario.password"
                :rules="senhaRules"
                :append-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
                :type="mostrarSenha ? 'text' : 'password'"
                @click:append="mostrarSenha = !mostrarSenha"
              >
              </v-text-field>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                x-large
                depressed
                color="primary"
                @click="entrar"
                :disabled="!valid"
                >Entrar</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions } from "vuex"
  import { actionTypes, mutationTypes } from "@/constants"

  export default {
    data() {
      return {
        valid: true,
        mostrarSenha: false,
        usuario: {},
        usernameRules: [(v) => !!v || "Informe o usuário"],
        senhaRules: [(v) => !!v || "Informe a senha"]
      }
    },
    methods: {
      ...mapActions([actionTypes.COMUM.EFETUAR_LOGIN]),
      async entrar() {
        try {
          let response = await this.efetuarLogin(this.usuario)
          if (response.status == 200) {
            this.$store.commit(
              mutationTypes.COMUM.SET_USUARIO_LOGADO,
              response.data
            )

            this.$router.push({ name: "Home" })
          }
        } catch (error) {}
      }
    }
  }
</script>
