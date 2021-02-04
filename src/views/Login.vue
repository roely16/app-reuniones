<template>
    <div>

        <v-container >
            <v-row style="height: 100vh" justify="center" align="center">
                <v-col cols="12" md="9">
                    <v-card class="pl-5 pt-5 pr-5 pb-5" shaped elevation="4">
                        <v-card-title class="justify-center headline">Inicio de Sesión</v-card-title>
                        <v-card-subtitle class="text-center subheading">
                            Control de Reuniones
                        </v-card-subtitle>
                        
                        <v-card-text class="mt-4">
                            <v-row align="center" justify="center">
                                <v-col cols="12" md="7">
                                    <v-img
                                        max-width="300"
                                        src="@/assets/img/muni.png">
                                    </v-img>
                                </v-col>
                                <v-col>
                                    <FormLogin></FormLogin>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>

<script>

    import FormLogin from '@/components/FormLogin'

    export default {
        components: {
            FormLogin
        }
    }
</script>