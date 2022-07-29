<template>
    <div>
        <v-container fluid>
            <v-row class="pt-3">
                <!-- Sección para compartir -->
                <v-col cols="6" class="pt-0 text-center">
                    <span class="text-button">
                        Destinatarios
                    </span>
                    <v-row>
                        <v-col>
                            <v-text-field filled rounded dense append-icon="mdi-magnify" hide-details></v-text-field>
                        </v-col>
                    </v-row>

                    <!-- Lista de destinatarios -->
                    <v-list v-model="selected" class="text-left destinos" two-line>
                        <v-list-item v-for="(destino, key) in destinos" :key="key">
                            <v-list-item-avatar>
                                <v-img :src="destino.avatar ? api + destino.avatar : 'avatar/user.png'"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title v-html="destino.nombre_completo"></v-list-item-title>
                                <v-list-item-subtitle v-html="destino.cargo"></v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon color="success">
                                    mdi-check-bold
                                </v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list>
                </v-col>

                <v-divider vertical></v-divider>
                <!-- Sección para mostrar el historial -->
                <v-col cols="6" class="pt-0 text-center">
                    <span class="text-button">
                        Historial
                    </span>

                    <div class="text-left" v-for="(envio, key) in historial" :key="key">
                        <v-row>
                            <v-col cols="12">
                                <v-card elevation="0">
                                    <v-card-text>
                                        {{ envio.created_at }}
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            
                        </v-row>
                        <v-divider></v-divider>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn large color="primary" elevation="0">
                        Enviar
                        <v-icon right>
                            mdi-email
                        </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style scoped>
    .destinos{
        max-height: 500px;
        overflow-y: scroll;
    }
</style>

<script>

import { mapState } from 'vuex'

export default {
    data(){
        return{
            api: process.env.VUE_APP_API_URL,
            selected: null
        }
    },
    computed: {
        ...mapState({
            'historial': state => state.compartir.historial,
            'destinos': state => state.compartir.destinos
        })
    }
}
</script>