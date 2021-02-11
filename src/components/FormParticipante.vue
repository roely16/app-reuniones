<template>
    <div>
        <v-container>

            <v-form @submit.prevent="!idItem ? registrar() : editar()">

                <v-row >
                    <v-col cols="6">
                        <v-text-field v-model="participante.nombres" autocomplete="off" outlined hide-details label="Nombre"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="participante.apellidos" autocomplete="off" outlined hide-details label="Apellido"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="participante.telefono" autocomplete="off" outlined hide-details label="Teléfono"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="participante.cargo" autocomplete="off" outlined hide-details label="Cargo"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="participante.email" autocomplete="off" outlined hide-details label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="6">

                    </v-col>
                </v-row>

                <v-divider class="mt-4"></v-divider>

                <v-row align="center" dense>
                    
                    <v-col cols="6">

                        <v-checkbox v-if="!participante.usuario" v-model="participante.habilitar_usuario" label="Habilitar Usuario"></v-checkbox>

                        <v-alert class="mt-4" dense v-if="participante.usuario" type="success">USUARIO HABILITADO</v-alert>
                    </v-col>

                    <v-col cols="6">
                        <v-text-field class="mt-4" v-if="participante.habilitar_usuario" :type="!participante.show_password ? 'password' : 'text'" :append-icon="!participante.show_password ? 'mdi-eye' : 'mdi-eye-off'" autocomplete="off" outlined hide-details label="Contraseña" @click:append="participante.show_password = !participante.show_password"></v-text-field>
                    </v-col>
                </v-row>

                <v-row class="mt-4">
                    <v-col class="text-center">
                        <v-btn @click="$emit('closeModal')" large dark>
                            CANCELAR
                        </v-btn>
                        <v-btn type="submit" large color="primary" class="ml-2">
                            REGISTRAR
                        </v-btn>
                    </v-col>
                </v-row>

            </v-form>

        </v-container>
    </div>
</template>

<script>

    import request from '@/functions/request.js'
    // eslint-disable-next-line no-unused-vars
    import alert from '@/functions/alert.js'

    export default {
        props: {
            idItem: Number
        },
        data(){
            return{
                participante: {
                    nombres: null,
                    apellidos: null,
                    telefono: null,
                    cargo: null,
                    email: null,
                    avatar: null,
                    habilitar_usuario: null,
                    password: null,
                    show_password: false
                }
            }
        },
        methods: {

            registrar(){

                const data = {
                    url: 'registrar_participante',
                    data: this.participante
                }

                request.post(data)
                .then((response) => {

                    alert.show_alert(response.data)
                    .then(() => {

                        if (response.data.status == 200) {
                            
                            this.$emit('updateTable')
                            this.$emit('closeModal')

                        }

                    })

                })

            },
            detalle(){

                const data = {

                    url: 'detalle_participante',
                    data: {
                        id: this.idItem
                    }

                }

                request.post(data)
                .then((response) => {

                    this.participante = response.data

                })

            },
            editar(){

                const data = {

                    url: 'editar_participante',
                    data: this.participante

                }

                request.post(data)
                .then((response) => {

                    alert.show_alert(response.data)
                    .then(() => {

                        if (response.data.status == 200) {
                            
                            this.$emit('updateTable')
                            this.$emit('closeModal')

                        }

                    })
                })

            }

        },
        watch: {

            idItem: function(val){

                if (val) {

                    this.detalle()

                }

            }

        },
        mounted(){

            if (this.idItem) {
                
                this.detalle()

            }

        }
        
    }
</script>