<template>
	<div>

		<v-container>
			<v-form ref="form" v-model="valid" @submit.prevent="!idItem ? registrar() : editar()">
				<v-row align="center" justify="center" class="mt-2">
					<v-col cols="8">
						<v-autocomplete :rules="[v => !!v]" v-model="participanteSelect" chips :items="participantes" item-text="nombre" item-value="id" hide-details outlined label="Participante">

							<template v-slot:selection="data">
								<v-chip
									v-bind="data.attrs"
									:input-value="data.selected"
									close
									@click="data.select"
									@click:close="remove()"
								>
									<v-avatar left>
										<v-img :src="data.item.avatar ? api + data.item.avatar : 'avatar/user.png'"></v-img>
									</v-avatar>
									{{ data.item.nombre }}
								</v-chip>
							</template>
							<template v-slot:item="data">
								
								<template>
									<v-list-item-avatar>
										<img :src="data.item.avatar ? api + data.item.avatar : 'avatar/user.png'">
									</v-list-item-avatar>
									<v-list-item-content>
										<v-list-item-title v-html="data.item.nombre"></v-list-item-title>
										<v-list-item-subtitle v-html="data.item.cargo"></v-list-item-subtitle>
									</v-list-item-content>
								</template>
							</template>

						</v-autocomplete>
					</v-col>
				</v-row>

				<v-row class="mt-4 mb-2">
                    <v-col class="text-center">
                        <v-btn @click="$emit('closeModal')" large dark>
                            CANCELAR
                        </v-btn>
                        <v-btn type="submit" large color="primary" class="ml-2">
                            {{ idItem ? 'GUARDAR' : 'REGISTRAR' }}
                        </v-btn>
						<v-btn @click="eliminar()" dark v-if="idItem" large color="red" class="ml-2">
                            ELIMINAR
                        </v-btn>
                    </v-col>
                </v-row>

			</v-form>
		</v-container>

	</div>
</template>

<script>

	import request from '@/functions/request.js'
	import alert from '@/functions/alert.js'

	export default {
		props: {
			date: String,
			idItem: Number,
			idEvento: Number
		},
		data(){

			return{
				selectedEvent: {},
				selectedElement: null,
				selectedOpen: false,
				participantes: [],
				api: process.env.VUE_APP_API_URL,
				participanteSelect: null,
				valid: true,
				colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
			}
		},
		methods: {
			obtener_datos(){

				const usuario = JSON.parse(localStorage.getItem('app-reuniones'))

				const data = {

					url: 'personas_calendario',
					data: {
						id_usuario: usuario.id,
						id_persona: usuario.id_persona
					}

				}

				request.post(data)
				.then((response) => {

					this.participantes = response.data

				})

			},
			registrar(){

				this.$refs.form.validate()

				if (this.valid) {
					
					const usuario = JSON.parse(localStorage.getItem('app-reuniones'))

					const data = {
						url: 'registrar_calendario',
						data: {
							id_persona: this.participanteSelect,
							fecha: this.date,
							color: this.colors[this.rnd(0, this.colors.length - 1)],
							id_usuario: usuario.id
						}
					}

					request.post(data)
					.then((response) => {
						
						alert.show_alert(response.data)
						.then(() => {

							if (response.data.status == 200) {
								
								this.$emit('saved')
								this.$emit('closeModal')
							}

						})

					})

				}

			},
			remove () {
                
                this.participanteSelect = null

            },
			rnd (a, b) {
				return Math.floor((b - a + 1) * Math.random()) + a
			},
			editar(){

				this.$refs.form.validate()

				if (this.valid) {

					const data = {
						url: 'editar_calendario',
						data: {
							id: this.idEvento,
							id_persona: this.participanteSelect,
						}
					}

					request.post(data)
					.then((response) => {
						
						alert.show_alert(response.data)
						.then(() => {

							if (response.data.status == 200) {
								
								this.$emit('saved')
								this.$emit('closeModal')
							}

						})

					})

				}

			},
			clear(){

				this.participanteSelect = null
				this.$refs.form.resetValidation()

			},
			eliminar(){

				const data = {
                    title: "¿Está seguro?",
                    message: "Una vez eliminado no se podrá recuperar!",
                    type: "warning",
                    confirm_text: "Si, ELIMINAR!",
                    cancel_text: "Cancelar"
                }

                alert.alert_confirm(data)
                .then((result) => {

					if (result.isConfirmed) {

						const data = {
							url: 'eliminar_evento',
							data: {
								id: this.idEvento
							}
						}

						request.post(data)
						.then((response) => {
							
							alert.show_alert(response.data)
                            .then(() => {

                                if (response.data.status == 200) {
                                    
                                    this.$emit('saved')
									this.$emit('closeModal')

                                }

                            })

						})

					}

				})

			}

		},
		watch: {

			idItem: function(val){

				if (val) {
					
					this.participanteSelect = this.idItem

				}else{

					this.participanteSelect = null

					this.$refs.form.resetValidation()

				}

			}

		},
		mounted(){

			if (this.idItem) {
				
				this.participanteSelect = this.idItem

			}else{

				this.participanteSelect = null

				this.$refs.form.resetValidation()

			}

			this.obtener_datos()

		}
	}
</script>

<style>

</style>