import request from '@/functions/request'

import Swal from 'sweetalert2'

const namespaced = true

const state = {
    destinos: [],
    historial: [],
    sending: false
}

const mutations = {
    setShareData: (state, payload) => {
        state.destinos = payload.destinos
        state.historial = payload.historial
    },
    setSending: (state, payload) => {
        state.sending = payload
    }
}

const actions = {

    async fetchShare({ rootState, commit }){

        try {
            
            const encabezado = rootState.reunion.encabezado

            const userData = JSON.parse(localStorage.getItem('app-reuniones'))

            const data = {
                url: 'share_data',
                data: {
                    id: encabezado.id,
                    id_persona: userData.id_persona
                }
            }

            const response = await request.post(data)

            commit('setShareData', response.data)

        } catch (error) {
            
            console.log(error)

        }

    },
    async share({ commit, state, rootState, dispatch }, payload){

        try {
            
            commit('setSending', true)

            const participantes = []

            rootState.reunion.areas.forEach(area => {
                
                area.participantes.forEach(empleado => {
                    
                    participantes.push(empleado)

                });

            });

            // Obtener los correos de las personas que recibirán la agenda
            const destinos = []

            payload.forEach(id => {
                
                // Obtener la persona
                let persona = state.destinos.filter(destino => destino.id == id)

                destinos.push(persona[0])

            });

            const data = {
                url: 'procesar_vistaprevia',
                data: {
                    destinos: destinos,
                    share: true,
                    encabezado: rootState.reunion.encabezado,
                    puntos_agenda: rootState.reunion.puntos_agenda,
                    pendientes: rootState.reunion.pendientes,
                    participantes: participantes
                }
            }

            const response = await request.post(data)

            commit('setSending', false)
            dispatch('fetchShare')

            Swal.fire(
                'Excelente!',
                'La minuta de reunión ha sido compartida exitosamente.',
                'success'
            )

            console.log(response.data)

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