import request from '@/functions/request'

const namespaced = true

const state = {
	
		encabezado: {
			id: null,
			fecha: null,
			seccion: null,
			metodo: null,
			participantes: [],
			responsable: null,
			id_responsable: null,
			hora_inicio: null,
			hora_fin: null,
			comentarios: null
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
		areas_pendientes: [],
		saving: false,
		responsable_detalle: {},
		loading: false,
		search1: null
	
  }

const mutations = {
	agregar_punto: (state) => {
		state.puntos_agenda.push({text: null})
	},
	quitar_punto: (state, payload) => {
		state.puntos_agenda.splice(payload, 1)
	},
	agregar_pendiente: async (state) => {
		await state.pendientes.push({actividad: null, responsable: null})
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
			empleado.participante_selected = payload.value_participante
		});

	},
	agregarParticipantes: (state, payload) => {

		payload.forEach(participante => {
		
			participante.selected = false
			participante.participante_selected = false

			const area_existente = state.areas.filter(area => area.codarea == participante.codarea)

			area_existente[0].participantes.push(participante)

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

				area[0].value = false
				area[0].value_participante = false

			}

		});
	},
	setAreasPendientes: (state, payload) => {
		state.areas_pendientes = payload
	},
	updateEncabezado: (state, payload) => {

		state.encabezado.id = payload.id
		state.encabezado.created_at = payload.created_at
		state.encabezado.updated_at = payload.updated_at

	},
	setSaving: (state, payload) => {

		state.saving = payload

	},
	setResponsableDetalle: (state, payload) => {
		state.responsable_detalle = payload
	},
	checkAllDisponibles: (state) => {

		state.areas.forEach(area => {
			
			area.value = !area.value

			area.empleados.forEach(empleado => {

				empleado.selected = !empleado.selected

			})

		});

	},
	checkAllAgregado: (state) => {

		state.areas.forEach(area => {
			
			area.value_participante = !area.value_participante

			area.participantes.forEach(participante => {
				
				participante.participante_selected = area.value_participante

			});

		});
	},
	setLoading: (state, payload) => {
		state.loading = payload
	},
	clearForm: (state) => {

		state.encabezado = {
			id: null,
			fecha: null,
			seccion: null,
			metodo: null,
			participantes: [],
			responsable: null,
			id_responsable: null,
			hora_inicio: null,
			hora_fin: null,
			comentarios: null
		}

		state.puntos_agenda = [
			{
				text: null
			}
		]

		state.pendientes = [
			{
				actividad: null,
				responsable: null
			}
		]

		state.metodos = []

		state.areas = []

		state.participantes_seleccionados = []
		
		state.areas_pendientes = []
		
		state.saving = false

		state.responsable_detalle = {}
		
		state.loading = false

	},
	setSearch1: (state, payload) => {
		state.search1 = payload
	}

}

const actions = {

	async fetchDataForm({commit, state}){

		try {
			
			const userData = JSON.parse(localStorage.getItem('app-reuniones'))

			state.encabezado.responsable = userData.nombre
			state.encabezado.id_responsable = userData.id_persona
			state.encabezado.seccion = userData.area
			state.encabezado.codarea = userData.codarea
			state.encabezado.nit = userData.nit

			const data = {
				url: 'datos_formulario'
			}

			const response = await request.post(data)

			commit('setMetodos', response.data.metodos)
			
		} catch (error) {
			
			console.log(error)

		}

	},
	async fetchParticipantes({state, commit}){

		try {
			
			const data = {
				url: 'modulo_participantes'
			}

			const response = await request.post(data)

			if (state.areas.length == 0) {
	
				commit('setAreas', response.data.areas)

			}

			console.log(response.data)

		} catch (error) {
			
			console.log(error)

		}
	},
	async fetchAreas({ commit }){

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

	},
	async saveReunion({ state, commit, dispatch, getters }){

		try {
			
			commit('setSaving', true)

			const data_reunion = {
				encabezado: state.encabezado,
				puntos_agenda: state.puntos_agenda,
				pendientes: state.pendientes,
				participantes: getters.participantes_agregados
			}

			const data = {
				url: 'registrar_reunion',
				data: data_reunion
			}

			const response = await request.post(data)

			commit('updateEncabezado', response.data.encabezado)
			dispatch('vistaprevia/fetchPreview', null, {root: true})

			commit('setSaving', false)

			console.log(response.data)


		} catch (error) {
			
			console.log(error)
			commit('setSaving', false)

		}

	},
	async detalleColaborador({ commit }, payload){

		try {
			
			const data = {
				url: 'detalle_colaborador',
				data: {
					nit: payload
				}
			}

			const response = await request.post(data)

			commit('setResponsableDetalle', response.data.colaborador)

		} catch (error) {
			
			console.log(error)

		}

	},
	async fetchDetail({ state, dispatch, commit }, payload){
		
		try {
			
			// Mostrar estado de cargando

			commit('setLoading', true)

			const data = {
				url: 'detalle_reunion',
				data: {
					id: payload
				}
			}

			const response = await request.post(data)

			state.encabezado = response.data.encabezado

			state.puntos_agenda = response.data.puntos_agenda.length > 0 ? response.data.puntos_agenda : [{text: null}]

			state.pendientes = response.data.pendientes.length > 0 ? response.data.pendientes : [{actividad: null, responsable: null}]

			state.areas = response.data.areas

			// Obtener la vista previa 
			dispatch('vistaprevia/fetchPreview', null, {root: true})
			commit('setLoading', false)

		} catch (error) {
			
			console.log(error)

		}

	}

}

const getters = {

	disponibles_seleccionados(state){

		const selected = []

		state.areas.forEach(area => {
			
			const empleados_seleccionados = area.empleados.filter(empleado => empleado.selected == true)

			empleados_seleccionados.forEach(empleado => {
				
				selected.push(empleado)

			});

		});

		return selected;
	},
	participantes_seleccionados(state){

		const selected = []

		state.areas.forEach(area => {
			
			const empleados_seleccionados = area.participantes.filter(empleado => empleado.participante_selected  == true)

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

	},
	disponiblesFiltered(state){

		if (!state.search1) {
			return state.areas
		}

		state.areas.forEach(area => {

			// El filtro en cada iteración de realizar sobre el total
			const empleados_bk = area.empleados_bk

			// var uniqueResultOne = empleados_bk.filter(function(obj) {
			// 	return !area.empleados.some(function(obj2) {
			// 		return obj.nombre == obj2.nombre;
			// 	});
			// });

			// console.log(uniqueResultOne)

			const filtered = empleados_bk.filter(empleado => empleado.nombre.toLowerCase().indexOf(state.search1.toLowerCase()) > -1)

			area.empleados = filtered

		})

		return state.areas

	}
}

export default {
	namespaced,
	state,
	mutations,
	actions,
	getters
}