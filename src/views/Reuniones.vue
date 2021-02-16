<template>
    <div>
        <v-container fluid>
            <v-card outlined>
                
                <v-card-text>

                    <v-row align="center">
                        <v-col md="4" cols="8">
                            <v-text-field outlined autocomplete="off" label="Buscar... " hide-details prepend-inner-icon="mdi-magnify"></v-text-field>
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
                            <v-data-table :items="items" :headers="headers">
                                 <template v-slot:[`item.action`]="data">

                                    <v-btn icon color="success" @click="mostrar_historial(data.item)">
                                        <v-icon>
                                            mdi-history
                                        </v-icon>
                                    </v-btn>

                                    <v-btn icon color="primary" @click="mostrar_editar(data.item)">
                                        <v-icon>
                                            mdi-pencil
                                        </v-icon>
                                    </v-btn>

                                    <v-btn icon color="red" @click="eliminar(data.item)">
                                        <v-icon>
                                            mdi-delete
                                        </v-icon>
                                    </v-btn>
                                </template> 

                                <template v-slot:[`item.registrado_por`]="data">

                                    <v-avatar class="mr-4" size="24">
                                        <img
                                            :src="data.item.avatar ? api + data.item.avatar : 'avatar/user.png'"
                                        >
                                    </v-avatar>

                                    {{ data.item.nombres }} {{ data.item.apellidos }}
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>

                </v-card-text>
            </v-card>

            <Modal @clear_form="clear_form" :fullscreen="fullscreen" ref="modal" :title="title">
                <template #form>
                    
                    <FormReunion @saved="(data) => saved(data)" :idItem="idItem" @updateTable="obtener_reuniones" ref="form"></FormReunion>

                </template>

                <template #modal-corner-right>
                    <v-btn
                        dark
                        text
                        @click="registrar()"
                    >
                        <v-icon>
                            mdi-content-save
                        </v-icon>
                    </v-btn>
                </template>
            </Modal>

            <Modal @clear_form="clear_form" :width="width" :fullscreen="fullscreen" ref="modal_historial" :title="title">

                <template #form>

                    <FormHistorial :idItem="idItem">

                    </FormHistorial>

                </template>

            </Modal>
        </v-container>
    </div>
</template>

<script>

    /* eslint-disable no-unused-vars */
    import request from '@/functions/request'
    import alert from '@/functions/alert'

    import Modal from '@/components/Modal'
    import FormReunion from '@/components/FormReunion'
    import FormHistorial from '@/components/FormHistorial'

    export default {
        
        components: {

            Modal,
            FormReunion,
            FormHistorial

        },
        data(){
            return{

                title: null,
                fullscreen: true,
                items: [],
                headers: [],
                api: process.env.VUE_APP_API_URL,
                idItem: null,
                width: null

            }
        },
        methods: {

            obtener_reuniones(){
                
                const data = {
                    url: 'obtener_reuniones',
                    data: null
                }

                request.post(data)
                .then((response) => {

                    this.items = response.data.items
                    this.headers = response.data.headers
                    
                })

            },
            mostrar_modal(){

                this.title = "Registrar Bitácora de Reunión"
                this.idItem = null
                this.fullscreen = true
                this.$refs.modal.show()
                //this.$refs.form.clear()

            },
            registrar(){

                this.$refs.form.registrar()

            },
            mostrar_editar(item){

                this.title = "Editar Bitácora de Reunión " + item.id
                this.idItem = item.id
                this.fullscreen = true
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
                            url: 'eliminar_reunion',
                            data: {
                                id: item.id
                            }
                        }

                        request.post(data_request)
                        .then((response) => {
                            
                            alert.show_alert(response.data)
                            .then(() => {

                                if (response.data.status == 200) {
                                    
                                    this.obtener_reuniones()

                                }

                            })

                        })

                    }

                })

            },
            clear_form(){

                this.idItem = null

            },
            saved(data){

                this.idItem = data.id

            },
            mostrar_historial(item){

                this.title = "Historial"
                this.fullscreen = false
                this.width = '500'
                this.idItem = item.id
                this.$refs.modal_historial.show()

            }
            
        },
        mounted(){

            this.obtener_reuniones()

        }

    }
</script>