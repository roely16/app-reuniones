<template>
    <div>
        <v-container fluid>
            <v-row class="mt-4" justify="center">
                <v-col cols="10">
                    <v-autocomplete v-model="selected" item-text="nombre" item-value="nombre" :items="areas" label="Responsable" filled rounded>
                        <template v-slot:item="data">
                            <v-list-item-content>
                                <v-list-item-title v-html="data.item.nombre"></v-list-item-title>
                                <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                            </v-list-item-content>
                        </template>
                    </v-autocomplete>
                </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-row align="center" class="mt-4">
                <v-col cols="7">
                    <v-text-field dense readonly filled rounded hide-details label="Nombre"></v-text-field>
                    <v-text-field dense readonly class="mt-2" filled rounded hide-details label="Coordinación o Sección"></v-text-field>
                    <v-text-field dense readonly class="mt-2" filled rounded hide-details label="Puesto"></v-text-field>
                </v-col>
                <v-col class="text-center" cols="5">
                    <v-avatar size="150">
                        <v-img contain :src="require('@/assets/img/man.png')"></v-img>
                    </v-avatar>
                </v-col>
            </v-row>

            <v-row class="mt-4">
                <v-col class="text-center">
                    <v-btn class="mr-2" large elevation="0" color="secondary">Cancelar</v-btn>
                    <v-btn @click="update_pendiente()" :disabled="!selected" large elevation="0" color="primary">Asignar</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    
    data(){
        return{
            selected: null
        }
    },
    methods: {

        update_pendiente(){

            this.$emit('update_pendiente', this.selected)

        }

    },
    computed: {
        ...mapState({
            'areas': state => state.reunion.areas_pendientes
        })
    },
    watch: {
        selected: function(val){

            //Solicitar el detalle del colaborador
            console.log(val)

        }
    }

}
</script>