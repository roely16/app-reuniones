<template>
    <div class="preview-container">
        <v-row dense>
            <v-col>
                <span class="text-button text-uppercase font-weight-medium">
                    Vista Previa
                </span>
            </v-col>
            <v-col align="end">
                <v-btn icon>
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
            </v-col>
        </v-row>
    </div>
</template>

<style scoped>
    .preview-container{
        min-height: 70vh;
    }
</style>

<script>

import { mapActions, mapState } from 'vuex'

export default {
    methods: {
        ...mapActions({
            fetchPreview: 'vistaprevia/fetchPreview'
        })
    },
    computed: {
        ...mapState({
            pdf_url: state => state.vistaprevia.pdf_url,
            loading: state => state.vistaprevia.loading
        })
    },
    mounted(){
        this.fetchPreview()
    }
}
</script>