<template>
    <div>
        <v-container fluid>
            <v-card outlined>
                
                <v-card-text>

                    <v-row align="center">
                        <v-col md="4" cols="8">
                            <v-text-field v-model="search" outlined autocomplete="off" label="Buscar... " hide-details prepend-inner-icon="mdi-magnify"></v-text-field>
                        </v-col>
                        <v-col align="end" md="8" cols="4">
                            <v-btn @click="mostrar_modal()" color="green accent-4" dark>
                                <v-icon>
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-data-table :search="search" :items="items" :headers="headers">
                                <template v-slot:[`item.action`]="data">
                                    <v-btn icon color="primary" @click="mostrar_editar(data.item)">
                                        <v-icon>
                                            mdi-pencil
                                        </v-icon>
                                    </v-btn>

                                    <v-btn :disabled="!data.item.deletable" icon color="red" @click="eliminar(data.item)">
                                        <v-icon>
                                            mdi-delete
                                        </v-icon>
                                    </v-btn>
                                </template> 

                                <template v-slot:[`item.avatar`]="data">
                                    <v-avatar size="36">
                                        <img
                                            :src="data.item.avatar ? api + data.item.avatar : 'avatar/user.png'"
                                        >
                                    </v-avatar>
                                </template>

                                <template v-slot:[`item.rol`]="data">
                                    <v-chip v-if="data.item.rol" small :color="data.item.rol.color" dark>
                                        {{ data.item.rol.nombre }}
                                    </v-chip>
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>

                </v-card-text>
            </v-card>

             <Modal @clear_form="clear_form" :fullscreen="fullscreen" :width="width" ref="modal" :title="title">
                <template #form>
                    
                    <FormParticipantes ref="form" :idItem="idItem" @updateTable="obtener_datos" @closeModal="close_modal"></FormParticipantes>

                </template>

            </Modal>

        </v-container>
    </div>
</template>

<script>

    import Modal from '@/components/Modal'
    import FormParticipantes from '@/components/FormParticipante'

    import request from '@/functions/request.js'
    import alert from '@/functions/alert.js'

    export default {
        components: {
            Modal,
            FormParticipantes
        },
        data(){
            return{
                api: process.env.VUE_APP_API_URL,
                title: null,
                fullscreen: false,
                width: null,
                items: [],
                headers: [],
                search: null,
                idItem: null
            }
        },
        methods: {

            mostrar_modal(){

                this.title = "Agregar Participante"
                this.idItem = null
                this.width = "800"

                this.$refs.modal.show()

            },
            obtener_datos(){

                const usuario = JSON.parse(localStorage.getItem('app-reuniones'))

                const data = {
                    url: 'obtener_participantes',
                    data: {
                        id_usuario: usuario.id
                    }
                }

                request.post(data)
                .then((response) => {

                    this.items = response.data.items
                    this.headers = response.data.headers
                    console.log(response.data);
                })

            },
            close_modal(){

                this.$refs.modal.close()

            },
            mostrar_editar(item){

                this.title = "Editar Participante"
                this.idItem = item.id
                this.width = "800"

                this.$refs.modal.show()

            },
            eliminar(item){

                const data = {
                    title: "¿Está seguro?",
                    message: "Una vez eliminado no se podrá recuperar!",
                    type: "warning",
                    confirm_text: "Si, ELIMINAR!",
                    cancel_text: "Cancelar"
                }

                alert.alert_confirm(data)
                .then((result) => {
                    
                    if (result.isConfirmed) {

                        const data_request = {
                            url: 'eliminar_participante',
                            data: {
                                id: item.id
                            }
                        }

                        request.post(data_request)
                        .then((response) => {
                            
                            alert.show_alert(response.data)
                            .then(() => {

                                if (response.data.status == 200) {
                                    
                                    this.obtener_datos()

                                }

                            })

                        })

                    }

                })

            },
            clear_form(){

                //this.$refs.form.clear()
                this.idItem = null

            }

        },
        mounted(){

            this.obtener_datos()

        }
    }
</script>