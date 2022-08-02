import request from '@/functions/request'

const namespaced = true

const state = {
    loading: false,
    pdf_url: null
}

const mutations = {
    setPDF: (state, payload) => {
		state.pdf_url = payload
	},
    setLoading: (state, payload) => {
        state.loading = payload
    }
}

const actions = {
    async fetchPreview({commit, rootState}){

		try {
			
            console.log(rootState.reunion.areas)

            const participantes = []

            rootState.reunion.areas.forEach(area => {
                
                area.participantes.forEach(empleado => {
                    
                    participantes.push(empleado)

                });

            });

            commit('setLoading', true)

			const data = {
                url: 'procesar_vistaprevia',
                data: {
                    encabezado: rootState.reunion.encabezado,
                    puntos_agenda: rootState.reunion.puntos_agenda,
                    pendientes: rootState.reunion.pendientes,
                    participantes: participantes
                }
            }

			const response = await request.post(data)

			commit('setPDF', process.env.VUE_APP_API_URL + response.data.pdf_url)
            commit('setLoading', false)

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