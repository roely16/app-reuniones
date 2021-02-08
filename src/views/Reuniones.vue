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
                            <v-data-table>

                            </v-data-table>
                        </v-col>
                    </v-row>

                </v-card-text>
            </v-card>

            <Modal ref="modal" :title="title">
                <template #form>
                    
                    <FormReunion></FormReunion>

                </template>

                <template #modal-corner-right>
                    <v-btn
                        dark
                        text
                        @click="dialog = false"
                    >
                        <v-icon>
                            mdi-cloud-upload
                        </v-icon>
                    </v-btn>

                    <v-btn
                        dark
                        text
                        @click="dialog = false"
                    >
                        <v-icon>
                            mdi-content-save
                        </v-icon>
                    </v-btn>
                </template>
            </Modal>
        </v-container>
    </div>
</template>

<script>

    /* eslint-disable no-unused-vars */
    import request from '@/functions/request'
    import Modal from '@/components/Modal'
    import FormReunion from '@/components/FormReunion'

    export default {
        
        components: {

            Modal,
            FormReunion

        },
        data(){
            return{

                title: null

            }
        },
        methods: {

            mostrar_modal(){

                this.title = "Reunión"
                this.$refs.modal.show()

            }
            
        },
        mounted(){


        }

    }
</script>