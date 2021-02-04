<template>
    <div>
        <v-container>
            <v-row justify="center" align="center">
                <v-col cols="12" md="7">
                    <v-img
                        max-width="300"
                        src="@/assets/img/icon_muni.jpg">
                    </v-img>
                </v-col>
                <v-col>
                    <FormRegistro></FormRegistro>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

    import FormRegistro from '@/components/FormRegistro'

    export default {
        components: {
            FormRegistro
        }
    }
</script>