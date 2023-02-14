<template>
    <v-card>
        <v-toolbar
            flat
        >
            <v-text-field
                hide-details
                prepend-icon="mdi-magnify"
                single-line
                v-model="searchStr"
            >
            </v-text-field>
        </v-toolbar>

        <v-row
            class="pa-4"
            justify="space-between"
        >
            <v-col cols="7">
                <v-card
                    class="mx-auto"
                    v-for="(item, itemIndex) in this.newsData" :key="itemIndex"
                >
                    <v-toolbar flat>
                        <v-toolbar-title>{{item.news_header}}</v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-btn icon>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>

                        <v-btn
                            icon
                            @click="setDeleteAlrticle(item.id)"
                        >
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <div>{{item.news_announcement}}</div>
                    </v-card-text>
                    <v-card-actions>
                        <div>
                            <v-chip-group
                                active-class="primary--text"
                                column
                            >
                                <v-chip
                                    v-for="tag in item.rubrics"
                                    :key="tag.id"
                                    color="#ebe6f2"
                                >
                                    {{ tag.rubric_name }}
                                </v-chip>
                            </v-chip-group>
                        </div>

                        <div>
                            <v-btn
                                color="green"
                                small
                                text
                                @click="setViewAlrticle(item.id)"
                            >
                                Просмотр
                            </v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-toolbar
                    flat
                >            
                    <v-btn text @click="createRecord">
                        Добавить новость
                    </v-btn>
                </v-toolbar>
            </v-col>
        </v-row>
        <news-modal-set
            @modal-close-btn-clicked="closeModal"
            @modal-delete-btn-clicked="deleteAlrticle"
            :is-modal-visible="isModalVisible"
            :mode.sync="modalMode"
            :id="lastClickedArticleId"
        ></news-modal-set>
    </v-card>
</template>

<script>

import NewsModalSet from './News/NewsModalSet.vue'

export default {
    name: 'TheNews',
    components: { NewsModalSet },
    data: function () {
        return {
            newsData: [],
            searchStr: '',
            addData: {
                id: 0,
                news_header: 'заголовок',
                news_announcement: 'анонс',
                news_body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum quod ratione velit, nam commodi libero beatae sapiente impedit modi dolores doloremque earum deleniti quis veritatis adipisci consectetur accusamus labore nihil.',
            },
            lastClickedArticleId: 0,
            isModalVisible: false,
            modalMode: 'view',
        }
    },
    computed: {
        requestRoute: function () {
            return 'http://localhost/api/news/';
        },
    },
    methods: {
        updateData() {
            this.axios.get(
                this.requestRoute,
            ).then(response => {
                if (response.data?.success) {
                    this.newsData = response?.data?.items;
                } else {
                    console.log(response?.data);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        createRecord() {
            const url  = this.requestRoute;
            const data = this.addData;

            this.axios.post(url,
                { data },
            ).then(response => {
                if (response.data?.success) {
                    this.$emit('modal-create-record-success', response?.data?.payload);
                } else {
                    console.log(response?.data);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        setViewAlrticle(id) {
            this.lastClickedArticleId = id;
            this.modalMode      = 'view';
            this.isModalVisible = true;
        },
        setDeleteAlrticle(id) {
            this.lastClickedArticleId = id;
            this.modalMode      = 'delete';
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        deleteAlrticle() {
            this.isModalVisible = false;
            this.updateData();
        },
    },
    created() {
        this.updateData();
    },
}

</script>

<style  lang="scss">

</style>
