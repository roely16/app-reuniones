<template>
	<div>
		<v-row class="container-agenda">
			<v-col class="mb-0 pb-0" cols="12" v-for="(pendiente, key) in pendientes" :key="key">
				<v-textarea v-model="pendiente.actividad" no-resize :rows="3" label="Tarea" hide-details filled rounded>
					<template v-slot:append>
						<v-icon @click="agregar_responsable(pendiente)" color="primary">
							mdi-account-plus
						</v-icon>
						<v-icon @click="quitar_pendiente(key)" v-if="key > 0" class="ml-2" color="error">
							mdi-delete-outline
						</v-icon>
					</template>
				</v-textarea>
				<span class="ml-4 text-caption">
					Responsable: <strong>{{ pendiente.responsable }}</strong>
				</span>
			</v-col>
		</v-row>
		
		<v-divider class="mt-10 mb-4"></v-divider>
		<v-row class="text-center">
			<v-col>
				<v-btn :disabled="last_empty" @click="agregar_pendiente()" elevation="0" color="primary">
					<v-icon>
						mdi-plus
					</v-icon>
				</v-btn>
			</v-col>
		</v-row>

		<modal title="Responsable" width="600" ref="modal">
			<template #form ref="form">
				<responsable @update_pendiente="(value) => update_pendiente(value)"></responsable>
			</template>
		</modal>
	</div>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex'

import Dialog from '@/components/Modal'
import Responsable from '@/components/Reunion/ResponsablePendiente'

export default {
	components: {
		'modal': Dialog,
		'responsable': Responsable
	},
	data(){
		return{
			pendiente_actual: null
		}
	},
	methods: {
		...mapMutations({
			quitar_pendiente: 'reunion/quitar_pendiente',
			agregar_pendiente: 'reunion/agregar_pendiente'
		}),
		...mapActions({
			agregarResponsable: 'reunion/agregarResponsable',
			fetchAreas: 'reunion/fetchAreas'
		}),
		agregar_responsable(pendiente){

			this.fetchAreas()

			this.$refs.modal.show()

			this.pendiente_actual = pendiente

		},
		update_pendiente(value){

			console.log(value)
			this.pendiente_actual.responsable = value

		}
	},
	computed: {
		...mapState({
			pendientes: state => state.reunion.pendientes
		}),
		last_empty: function(){

			const size = this.pendientes.length - 1

			if (this.pendientes[size].actividad != null || size == 0) {
				
				return false 
			}

			return true
		}
	}
}
</script>