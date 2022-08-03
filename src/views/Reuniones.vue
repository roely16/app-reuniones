<template>
    <div>
        <v-container fluid>
            <v-card elevation="0">
                
                <v-card-text>

                    <v-row align="center">
                        <v-col md="4" cols="8">
                            <v-text-field outlined autocomplete="off" label="Buscar... " hide-details prepend-inner-icon="mdi-magnify"></v-text-field>
                        </v-col>
                        <v-col md="4">
                            <v-alert
                                text
                                type="error"
                                icon="mdi-calendar"
                                class="mb-0"
                                v-if="participacion"
                                max-width="320"
                            > 
                                PARTIPACIÓN CALENDARIZADA
                            </v-alert>
                        </v-col>
                        <v-col align="end" md="4" cols="4">
                            
                            <v-btn :disabled="!acceso && !participacion" @click="mostrar_modal()" color="green accent-4" dark>
                                <v-icon>
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-data-table :loading="loading" :items="reuniones.items" :headers="reuniones.headers">
                                 <template v-slot:[`item.action`]="data">

                                    <!-- <v-btn icon color="success" @click="mostrar_historial(data.item)">
                                        <v-icon>
                                            mdi-history
                                        </v-icon>
                                    </v-btn> -->

                                    <v-btn icon color="primary" @click="mostrar_editar(data.item)">
                                        <v-icon>
                                            mdi-pencil
                                        </v-icon>
                                    </v-btn>

                                    <v-btn icon color="red" @click="fetchEliminar(data.item)">
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
                    
                    <FormReunion @saved="(data) => saved(data)" :idItem="idItem" @updateTable="fetchReuniones" ref="form"></FormReunion>

                </template>

                <template #modal-corner-right>
                    
                    <span v-if="saving" class="text-button">
                        <v-progress-circular
                            indeterminate
                            dark
                            size="25"
                        ></v-progress-circular>
                        Guardando...
                    </span>

                    <v-btn
                        dark
                        text
                        @click="registrar()"
                        :disabled="saving"
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

    import Modal from '@/components/Modal'
    import FormReunion from '@/components/FormReunion'
    import FormHistorial from '@/components/FormHistorial'

    import { mapState, mapActions, mapMutations } from 'vuex'

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
            mostrar_modal(){

                // Limpiar la información para que sea una plantilla nueva
                this.clearForm()
                this.fetchDataForm()
                .then(this.fetchPreview())

                this.title = "Registrar Bitácora de Reunión"
                this.idItem = null
                this.fullscreen = true
                this.$refs.modal.show()

            },
            registrar(){

                //this.$refs.form.registrar()
                this.saveReunion()

            },
            mostrar_editar(item){

                this.title = "Editar Bitácora de Reunión " + item.id
                this.idItem = item.id
                this.fullscreen = true
                this.$refs.modal.show()

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

            },
            ...mapActions({
                fetchReuniones: 'lista_minutas/fetchReuniones',
                checkParticipacion: 'lista_minutas/checkParticipacion',
                fetchEliminar: 'lista_minutas/fetchEliminar',
                saveReunion: 'reunion/saveReunion',
                fetchPreview: 'vistaprevia/fetchPreview',
                fetchDataForm: 'reunion/fetchDataForm'
            }),
            ...mapMutations({
                clearForm: 'reunion/clearForm'
            }) 
        },
        computed: {
            ...mapState({
                reuniones: state => state.lista_minutas.reuniones,
                loading: state => state.lista_minutas.loading,
                acceso: state => state.lista_minutas.acceso,
                participacion: state => state.lista_minutas.participacion,
                saving: state => state.reunion.saving
            })
        },
        mounted(){

            this.checkParticipacion()

            this.fetchReuniones()

        }

    }
</script>