<template>
  <v-app-bar app color="primary" dark dense>
    <v-app-bar-nav-icon @click="alternarMenu"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-btn icon @click="logout">
      <v-icon>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex"
import { actionTypes } from "@/constants"

export default {
  methods: {
    alternarMenu() {
      this.$emit("alternarMenu")
    },
    ...mapActions({
      logoutAction: actionTypes.COMUM.LOGOUT
    }),
    async logout() {
      try {
        await this.logoutAction()
        if (this.$route.name !== "Login") {
          this.$router.push({ name: "Login" })
        }
      } catch (error) {
        console.error("Erro ao fazer logout", error)
      }
    }
  }
}
</script>
