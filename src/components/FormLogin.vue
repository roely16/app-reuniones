<template>
    <div>
        <v-form ref="form" v-model="valid" @submit.prevent="login()">
            <v-row>
                <v-col class="pt-0" cols="12">
                    <v-text-field v-model="usuario.usuario" :rules="[v => !!v || 'Campo Obligatorio']" autocomplete="off" outlined label="Usuario"></v-text-field>
                </v-col>

                <v-col class="pt-0" cols="12">
                    <v-text-field :type="usuario.show_password ? 'text' : 'password'" :append-icon="usuario.show_password ? 'mdi-eye-off' : 'mdi-eye'" @click:append="usuario.show_password = !usuario.show_password" v-model="usuario.password" :rules="[v => !!v || 'Campo Obligatorio']" autocomplete="off" outlined label="Contraseña"></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col class="text-center">
                    <v-btn type="submit" large color="primary">
                        INGRESAR 
                        <v-icon>mdi-login</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>

    /* eslint-disable no-unused-vars */

    import request from '@/functions/request.js'
    import alert from '@/functions/alert'

    export default {

        data(){
            return{
                usuario:{
                    usuario: null,
                    password: null,
                    show_password: false
                },
                valid: true
            }
        },
        methods: {
            login(){

                this.$refs.form.validate()
                
                if (this.valid) {
                    
                    const data = {
                        url: 'login',
                        data: this.usuario
                    }

                    request.post(data)
                    .then((response) => {

                        if (response.data.status != 200) {
                            
                            alert.show_alert(response.data)

                            return

                        }

                        localStorage.setItem('app-reuniones', JSON.stringify(response.data.data))

                        this.$router.push({ name: 'home' })

                    })

                }

            }
        }

    }
</script>