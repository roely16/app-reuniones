<template>
    <div>
        <v-container fluid>
            <v-row class="mt-4 mb-4">
                <v-col cols="6">
                    <v-row justify="center" align="center">
                        <v-col cols="8">
                            <v-text-field append-icon="mdi-magnify" dense label="Buscar" hide-details rounded filled></v-text-field>
                        </v-col>
                        <v-col align="end">
                            <v-btn @click="checkAllDisponibles()" color="secondary" icon>
                                <v-icon>
                                    mdi-checkbox-marked-outline
                                </v-icon>
                            </v-btn>
                            <v-badge overlap :content="disponibles_seleccionados.length" :value="disponibles_seleccionados.length" color="error" >
                                    <v-btn @click="agregarParticipantes(disponibles_seleccionados)" :disabled="disponibles_seleccionados.length == 0" color="primary" icon>
                                    <v-icon>
                                        mdi-share
                                    </v-icon>
                                </v-btn>
                            </v-badge>
                        </v-col>
                    </v-row>
                    <v-row class="area-container">
                        <v-col class="pb-0 pt-0" v-for="(area, key) in areas" :key="key" cols="12">
                            <v-card elevation="0" v-if="area.empleados.length > 0">
                                <v-card-text class="pb-0">
                                    <v-list-item class="pl-1 pr-0">
                                        <v-list-item-action>
                                           <v-checkbox v-model="area.value" @click="agregarSeccion(area)"></v-checkbox>
                                        </v-list-item-action>
                                        <v-list-item-content>
                                            <span class="text-button">
                                                {{ area.descripcion }}
                                            </span>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-btn @click="area.expand = !area.expand" icon>
                                                <v-icon>
                                                    {{ area.expand ? 'mdi-chevron-up' : 'mdi-chevron-down'}}
                                                </v-icon>
                                            </v-btn>
                                        </v-list-item-action>
                                    </v-list-item>
                                </v-card-text>
                                <v-card-text v-if="area.expand" class="pt-0 pl-10">
                                    <v-checkbox v-model="empleado.selected" hide-details v-for="(empleado, key) in area.empleados" :key="key" :label="empleado.nombre"></v-checkbox>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col>
                    <v-row justify="center" align="center">
                        <v-col cols="8">
                            <v-text-field append-icon="mdi-magnify" dense label="Buscar" hide-details rounded filled></v-text-field>
                        </v-col>
                        <v-col align="end">
                            <v-btn @click="checkAllAgregado()" color="secondary" icon>
                                <v-icon>
                                    mdi-checkbox-marked-outline
                                </v-icon>
                            </v-btn>
                            <v-badge overlap :content="participantes_seleccionados.length" :value="participantes_seleccionados.length" color="error" >
                                <v-btn @click="removerParticipantes(participantes_seleccionados)" :disabled="participantes_seleccionados.length == 0" color="primary" icon>
                                    <v-icon>
                                        mdi-delete
                                    </v-icon>
                                </v-btn>
                            </v-badge>
                        </v-col>
                    </v-row>
                    <v-row class="area-container">
                        <v-col cols="12" class="pb-0 pt-0" v-for="(area, key) in areas" :key="key">
                            <v-card v-if="area.participantes.length > 0" elevation="0">
                                <v-card-text class="pb-0">
                                    <v-list-item class="pl-1 pr-0">
                                        <v-list-item-action>
                                            <v-checkbox v-model="area.value_participante" @click="agregarSeccionParticipante(area)"></v-checkbox>
                                        </v-list-item-action>
                                        <v-list-item-content>
                                            <span class="text-button">
                                                {{ area.descripcion }}
                                            </span>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-btn @click="area.expand = !area.expand" icon>
                                                <v-icon>
                                                    {{ area.expand ? 'mdi-chevron-up' : 'mdi-chevron-down'}}
                                                </v-icon>
                                            </v-btn>
                                        </v-list-item-action>
                                    </v-list-item>
                                </v-card-text>
                                <v-card-text v-if="area.expand" class="pt-0 pl-10">
                                    <v-checkbox v-model="empleado.participante_selected" hide-details v-for="(empleado, key) in area.participantes" :key="key" :label="empleado.nombre"></v-checkbox>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style scoped>
    .area-container{
        max-height: 60vh;
        overflow-y: scroll;
    }
</style>

<script>

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    methods: {
        ...mapMutations({
            'agregarSeccion': 'reunion/agregarSeccion',
            'agregarParticipantes': 'reunion/agregarParticipantes',
            'agregarSeccionParticipante': 'reunion/agregarSeccionParticipante',
            'setParticipante': 'reunion/setParticipante',
            'removerParticipantes': 'reunion/removerParticipantes',
            'checkAllDisponibles': 'reunion/checkAllDisponibles',
            'checkAllAgregado': 'reunion/checkAllAgregado'
        })
    },
    computed: {
        ...mapState({
            'areas': state => state.reunion.areas,
            'encabezado': state => state.reunion.encabezado,
        }),
        ...mapGetters({
            disponibles_seleccionados: 'reunion/disponibles_seleccionados',
            participantes_seleccionados: 'reunion/participantes_seleccionados'
        }),
        disponibles: function(){

            const available = this.areas.map(area => {
                
                return area

            });

            return available
        },
        agregados: function(){
            return []
        }
    }
}
</script>