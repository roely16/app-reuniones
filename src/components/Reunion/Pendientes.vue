<template>
	<div>
		<v-row id="container" ref="container" class="container-pendientes">
			<v-col class="mb-0 pb-0" cols="12" v-for="(pendiente, key) in pendientes" :key="key">
				<span v-if="pendiente.responsable" class="ml-4 text-caption">
					Responsable: <strong>{{ pendiente.nombre_completo }}</strong>
				</span>
				<v-textarea no-resize v-model="pendiente.actividad" label="Tarea" counter maxlength="4000" filled rounded>
					<template v-slot:append>
						<v-icon @click="agregar_responsable(pendiente)" color="primary">
							mdi-account-plus
						</v-icon>
						<v-icon @click="quitar_pendiente(key)" v-if="key > 0" class="ml-2" color="error">
							mdi-delete-outline
						</v-icon>
					</template>
				</v-textarea>
			</v-col>
		</v-row>
		
		<v-divider class="mt-6 mb-4"></v-divider>
		<v-row class="text-center">
			<v-col>
				<v-btn :disabled="last_empty" @click="add_field()" elevation="0" color="primary">
					AGREGAR
					<v-icon>
						mdi-plus
					</v-icon>
				</v-btn>
			</v-col>
		</v-row>

		<modal title="Responsable" width="600" ref="modal">
			<template #form ref="form">
				<responsable :pendiente="pendiente_actual" @update_pendiente="(value) => update_pendiente(value)"></responsable>
			</template>
		</modal>
	</div>
</template>

<style scoped>
	.container-pendientes{
		max-height: 60vh;
		overflow-y: scroll;
	}
</style>

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
		async add_field(){
			this.agregar_pendiente()
			
			await new Promise(r => setTimeout(r, 100));

			var container = this.$el.querySelector("#container");
			container.scrollTop = container.scrollHeight + 250;

		},
		agregar_responsable(pendiente){

			this.fetchAreas()

			this.$refs.modal.show()

			this.pendiente_actual = pendiente

		},
		update_pendiente(value){

			this.pendiente_actual.responsable = value.nit
			this.pendiente_actual.nombre_completo = value.nombre_completo

			this.$refs.modal.close()

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