<template>
    <div>
        <v-container fluid>
            <v-row class="mt-4" justify="center">
                <v-col cols="10">
                    <v-autocomplete v-model="selected" item-text="nombre" item-value="nit" :items="areas" label="Responsable" filled rounded>
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
                    <v-text-field v-model="responsable_detalle.nombre_completo" dense readonly filled rounded hide-details label="Nombre"></v-text-field>
                    <v-text-field v-model="responsable_detalle.area" dense readonly class="mt-2" filled rounded hide-details label="Coordinación o Sección"></v-text-field>
                </v-col>
                <v-col class="text-center" cols="5">
                    <v-avatar v-if="responsable_detalle.archivo" rounded size="150">
                        <v-img :src="avatar_url"></v-img>
                    </v-avatar>
                </v-col>
            </v-row>

            <v-row class="mt-4">
                <v-col class="text-center">
                    <v-btn @click="update_pendiente()" :disabled="!selected" large elevation="0" color="primary">Asignar</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    
    props: {
        pendiente: Object
    },
    data(){
        return{
            selected: null
        }
    },
    methods: {

        ...mapActions({
            detalleColaborador: 'reunion/detalleColaborador'
        }),
        ...mapMutations({
            setResponsableDetalle: 'reunion/setResponsableDetalle'
        }), 
        update_pendiente(){

            // Obtener el objecto completo del colaborador
            this.$emit('update_pendiente', this.responsable_detalle)
        }

    },
    computed: {
        ...mapState({
            'areas': state => state.reunion.areas_pendientes,
            'responsable_detalle': state => state.reunion.responsable_detalle
        }),
        avatar_url: function(){

            return process.env.VUE_APP_API_IMAGES + this.responsable_detalle.archivo.ruta

        }
    },
    watch: {
        selected: function(val){

            //Solicitar el detalle del colaborador
            this.detalleColaborador(val)

        },
        pendiente: function(val){

            this.selected = val.responsable

            if (!val.responseble) {
                
                this.setResponsableDetalle({})
                
            }

        }
    }

}
</script>