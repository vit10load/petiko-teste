<template>
  <v-navigation-drawer
    app
    color="primary"
    dark
    v-model="drawer"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          PetikoApp
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.to"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: Boolean
  },
  data: () => ({
    items: [
      { title: "Tarefas", icon: "mdi-account-multiple", to: "/" }
    ],
  }),
  
};
</script>