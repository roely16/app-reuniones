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
                                            
                                            <v-btn :loading="loading_preview" :disabled="loading_preview" @click="recargar_vistaprevia()" text>
                                                <v-icon>
                                                    mdi-refresh
                                                </v-icon>
                                            </v-btn>
                                            
                                        </v-col>
                                    </v-row>
                                </v-card-title>
                                <v-card-text>
                                    <iframe v-if="!loading_preview" :src="pdf_vistaprevia" width="100%" height="300px">
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
                                        v-model="personas_enviar"
                                        :disabled="isUpdating"
                                        :items="personas"
                                        filled
                                        chips
                                        color="blue-grey lighten-2"
                                        label="Personas"
                                        item-text="nombre"
                                        item-value="id"
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
                                                <v-img :src="data.item.avatar ? data.item.avatar : 'avatar/user.png'"></v-img>
                                            </v-avatar>
                                            {{ data.item.nombre }}
                                            </v-chip>
                                        </template>
                                        <template v-slot:item="data">
                                            
                                            <template>
                                                <v-list-item-avatar>
                                                    <img :src="data.item.avatar ? data.item.avatar : 'avatar/user.png'">
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                    <v-list-item-title v-html="data.item.nombre"></v-list-item-title>
                                                    <v-list-item-subtitle v-html="data.item.cargo"></v-list-item-subtitle>
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

    /* eslint-disable no-unused-vars */


    import request from '@/functions/request.js'
    import { Editor, EditorContent, EditorMenuBar  } from 'tiptap';

    import {
        Blockquote,
        CodeBlock,
        HardBreak,
        Heading,
        OrderedList,
        BulletList,
        ListItem,
        TodoItem,
        TodoList,
        Bold,
        Code,
        Italic,
        Link,
        Strike,
        Underline,
        History,
    } from 'tiptap-extensions'

    export default {
        components: {
            EditorContent,
            EditorMenuBar
        },
        data () {
            return {
                api: process.env.VUE_APP_API_URL,
                personas: [],
                personas_enviar: [],
                content: null,
                editorOption: {
               
                },
                autoUpdate: true,
                friends: ['Sandra Adams', 'Britta Holt'],
                isUpdating: false,
                name: 'Midnight Crew',
                title: 'The summer breeze',
                pdf_vistaprevia: null,
                loading_preview: false,
                editor: new Editor({
                    extensions: [
                    new Blockquote(),
                    new CodeBlock(),
                    new HardBreak(),
                    new Heading({ levels: [1, 2, 3] }),
                    new BulletList(),
                    new OrderedList(),
                    new ListItem(),
                    new TodoItem(),
                    new TodoList(),
                    new Bold(),
                    new Code(),
                    new Italic(),
                    new Link(),
                    new Strike(),
                    new Underline(),
                    new History(),
                    ],
                    content: `
                    <h1>Yay Headlines!</h1>
                    <p>All these <strong>cool tags</strong> are working now.</p>
                    `,
                }),
            }
        },
        methods: {

            personas_compartir(){

                const data = {

                    url: 'personas_compartir',
                    data: null

                }

                request.post(data)
                .then( (response) => {

                    this.personas = response.data

                    // Asignarles la dirección del api
                    this.personas.forEach(persona => {
                        
                        if (persona.avatar) {
                            
                            persona.avatar = this.api + persona.avatar

                        }

                    });

                    console.log(this.personas);

                })

            },
            recargar_vistaprevia(){

                this.loading_preview = true

                const data = {

                    url: 'generar_vistaprevia',
                    data: {
                        content: this.editor.getHTML()
                    }

                }

                request.post(data)
                .then((response) => {

                    
                    this.pdf_vistaprevia = this.api + response.data.pdf_url
                    this.loading_preview = false
                    
                   
                })

            },
            autosave(){


            },
            remove (item) {
                
                const index = this.personas_enviar.indexOf( item.id )

                if (index >= 0) this.personas_enviar.splice(index, 1)

            },
            compartir(){



            }

        },
        mounted(){

            this.personas_compartir()

        }
        
    }
</script>