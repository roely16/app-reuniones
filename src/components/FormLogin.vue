<template>
    <div>
        <v-form>
            <v-row>
                <v-col cols="12">
                    <v-text-field autocomplete="off" hide-details outlined label="Usuario"></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-text-field autocomplete="off" hide-details outlined label="Contraseña"></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col class="text-center">
                    <v-btn large color="primary">
                        INGRESAR 
                        <v-icon>mdi-login</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>
    export default {

    }
</script>