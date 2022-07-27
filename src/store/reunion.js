import request from '@/functions/request'

const namespaced = true

const state = {
	encabezado: {
		numero: null,
		fecha: null,
		seccion: null,
		metodo: null,
		participantes: [],
		responsable: null,
		id_responsable: null,
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
	],
	metodos: [],
	areas: [],
	participantes_seleccionados: [],
	areas_pendientes: []
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
	},
	setPDF: (state, payload) => {
		state.pdf_url = payload
	},
	setMetodos: (state, payload) => {
		state.metodos = payload
	},
	setAreas: (state, payload) => {
		state.areas = payload
	},
	setParticipante: (state, payload) => {
		state.participantes_seleccionados.push(payload)
	},
	agregarSeccion: (state, payload) => {
		
		payload.empleados.forEach(empleado => {
			empleado.selected = payload.value
		});

	},
	agregarSeccionParticipante: (state, payload) => {

		payload.participantes.forEach(empleado => {
			empleado.participante_selected = payload.value
		});

	},
	agregarParticipantes: (state, payload) => {

		payload.forEach(participante => {
			
			// Validar si existe el area
			const area = state.encabezado.participantes.filter(area => area.codarea == participante.codarea)

			const area_existente = state.areas.filter(area => area.codarea == participante.codarea)

			if (area.length == 0) {

				participante.selected = false
				participante.participante_selected = false

				// No existe el area por lo que se deberá de agregar
				area_existente[0].participantes.push(participante)

				state.encabezado.participantes.push(area_existente[0])

				
			}else{
				area_existente[0].participantes.push(participante)
			}

			let remover_participante = area_existente[0].empleados.filter(empleado => empleado.nit != participante.nit)

			area_existente[0].empleados = remover_participante

		});

	},
	removerParticipantes: (state, payload) => {
		
		payload.forEach(participante => {
			
			// Buscar el area del participante
			const area = state.areas.filter(area => area.codarea == participante.codarea)

			if (area.length > 0) {
				
				participante.participante_selected = false
				participante.selected = false

				// Pasar al array de empleados
				area[0].empleados.push(participante)

				// Remover del array de participantes
				let filter_participantes = area[0].participantes.filter(item => item.nit != participante.nit)

				area[0].participantes = filter_participantes

			}

		});
	},
	setAreasPendientes: (state, payload) => {
		state.areas_pendientes = payload
	}
}

const actions = {

	async agregarResponsable(){
		
	},
	async fetchDataForm({commit, state}){

		try {
			
			const userData = JSON.parse(localStorage.getItem('app-reuniones'))

			state.encabezado.responsable = userData.nombre
			state.encabezado.id_responsable = userData.id
			state.encabezado.seccion = userData.area

			const data = {
				url: 'datos_formulario'
			}

			const response = await request.post(data)

			commit('setMetodos', response.data.metodos)
			
		} catch (error) {
			
			console.log(error)

		}

	},
	async fetchParticipantes({commit}){

		try {
			
			const data = {
				url: 'modulo_participantes'
			}

			const response = await request.post(data)

			commit('setAreas', response.data.areas)

			console.log(response.data)

		} catch (error) {
			
			console.log(error)

		}
	},
	async fetchAreas({commit}){

		try {
			
			const data = {
				url: 'obtener_areas'
			}

			const response = await request.post(data)

			commit('setAreasPendientes', response.data.areas)

			console.log(response.data)

		} catch (error) {
			
			console.log(error)

		}

	}

}

const getters = {

	disponibles_seleccionados(state){

		const selected = []

		state.areas.forEach(area => {
			
			const empleados_seleccionados = area.empleados.filter(empleado => empleado.selected)

			empleados_seleccionados.forEach(empleado => {
				
				selected.push(empleado)

			});

		});

		return selected;
	},
	participantes_seleccionados(state){

		const selected = []

		state.areas.forEach(area => {
			
			const empleados_seleccionados = area.participantes.filter(empleado => empleado.participante_selected)

			empleados_seleccionados.forEach(empleado => {
				
				selected.push(empleado)

			});

		});

		return selected;
	},
	participantes_agregados(state){

		const selected = []

		state.areas.forEach(area => {
			
			area.participantes.forEach(empleado => {
				
				selected.push(empleado)

			});

		});

		return selected;

	}
}

export default {
	namespaced,
	state,
	mutations,
	actions,
	getters
}