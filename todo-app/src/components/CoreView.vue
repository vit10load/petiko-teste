<template>
  <v-app>
    <barra-do-app @alternarMenu="alternarMenu" />
    <navegacao :drawer="drawer" />
    <v-main>
      <!-- <vue-progress-bar></vue-progress-bar> -->
      <alerta />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  import Alerta from "@/components/Alerta"
  import Navegacao from "@/components/Navegacao"
  import BarraDoApp from "@/components/BarraDoApp"
  export default {
    data() {
      return {
        drawer: false
      }
    },
    components: {
      Alerta,
      Navegacao,
      BarraDoApp
    },
    methods: {
      alternarMenu() {
        this.drawer = !this.drawer
      }
    }
  }
</script>
