import request from '@/functions/request'
import alert from '@/functions/alert'

const namespaced = true

const state = {
    reuniones: [],
    loading: false,
    acceso: false,
    participacion: false
}

const mutations = {
    setReuniones: (state, payload) => {
        state.reuniones = payload
    },
    setLoading: (state, payload) => {
        state.loading = payload
    },
    setAcceso: (state, payload) => {
        state.acceso = payload
    },
    setParticipacion: (state, payload) => {
        state.participacion = payload
    }
}

const actions = {
    async fetchReuniones({commit}){

        try {
            
            commit('setLoading', true)

            let usuario = JSON.parse(localStorage.getItem('app-reuniones'))

            const data = {
                url: 'obtener_reuniones',
                data: {
                    id_usuario: usuario.id
                }
            }

            const response = await request.post(data)

            commit('setReuniones', response.data)
            commit('setLoading', false)

        } catch (error) {
            
            console.log(error)

        }

    },
    async checkParticipacion({commit}){

        try {
            
            const usuario = JSON.parse(localStorage.getItem('app-reuniones'))

            const data = {
                url: 'verificar_participacion',
                data: {
                    id: usuario.id,
                    id_persona: usuario.id_persona
                }
            }

            const response = await request.post(data)

            commit('setAcceso', response.data.acceso)
            commit('setParticipacion', response.data.participacion)

        } catch (error) {

            console.log(error)

        }

    },
    async fetchEliminar({dispatch}, payload){
        try {
            
            const data = {
                title: "¿Está seguro?",
                message: "Una vez eliminado no se podrá recuperar!",
                type: "warning",
                confirm_text: "Si, ELIMINAR!",
                cancel_text: "Cancelar"
            }

            const alert_response = await alert.alert_confirm(data)

            if (alert_response.isConfirmed) {
                
                const data_request = {
                    url: 'eliminar_reunion',
                    data: {
                        id: payload.id
                    }
                }

                const response = await request.post(data_request)

                alert.show_alert(response.data)

                dispatch('fetchReuniones')

            }

        } catch (error) {
            console.log(error)
        }
    }
}

export default {
    namespaced,
    state,
    mutations,
    actions
}