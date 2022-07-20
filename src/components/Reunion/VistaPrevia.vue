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
                <v-btn class="ml-2" icon>
                    <v-icon>
                        mdi-refresh
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <embed width="100%" height="600px">
        </v-row>
    </div>
</template>

<style scoped>
    .preview-container{
        min-height: 70vh;
    }
</style>

<script>
export default {
    
}
</script>