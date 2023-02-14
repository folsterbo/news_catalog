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
            <v-col cols="9">
                <v-card
                    class="mx-auto"
                    v-for="(item, itemIndex) in this.newsData" :key="itemIndex"
                >

                        <v-card-text>
                            <div>{{item.news_announcement}}</div>
                            <p class="text-h5 text--primary">
                                {{item.news_header}}
                            </p>
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
                                >
                                dsgfdfd
                                </v-btn>
                            </div>
                        </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="2">
                <v-toolbar
                    flat
                >            
                    <v-btn icon @click="createRecord">
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
    name: 'TheNews',
    components: {  },
    data: function () {
        return {
            newsData: [],
            searchStr: '',
            addData: {
                id: 0,
                news_header: 'news_header',
                news_announcement: 'news_announcement',
                news_body: 'news_body',
            },
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
    },
    created() {
        this.updateData();
    },
}

</script>

<style  lang="scss">

</style>
