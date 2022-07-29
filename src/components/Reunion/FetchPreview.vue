<template>
    <div>
        <v-row class="mt-10" justify="center" align="center">
            <v-col cols="12">
                <v-avatar size="200" rounded>
                    <v-img contain :src="require('@/assets/img/file.png')"></v-img>
                </v-avatar>
            </v-col>
            <v-col>
                <v-btn @click="fetchPreview()" text>Actualizar
                    <v-icon right>
                        mdi-refresh
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
    
    methods: {
        ...mapActions({
            fetchPreview: 'vistaprevia/fetchPreview'
        })
    }

}
</script>