<template>
    <v-toolbar flat light>
      <v-toolbar-title>Новостной каталог</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn
          text
          v-for="menuItem in menuItems" :key="menuItem.name"
        >
          <router-link :to=menuItem.url>{{menuItem.title}}</router-link>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
  export default {
    name: 'HeaderComponent',
    data: function () {
        return {
            menuItems: [
                {
                    name: 'rubriki',
                    title: 'Рубрики',
                    url: '/rubriki',
                },
                {
                    name: 'news',
                    title: 'Статьи',
                    url: '/news',
                },
            ],
        }
    },
  }
</script>
