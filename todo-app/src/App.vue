<template>
  <core-view v-if="this.$route.meta.requiresAuth === true" />
  <v-app v-else>
    <alerta></alerta>
    <router-view />
  </v-app>
</template>

<script>
  import Alerta from "@/components/Alerta"
  import CoreView from "@/components/CoreView"
  export default {
    name: "App",
    components: {
      Alerta,
      CoreView
    }
  }
</script>
