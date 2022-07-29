import request from '@/functions/request'

const namespaced = true

const state = {
    destinos: [],
    historial: []
}

const mutations = {
    setShareData: (state, payload) => {
        state.destinos = payload.destinos
        state.historial = payload.historial
    }
}

const actions = {

    async fetchShare({ rootState, commit }){

        try {
            
            const encabezado = rootState.reunion.encabezado

            const data = {
                url: 'share_data',
                data: {
                    id: encabezado.id
                }
            }

            const response = await request.post(data)

            commit('setShareData', response.data)

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