<template>
    <div>
        <v-row v-if="!loading" class="mt-2">
            <v-col cols="7" class="pr-0 mr-0">
                <v-row class="mb-4">
                    <v-col cols="12" class="pt-0">
                        <v-tabs v-model="tab">
                            <v-tab v-for="(tab, i) in tabs" :key="i">
                                {{ tab.text }}
                            </v-tab>
                        </v-tabs>
                    </v-col>
                </v-row> 
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-card elevation="0">
                            <v-card-text class="mt-0 pt-0">
                                <component v-bind:is="currentTab"></component>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>                  
            </v-col>
            <v-divider class="ml-4 mr-4" vertical></v-divider>
            <v-col>
                <v-row>
                    <v-col cols="12">
                        <vista-previa></vista-previa>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

    </div>
</template>

<style scoped>
    .editor{

        height: 50px;

    }
</style>

<script>

    import Encabezado from '@/components/Reunion/Encabezado'
    import VistaPrevia from '@/components/Reunion/VistaPrevia'

    /* eslint-disable no-unused-vars */
    import request from '@/functions/request.js'
    import alert from '@/functions/alert.js'

    import { mapState, mapActions } from 'vuex'

    export default {
        components: {
           Encabezado,
           'vista-previa': VistaPrevia
        },
        props: {
            idItem: Number
        },
        data () {

            const toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block', 'image', 'video', 'link'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean']                                         // remove formatting button
            ];

            return {
                api: process.env.VUE_APP_API_URL,
                personas: [],
                personas_enviar: [],
                content: null,
                editorOption: {
                    modules: {
                        imageResize: true,
                        imageDrop: true,
                        toolbar: toolbarOptions
                    },
                },
                autoUpdate: true,
                isUpdating: false,
                pdf_vistaprevia: null,
                loading_preview: false,
                observaciones: null,
                sending: false,
                acceso: false,
                participacion: false,
                tab: 0,
                tabs: [
                    {
                        id: 1,
                        text: 'Datos Generales',
                        component: 'Encabezado'
                    },
                    {
                        id: 2,
                        text: 'Agenda',
                        component: 'Agenda'
                    },
                    {
                        id: 3,
                        text: 'Pendientes',
                        component: 'Pendientes'
                    }
                ]
               
            }
        },
        methods: {

            ...mapActions({
                fetchDetail: 'reunion/fetchDetail'
            }),
            personas_compartir(){

                const usuario = JSON.parse(localStorage.getItem('app-reuniones'))

                const data = {

                    url: 'personas_compartir',
                    data: {
                        id_usuario: usuario.id
                    }

                }

                request.post(data)
                .then( (response) => {

                    this.personas = response.data

                    // Asignarles la dirección del api
                    this.personas.forEach(persona => {
                        
                        if (persona.avatar) {
                            
                            persona.avatar = this.api + persona.avatar

                        }

                    });

                })

            },
            recargar_vistaprevia(){

                const usuario = JSON.parse(localStorage.getItem('app-reuniones'))

                this.loading_preview = true

                const data = {

                    url: 'generar_vistaprevia',
                    data: {
                        content: this.content,
                        id: this.idItem,
                        usuario: usuario.id
                    }

                }

                request.post(data)
                .then((response) => {

                    
                    this.pdf_vistaprevia = this.api + response.data.pdf_url
                    this.loading_preview = false
                    
                   
                })

            },
            autosave(){


            },
            remove (item) {
                
                const index = this.personas_enviar.indexOf( item.id )

                if (index >= 0) this.personas_enviar.splice(index, 1)

            },
            compartir(){

                const data = {
                    title: "¿Está seguro?",
                    message: "Se enviará el contenido de la bitácora a cada uno de los participantes seleccionados!",
                    type: "warning",
                    confirm_text: "Si, COMPARTIR!",
                    cancel_text: "Cancelar"
                }

                alert.alert_confirm(data)
                .then((result) => {

                    if (result.isConfirmed) {

                        this.sending = true

                        const usuario = JSON.parse(localStorage.getItem('app-reuniones'))

                        const data = {
                            url: 'compartir_bitacora',
                            data: {
                                id: this.idItem,
                                compartir: this.personas_enviar,
                                enviado_por: usuario.id_persona
                            }
                        }

                        request.post(data)
                        .then((response) => {

                            console.log(response.data)

                            if (response.data) {
                                
                                alert.show_alert(response.data)
                                .then((result) => {
                                    
                                    this.sending = false
                                    
                                })

                            }
                        })

                    }

                })

            },
            registrar(){

                const usuario = JSON.parse(localStorage.getItem('app-reuniones'))

                const reunion = {
                    content: this.content,
                    observaciones: this.observaciones,
                    compartir: this.personas_enviar,
                    registrado_por: usuario.id_persona,
                    id: this.idItem
                }

                const data = {
                    url: !this.idItem ? 'registrar_reunion' : 'editar_reunion',
                    data: reunion
                }

                request.post(data)
                .then((response) => {
                    
                    console.log(response.data)

                    alert.show_alert(response.data)
                    .then((result) => {
                        
                        if (response.data.status == 200) {
                            
                            this.$emit('updateTable')
                            this.$emit('saved', response.data.data)
                            
                        }
                    })
                })

            },
            obtener_detalle(){

                this.fetchDetail(this.idItem)

            },
            clear(){

                this.personas_enviar = []
                this.content = null
                this.observaciones = null
                this.pdf_vistaprevia = null

            },
            verificar_participacion(){

                const usuario = JSON.parse(localStorage.getItem('app-reuniones'))

                const data = {
                    url: 'verificar_participacion',
                    data: {
                        id: usuario.id,
                        id_persona: usuario.id_persona
                    }
                }

                request.post(data)
                .then((response) => {

                    this.acceso = response.data.acceso
                    this.participacion = response.data.participacion

                })

            }

        },
        computed: {

            ...mapState({
                encabezado: state => state.reunion.encabezado,
                loading: state => state.reunion.loading
            }),
            currentTab: function(){

				const name = this.tabs[this.tab].component

				const AsyncComponent = () => ({
					component: import('@/components/Reunion/' + name),				
				})
	
				return AsyncComponent

			}

        },
        watch: {

            idItem: function(val){

                if (val) {
                    
                    this.verificar_participacion()
                    this.obtener_detalle()

                }else{

                    this.clear()

                }

            }

        },
        mounted(){

            if (this.idItem) {
                
                this.verificar_participacion()
                this.obtener_detalle()

            }else{

                this.clear()

            }

            this.verificar_participacion()
            this.personas_compartir()

        }
        
    }
</script>