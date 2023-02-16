<template>
  <div>
    <v-card>
      <v-toolbar flat>
        <v-text-field hide-details prepend-icon="mdi-magnify" single-line v-model="searchStr">
        </v-text-field>
      </v-toolbar>

      <v-row class="pa-4" justify="space-between">
        <v-col cols="5">
          <div>
            <tree-data-group @item-clicked="transmit" :items-object="itemsObject" :tree-data="itemsObject.dropdownContent"
              :key="updateKey"></tree-data-group>
          </div>
          <v-btn text :class="{ 'active': isActive }" @click="openFormAddParentRubric" color="info">
            Добавить новую рубрику
          </v-btn>
        </v-col>
        <v-col cols="2" class="rubric-form">
          <h5>Редактирование рубрики</h5>
          <v-toolbar flat>
            <h5 v-if="this.currentObject.rubric_name">{{ this.currentObject.rubric_name }}</h5>
            <v-spacer></v-spacer>
            <v-btn icon :class="{ 'active': isActive }" :disabled="!this.currentObject.rubric_name">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn icon :class="{ 'active': isActive }" @click="openFormDeleteChildRubric"
              :disabled="!this.currentObject.rubric_name">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>

            <v-btn icon :class="{ 'active': isActive }" @click="openFormAddChildRubric"
              :disabled="!this.currentObject.rubric_name">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>

          <div v-if="this.isAddFormOpen" class="rubrics-form">
            <v-form>
              <v-container>
                <v-text-field v-model="rubricName" label="Рубрика" required></v-text-field>
              </v-container>
            </v-form>

            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-btn text small @click="cancelForm">
                Отмена
              </v-btn>
              <v-btn text small @click="clearForm">
                Очистить
              </v-btn>
              <v-btn text small @click="addParentRubric">
                Сохранить
              </v-btn>
            </v-toolbar>
          </div>

          <div v-if="this.isAddChildFormOpen" class="rubrics-form">
            <v-form>
              <v-container>
                <v-text-field v-model="rubricChildName" :label="this.currentObject.rubric_name + '/ Рубрика'"
                  required></v-text-field>
              </v-container>
            </v-form>

            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-btn text small @click="cancelForm">
                Отмена
              </v-btn>
              <v-btn text small @click="clearForm">
                Очистить
              </v-btn>
              <v-btn text small @click="addChildRubric">
                Сохранить
              </v-btn>
            </v-toolbar>
          </div>

          <div v-if="this.isDeleteChildFormOpen" class="rubrics-form">
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-btn text small @click="cancelDelete">
                Отмена
              </v-btn>
              <v-btn text small @click="DeleteChildRubric">
                Удалить
              </v-btn>
            </v-toolbar>
          </div>

          <div v-if="isUpdateError" class="error">
            <v-alert colored-border type="error" elevation="2">
              <v-list-item-content>
                <v-list-item-title>{{ errorMsg }}</v-list-item-title>
                <li v-for="error in errors" :key="error.id">{{ error }}</li>
              </v-list-item-content>
            </v-alert>
          </div>

        </v-col>
      </v-row>
    </v-card>
</div>
</template>

<script>

import TreeDataGroup from '../common/TreeDataGroup.vue';

export default {
  name: 'TheRubrics',
  components: { TreeDataGroup },
  data: function () {
    return {
      updateKey: 0,
      searchStr: '',
      rubricsArr: [],
      currentObject: {},
      itemsObject: {
        parentKey: 'rubric_name',
        recursionKey: 'has_child',
        dropdownContent: [],
      },
      isActive: false,
      isModalVisible: false,
      modalMode: 'create',
      isAddFormOpen: false,
      rubricData: {
        rubric_name: '',
      },
      rubricChildData: {
        rubric_name: '',
        parent_id: '',
      },
      errorMsg: '',
      errors: {},
      isUpdateError: false,
      isAddChildFormOpen: false,
      isDeleteChildFormOpen: false,
    }
  },
  computed: {
    requestRoute: function () {
      return process.env.VUE_APP_HOST + '/api/news/rubrics';
    },
    requestDeleteRoute: function () {
      return process.env.VUE_APP_HOST + '/api/news/rubrics/' + this.currentObject.id;
    },
    rubricName: {
      get: function () {
        return this.rubricData?.rubric_name ?? '';
      },
      set: function (newVal) {
        this.rubricData.rubric_name = newVal;
      },
    },
    rubricChildName: {
      get: function () {
        return this.rubricChildData?.rubric_name ?? '';
      },
      set: function (newVal) {
        this.rubricChildData.rubric_name = newVal;
      },
    },
  },
  methods: {
    updateData() {
      this.axios.get(
        this.requestRoute,
      ).then(response => {
        if (response.data?.success) {
          //this.itemsObject.dropdownContent = response?.data?.items;
          this.itemsObject.dropdownContent = [
            {
              id: 1,
              parent_id: null,
              rubric_name: 'Родитель 1',
              has_child: true,
            },
            {
              id: 2,
              parent_id: null,
              rubric_name: 'Родитель 2',
              has_child: true,
            },
            {
              id: 3,
              parent_id: null,
              rubric_name: 'Родитель 3',
              has_child: false,
            },
            {
              id: 4,
              parent_id: null,
              rubric_name: 'Родитель 4',
              has_child: true,
            }
          ]
        } else {
          console.log(response?.data);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    transmit(data) {
      this.currentObject = data;
      this.rubricChildData.parent_id = data.id;
      this.$emit('item-clicked', data);
      this.isActive = true;
    },
    openFormAddParentRubric() {
      this.isAddFormOpen = true;
    },
    openFormAddChildRubric() {
      this.isAddChildFormOpen = true;
    },
    openFormDeleteChildRubric() {
      this.isDeleteChildFormOpen = true;
    },
    addParentRubric() {
      this.isUpdateError = false;
      const url = this.requestRoute;
      const data = this.rubricData;

      this.axios.post(url,
        { data },
      ).then(response => {
        if (response.data?.success) {
          this.isAddFormOpen = false;
          this.updateData();
        } else {
          this.isUpdateError = true;
          this.errorMsg = response?.data.message;
          this.errors = response?.data.errors;
          console.log(response?.data);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    addChildRubric() {
      this.isUpdateError = false;
      const url = this.requestRoute;
      const data = this.rubricChildData;

      this.axios.post(url,
        { data },
      ).then(response => {
        if (response.data?.success) {
          this.isAddChildFormOpen = false;
          this.updateData();
        } else {
          this.isUpdateError = true;
          this.errorMsg = response?.data.message;
          this.errors = response?.data.errors;
          console.log(response?.data);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    DeleteChildRubric() {
      this.axios.delete(
        this.requestDeleteRoute,
      ).then(response => {
        if (response.data?.success) {
          this.isDeleteChildFormOpen = false;
          this.updateData();
        } else {
          this.isUpdateError = true;
          this.errorMsg = response?.data.message;
          this.errors = response?.data.errors;
          console.log(response?.data);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    clearForm() {
      this.isUpdateError = false;
      this.rubricName = '';
    },
    cancelForm() {
      this.isUpdateError = false;
      this.rubricName = '';
      this.isAddFormOpen = false;
    },
    cancelDelete() {
      this.isUpdateError = false;
      this.isDeleteChildFormOpen = false;
    },
  },
  created() {
    this.updateData();
  },
}

</script>

<style  lang="scss" scoped>
.v-btn.active {
  color: blue;
}

h5 {
  margin: 0;
  margin-right: 12px;
  display: flex;
  justify-content: end;
}

.rubrics-form,
.error,
.v-toolbar__content {
  width: 400px;
}
</style>
