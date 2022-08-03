<template>
    <div class="preview-container">
        <v-row align="center" dense>
            <v-col>
                <span class="text-button text-uppercase font-weight-medium">
                    Vista Previa
                </span>
            </v-col>
            <v-col align="end">
                <v-chip class="mr-2" v-if="encabezado.contenido" @click="mostrarAnterior()" :outlined="!anterior" color="error" label>
                    Versión Anterior
                </v-chip>
                <v-btn @click="compartir()" icon>
                    <v-icon>
                        mdi-export-variant
                    </v-icon>
                </v-btn>
                <v-btn @click="fetchPreview()" class="ml-2" icon>
                    <v-icon>
                        mdi-refresh
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col style="min-heigth: 600px" class="text-center">
                <v-progress-linear :indeterminate="loading" :color="loading ? 'primary' : 'white'"></v-progress-linear>
                <embed v-if="!loading" width="100%" :src="pdf_url" height="600px">
                <fetch-preview v-if="!pdf_url"></fetch-preview>
            </v-col>
        </v-row>

        <modal title="Compartir" width="800" ref="modal">
            <template #form>
                <compartir></compartir>
            </template>
        </modal>
    </div>
</template>

<style scoped>
    .preview-container{
        min-height: 70vh;
    }
</style>

<script>

import Modal from '@/components/Modal'
import Compartir from '@/components/Reunion/Compartir'
import FetchPreview from '@/components/Reunion/FetchPreview'

import { mapActions, mapState } from 'vuex'

export default {
    data(){
        return{
            anterior: false
        }
    },
    components: {
        'modal': Modal,
        'compartir': Compartir,
        'fetch-preview': FetchPreview
    },
    methods: {
        ...mapActions({
            fetchPreview: 'vistaprevia/fetchPreview',
            fetchShare: 'compartir/fetchShare',
            fetchEarlierVersion: 'vistaprevia/fetchEarlierVersion'
        }),
        compartir(){
            
            this.fetchShare()

            this.$refs.modal.show()

        },
        mostrarAnterior(){

            this.anterior = !this.anterior

            if (this.anterior) {
                
                this.fetchEarlierVersion()

                return
            }
            
            this.fetchPreview()

        }
    },
    computed: {
        ...mapState({
            pdf_url: state => state.vistaprevia.pdf_url,
            loading: state => state.vistaprevia.loading,
            encabezado: state => state.reunion.encabezado
        })
    }
}
</script>