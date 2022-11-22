<template>
        <v-container fluid>
            <v-row class="pt-3">
                <!-- Sección para compartir -->
                <v-col cols="5" class="pt-0 text-center">
                    <span class="text-button">
                        Destinatarios
                    </span>
                    <v-row>
                        <v-col>
                            <v-text-field hide-details v-model="search" label="Buscar..." filled rounded dense append-icon="mdi-magnify"></v-text-field>
                        </v-col>
                    </v-row>

                    <!-- Lista de destinatarios -->
                    <v-list class="text-left mt-4 destinos" two-line>
                        <v-list-item-group
                            active-class="success--text"
                            multiple
                        >
                            <v-list-item @click="selectItem(destino)" :value="destino.id" v-for="(destino, key) in filtered" :key="key">
                                <template v-slot:default="{ active }">
                                    <v-list-item-avatar>
                                        <v-img :src="destino.avatar ? api + destino.avatar : 'avatar/user.png'"></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-html="destino.nombre_completo"></v-list-item-title>
                                        <v-list-item-subtitle v-html="destino.cargo"></v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-action v-if="active">
                                        <v-icon color="success">
                                            mdi-check
                                        </v-icon>
                                    </v-list-item-action>
                                </template>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-col>

                <v-divider vertical></v-divider>
                <!-- Sección para mostrar el historial -->
                <v-col cols="7" class="pt-0 text-center">
                    <span class="text-button">
                        Historial
                    </span>

                    <div class="text-left" v-for="(envio, key) in historial" :key="key">
                        <v-row>
                            <v-col cols="12">
                                <v-card elevation="0">
                                    <v-card-text>
                                        <v-row align="center">
                                            <v-col cols="10">
                                                <span class="text-button">
                                                    {{ envio.created_at }}
                                                </span>
                                            </v-col>
                                            <v-col align="end" cols="2">
                                                <v-btn @click="envio.expand = !envio.expand" x-small icon>
                                                    <v-icon>
                                                        {{ envio.expand ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                                                    </v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                        <v-row v-if="envio.expand">
                                            <v-col cols="12" v-for="(destino, key) in envio.detalle" :key="key">
                                                <span class="font-weight-medium">
                                                    {{ destino.nombres }} {{ destino.apellidos }}
                                                </span>
                                                <br>
                                                <span class="text-caption">
                                                    {{ destino.email }}
                                                </span>
                                            </v-col>
                                        </v-row>
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
                    <v-badge overlap color="success" :value="selected.length" :content="selected.length">
                        <v-btn :loading="sending" @click="doShare()" :disabled="selected.length == 0 || sending" large color="primary" elevation="0">
                            Enviar
                            <v-icon right>
                                mdi-email
                            </v-icon>
                        </v-btn>
                    </v-badge>
                </v-col>
            </v-row>
        </v-container>
</template>

<style scoped>
    .destinos{
        max-height: 400px;
        overflow-y: scroll;
    }
    .historial{
        overflow-y: scroll;
    }
</style>

<script>

import { mapState, mapActions } from 'vuex'

export default {
    data(){
        return{
            api: process.env.VUE_APP_API_URL,
            selected: [],
            search: null
        }
    },
    methods: {
        ...mapActions({
            share: 'compartir/share'
        }),
        doShare(){
            this.share(this.selected)
            .then(() => {
                this.selected = []
            })
        },
        selectItem(value){

            if (!this.selected.includes(value.id)) {
                
                // * Add element to array
                this.selected.push(value.id)

                return

            }

            // * Remove from array 
            const result = this.selected.filter(item => item != value.id)

            this.selected = result

        }
    },
    computed: {
        ...mapState({
            'historial': state => state.compartir.historial,
            'destinos': state => state.compartir.destinos,
            'sending': state => state.compartir.sending
        }),
        filtered: function(){

            if (!this.search) {
                
                return this.destinos

            }

            return this.destinos.filter(destino => {
                return destino.nombre_completo.toLowerCase().includes(this.search.toLowerCase());
            });

        }
    }
}
</script>