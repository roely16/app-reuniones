<template>
	<div>
		<v-row class="container-agenda">
			<v-col class="mb-0 pb-0" cols="12" v-for="(punto, key) in puntos_agenda" :key="key">
				<v-textarea v-model="punto.text" label="Punto de Agenda" hide-details filled rounded>
					<template v-slot:append>
						<v-icon @click="quitar_punto(key)" v-if="key > 0" color="error">
							mdi-delete-outline
						</v-icon>
					</template>
				</v-textarea>
			</v-col>
		</v-row>
		
		<v-divider class="mt-10 mb-4"></v-divider>
		<v-row class="text-center">
			<v-col>
				<v-btn :disabled="last_empty" @click="agregar_punto()" elevation="0" color="primary">
					<v-icon>
						mdi-plus
					</v-icon>
				</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<style>
	.container-agenda{
		max-height: 60vh;
		overflow-y: scroll;
	}
</style>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
	methods: {
		...mapMutations({
			agregar_punto: 'reunion/agregar_punto',
			quitar_punto: 'reunion/quitar_punto'
		})
	},
	computed: {
		...mapState({
			puntos_agenda: state => state.reunion.puntos_agenda
		}),
		last_empty: function(){

			const size = this.puntos_agenda.length - 1

			if (this.puntos_agenda[size].text != null || size == 0) {
				
				return false 
			}

			return true
		}
	}
}
</script>