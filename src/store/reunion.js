const namespaced = true

const state = {
	encabezado: {
		numero: null,
		fecha: null,
		seccion: null,
		metodo: null,
		participantes: [],
		responsable: [],
		hora_inicio: null,
		hora_fin: null
	},
	puntos_agenda: [
		{
			text: null
		}
	],
	pendientes: [
		{
			actividad: null,
			responsable: null
		}
	]
}

const mutations = {
	agregar_punto: (state) => {
		state.puntos_agenda.push({text: null})
	},
	quitar_punto: (state, payload) => {
		state.puntos_agenda.splice(payload, 1)
	},
	agregar_pendiente: (state) => {
		state.pendientes.push({actividad: null, responsable: null})
	},
	quitar_pendiente: (state, payload) => {
		state.pendientes.splice(payload, 1)
	}
}

const actions = {

	async agregarResponsable(){
		
	}

}

export default {
	namespaced,
	state,
	mutations,
	actions
}