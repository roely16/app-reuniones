<template>
    <div>
        <v-container fluid>
            
            <v-row class="mt-4">
                <v-col cols="7">

                    <quill-editor
                        class="editor"
                        ref="myQuillEditor"
                        v-model="content"
                        :options="editorOption"
                        
                    />

                </v-col>
                <v-col>
                    <v-row>
                        <v-col cols="12">
                            <v-card outlined>
                                <v-card-title>
                                    <v-row dense>
                                        <v-col>
                                            Vista Previa
                                        </v-col>
                                        <v-col align="end">
                                            <v-btn text>
                                                <v-icon>
                                                    mdi-download
                                                </v-icon>
                                            </v-btn>
                                            <v-btn text>
                                                <v-icon>
                                                    mdi-refresh
                                                </v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-title>
                                <v-card-text>
                                    <iframe src="http://www.pdf995.com/samples/pdf.pdf" width="100%" height="300px">
                                    </iframe>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-card height="260" outlined>
                                <v-card-title>
                                    <v-row dense>
                                        <v-col>
                                            Compartir
                                        </v-col>
                                        <v-col align="end">
                                            <v-btn text>
                                                <v-icon>
                                                    mdi-export-variant
                                                </v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-title>

                                <v-card-text>
                                    <v-autocomplete
                                        v-model="friends"
                                        :disabled="isUpdating"
                                        :items="people"
                                        filled
                                        chips
                                        color="blue-grey lighten-2"
                                        label="Select"
                                        item-text="name"
                                        item-value="name"
                                        multiple
                                    >
                                        <template v-slot:selection="data">
                                            <v-chip
                                            v-bind="data.attrs"
                                            :input-value="data.selected"
                                            close
                                            @click="data.select"
                                            @click:close="remove(data.item)"
                                            >
                                            <v-avatar left>
                                                <v-img :src="data.item.avatar"></v-img>
                                            </v-avatar>
                                            {{ data.item.name }}
                                            </v-chip>
                                        </template>
                                        <template v-slot:item="data">
                                            
                                            <template>
                                                <v-list-item-avatar>
                                                    <img :src="data.item.avatar">
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                                                    <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                                                </v-list-item-content>
                                            </template>
                                        </template>
                                    </v-autocomplete>

                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style scoped>
    .editor{

        height: 605px;

    }
</style>

<script>
    export default {
        
        data () {

            // eslint-disable-next-line no-unused-vars
            const srcs = {
                1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
            }

            return {
                content: null,
                editorOption: {
                // Some Quill options...
                },
                autoUpdate: true,
                friends: ['Sandra Adams', 'Britta Holt'],
                isUpdating: false,
                name: 'Midnight Crew',
                people: [
                    { header: 'Group 1' },
                    { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
                    { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
                    { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
                    { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
                    { divider: true },
                    { header: 'Group 2' },
                    { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
                    { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
                    { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
                    { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
                ],
                title: 'The summer breeze',
            }
        },
        
    }
</script>