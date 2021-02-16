<template>
    <div>
        <v-container>

            <v-form ref="form" v-model="valid" @submit.prevent="!idItem ? registrar() : editar()">

                <v-row justify="center" align="center" dense>
                    <v-col cols="6">
                        <v-card>
                            <v-card-text class="text-center" align="center" justify="center">
                                <v-img width="130" contain :src="participante.avatar ? api + participante.avatar : url_image ? url_image : 'avatar/user.png'"></v-img>
                            </v-card-text>
                            <v-card-text>
                                 <v-file-input accept="image/*" @change="select_image" hide-details autocomplete="off" v-model="avatar" :prepend-icon="null" prepend-inner-icon="mdi-camera" filled label="Avatar"></v-file-input>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    
                </v-row>
                <v-row >
                    
                    <v-col cols="6">
                        <v-text-field :rules="[ v => !!v ]" v-model="participante.nombres" autocomplete="off" outlined hide-details label="Nombre"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field :rules="[ v => !!v ]" v-model="participante.apellidos" autocomplete="off" outlined hide-details label="Apellido"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field :rules="[ v => !!v ]" v-model="participante.telefono" autocomplete="off" outlined hide-details label="Teléfono"></v-text-field>
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

                        <v-checkbox hide-details v-if="!participante.usuario" v-model="participante.habilitar_usuario" label="Habilitar Usuario"></v-checkbox>

                        <v-alert class="mt-4" dense v-if="participante.usuario" type="success">USUARIO HABILITADO</v-alert>
                    </v-col>

                    
                </v-row>

                <v-row dense>
                    <v-col cols="6"  v-if="participante.habilitar_usuario">
                        <v-text-field v-model="participante.password" :rules="[ v => !!v ]" :type="!participante.show_password ? 'password' : 'text'" :append-icon="!participante.show_password ? 'mdi-eye' : 'mdi-eye-off'" autocomplete="off" outlined hide-details label="Contraseña" @click:append="participante.show_password = !participante.show_password"></v-text-field>
                    </v-col>

                     <v-col cols="6" v-if="participante.usuario || participante.habilitar_usuario">
                        <v-select v-model="participante.id_rol" :rules="[ v => !!v ]" :items="roles" item-text="nombre" item-value="id" autocomplete="off" outlined hide-details label="Rol"></v-select>
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
                    show_password: false,
                    id_rol: null
                },
                roles: [],
                valid: true,
                avatar: null,
                url_image: null,
                api: process.env.VUE_APP_API_URL,
                change_avatar: false
            }
        },
        methods: {

            registrar(){

                this.$refs.form.validate()

                if (this.valid) {
                    
                    const data = {
                        url: 'registrar_participante',
                        data: this.participante
                    }

                    request.post(data)
                    .then((response) => {

                        if (this.avatar) {
                            
                            let formData = new FormData()

                            formData.append('files', this.avatar)
                            formData.append('id', response.data.data.id)

                            const data_form = {
                                url: 'subir_avatar',
                                data: formData
                            }

                            request.post(data_form)
                            .then((response) => {
                                console.log(response.data)
                            })

                        }
                        
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

                    if (this.change_avatar) {
                        
                        let formData = new FormData()

                        formData.append('files', this.avatar)
                        formData.append('id', this.participante.id)

                        const data_form = {
                            url: 'editar_avatar',
                            data: formData
                        }

                        request.post(data_form)
                        .then((response) => {
                            console.log(response.data)
                        })

                    }
                    alert.show_alert(response.data)
                    .then(() => {

                        if (response.data.status == 200) {
                            
                            this.$emit('updateTable')
                            this.$emit('closeModal')

                        }

                    })
                })

            },
            obtener_datos(){

                const data = {
                    url: 'obtener_roles',
                    data: null
                }

                request.post(data)
                .then((response) => {
                    this.roles = response.data
                })

            },
            clear(){

                    
                this.participante = {

                    nombres: null,
                    apellidos: null,
                    telefono: null,
                    cargo: null,
                    email: null,
                    avatar: null,
                    habilitar_usuario: null,
                    password: null,
                    show_password: false,
                    id_rol: null,

                }

                this.avatar = null
                this.url_image = null

                this.$refs.form.resetValidation()

                

            },
            select_image(){

                if (this.avatar) {
                    
                    this.url_image = URL.createObjectURL(this.avatar)
                    this.participante.avatar = null
                    this.change_avatar = true

                }else{

                    this.url_image = null

                }

            }

        },
        watch: {

            idItem: function(val){

                if (val) {

                    this.detalle()

                }else{

                    this.clear()

                }

            }

        },
        mounted(){

            if (this.idItem) {
                
                this.detalle()

            }else{

                this.clear()

            }

            this.obtener_datos()

        },
        
    }
</script>