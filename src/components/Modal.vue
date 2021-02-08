<template>
    <div>

        <v-row justify="center">
            <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
            >
            
            <v-card>
                <v-toolbar
                dark
                color="primary"
                >
                    <v-btn
                        icon
                        dark
                        @click="dialog = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <!-- <v-btn
                        dark
                        text
                        @click="dialog = false"
                        >
                            GUARDAR
                        </v-btn> -->
                        <slot name="modal-corner-right">

                        </slot>
                    </v-toolbar-items>
                </v-toolbar>

                <slot name="form">

                </slot>
                
            </v-card>
            </v-dialog>
        </v-row>

    </div>
</template>

<script>
    export default {

        props: {

            title: String

        },
        data () {
            return {
                dialog: false,
                notifications: false,
                sound: true,
                widgets: false,
            }
        },
        methods: {

            show(){

                this.dialog = true

            }

        }
    }
</script>