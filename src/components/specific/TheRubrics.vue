<template>
  <v-card>
    <v-toolbar flat>
      <v-text-field hide-details prepend-icon="mdi-magnify" single-line v-model="searchStr">
      </v-text-field>
    </v-toolbar>

    <v-row class="pa-4" justify="space-between">
      <v-col cols="5">
        <v-treeview hoverable rounded activatable :items="items" :search="searchStr" :value="selectedNodes">
        </v-treeview>
      </v-col>
      <v-col cols="2">
        <v-toolbar flat>
          <v-btn icon>
            <v-icon>mdi-plus</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-toolbar>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'TheRubrics',
  components: {},
  data: function () {
    return {
      searchStr: '',
      selectedNodes: [],
      items: [
        {
          id: 1,
          name: 'Applications :',
          children: [
            { id: 2, name: 'Calendar : app' },
            { id: 3, name: 'Chrome : app' },
            { id: 4, name: 'Webstorm : app' },
          ],
        },
        {
          id: 5,
          name: 'Documents :',
          children: [
            {
              id: 6,
              name: 'vuetify :',
              children: [
                {
                  id: 7,
                  name: 'src :',
                  children: [
                    { id: 8, name: 'index : ts' },
                    { id: 9, name: 'bootstrap : ts' },
                  ],
                },
              ],
            },
            {
              id: 10,
              name: 'material2 :',
              children: [
                {
                  id: 11,
                  name: 'src :',
                  children: [
                    { id: 12, name: 'v-btn : ts' },
                    { id: 13, name: 'v-card : ts' },
                    { id: 14, name: 'v-window : ts' },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 15,
          name: 'Downloads :',
          children: [
            { id: 16, name: 'October : pdf' },
            { id: 17, name: 'November : pdf' },
            { id: 18, name: 'Tutorial : html' },
          ],
        },
        {
          id: 19,
          name: 'Videos :',
          children: [
            {
              id: 20,
              name: 'Tutorials :',
              children: [
                { id: 21, name: 'Basic layouts : mp4' },
                { id: 22, name: 'Advanced techniques : mp4' },
                { id: 23, name: 'All about app : dir' },
              ],
            },
            { id: 24, name: 'Intro : mov' },
            { id: 25, name: 'Conference introduction : avi' },
          ],
        },
      ],
    }
  },
  computed: {
    requestRoute: function () {
      return process.env.VUE_APP_HOST + '/api/news/rubrics';
    },
  },
  methods: {
    updateData() {
      this.axios.get(
        this.requestRoute,
      ).then(response => {
        if (response.data?.success) {
          this.items = response?.data?.items;
        } else {
          console.log(response?.data);
        }
      }).catch(error => {
        console.log(error);
      });
    },
  },
  created() {
    // this.updateData();
  },
}

</script>

<style  lang="scss">

</style>
