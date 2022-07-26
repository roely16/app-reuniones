<template>
    <div>
        <v-row justify="center">
            <v-dialog
                v-model="dialog"
                :fullscreen="fullscreen"
                :width="width"
                :scrollable="!fullscreen"
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
                            
                            <slot name="modal-corner-right">

                            </slot>
                        </v-toolbar-items>
                    </v-toolbar>

                    <v-card-text>
                        <slot name="form">

                        </slot>
                    </v-card-text>
                    
                    
                </v-card>   
            </v-dialog>
        </v-row>

    </div>
</template>

<script>
    export default {
        props: {
            title: String,
            fullscreen: Boolean,
            width: String
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
            },
            close(){
                this.dialog = false
            }
        },
        watch: {
            dialog: function(val){
                if (!val) {
                    this.$emit('clear_form')

                }
            }
        }
    }
</script>