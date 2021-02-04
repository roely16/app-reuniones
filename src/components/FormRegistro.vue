<template>
    <div>
        <v-form v-model="valid" ref="form" @submit.prevent="registrar()" class="mt-4">
            <v-row>
                <v-col cols="12">
                    <h1 class="text-center">Registro de Usuario</h1>
                </v-col>
                <v-col cols="12">
                    <v-text-field :rules="[v => !!v]" v-model="persona.nombres" autocomplete="off" hide-details outlined label="Nombres"></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-text-field :rules="[v => !!v]" v-model="persona.apellidos" autocomplete="off" hide-details outlined label="Apellidos"></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-text-field  v-model="persona.cargo" autocomplete="off" hide-details outlined label="Cargo"></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-text-field type="email" :rules="[v => !!v]" v-model="persona.email" autocomplete="off" hide-details outlined label="Email"></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-text-field :type="!persona.show_password ? 'password' : 'text'" :rules="[v => !!v]" v-model="persona.password" autocomplete="off" hide-details outlined label="Contraseña" :append-icon="!persona.show_password ? 'mdi-eye' : 'mdi-eye-off'" @click:append="persona.show_password = !persona.show_password"></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-text-field v-model="persona.telefono" autocomplete="off" hide-details outlined label="Teléfono"></v-text-field>
                </v-col>

            </v-row>

            <v-row>
                <v-col class="text-center">
                    <v-btn :to="{ name: 'login' }" large dark>
                        CANCELAR
                    </v-btn>
                    <v-btn type="submit" large color="primary" class="ml-2">
                        REGISTRAR
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>

    </div>
</template>

<script>

    import alert from '@/functions/alert.js'
    import request from '@/functions/request.js'

    export default {
        components: {
            
        },
        data(){
            return{
                persona: {
                    nombres: null,
                    apellidos: null,
                    cargo: null,
                    email: null,
                    telefono: null,
                    show_password: false
                },
                valid: true
            }
        },  
        methods: {

            registrar(){
                
                this.$refs.form.validate()

                if (this.valid) {
                    
                    let data = {
                        url: 'registrar_usuario',
                        data: this.persona
                    }

                    request.post(data).then((response) => {

                        alert.show_alert(response.data).then(() => {

                            if (response.data.status == 200) {
                                
                                console.log('enviar al login');

                            }

                        })

                    })
                    
                }

            }

        }
    }
</script>