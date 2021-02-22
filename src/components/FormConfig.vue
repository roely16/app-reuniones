<template>
	<div>
		<v-container>
			<v-form @submit.prevent="cambiar()" ref="form" v-model="valid">
				<v-row class="mt-2">
					<v-col cols="12">
						<v-text-field :type="usuario.mostrar_actual_pass ? 'text' : 'password'" :append-icon="usuario.mostrar_actual_pass ? 'mdi-eye-off' : 'mdi-eye'" @click:append="usuario.mostrar_actual_pass = !usuario.mostrar_actual_pass" :rules="[v => !!v]" hide-details outlined label="Actual Contraseña" autocomplete="off" v-model="usuario.actual_pass"></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field :type="usuario.mostrar_nuevo_pass ? 'text' : 'password'" :append-icon="usuario.mostrar_nuevo_pass ? 'mdi-eye-off' : 'mdi-eye'" @click:append="usuario.mostrar_nuevo_pass = !usuario.mostrar_nuevo_pass" :rules="[v => !!v]" hide-details outlined label="Nueva Contraseña" autocomplete="off" v-model="usuario.nuevo_pass"></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field :type="usuario.mostrar_repite_nuevo_pass ? 'text' : 'password'" :append-icon="usuario.mostrar_repite_nuevo_pass ? 'mdi-eye-off' : 'mdi-eye'" @click:append="usuario.mostrar_repite_nuevo_pass = !usuario.mostrar_repite_nuevo_pass" :rules="[v => !!v]" hide-details outlined label="Repita Nueva Contraseña" autocomplete="off" v-model="usuario.repite_nuevo_pass"></v-text-field>
					</v-col>
				</v-row>

				<v-row class="mt-4">
					<v-col class="text-center">
						<v-btn @click="$emit('closeModal')" large dark>
							CANCELAR
						</v-btn>
						<v-btn type="submit" large color="primary" class="ml-2">
							ACTUALIZAR
						</v-btn>
					</v-col>
				</v-row>
			</v-form>
		</v-container>
	</div>
</template>

<script>

	// eslint-disable-next-line no-unused-vars
	import request from '@/functions/request.js'
	import alert from '@/functions/alert.js'

	export default {
		data(){
			return{
				usuario: {
					actual_pass: null,
					mostrar_actual_pass: false,
					nuevo_pass: null,
					mostrar_nuevo_pass: false,
					repite_nuevo_pass: null,
					mostrar_repite_nuevo_pass: false
				},
				valid: true
			}
		},
		methods: {
			
			cambiar(){

				this.$refs.form.validate()

				if (this.valid) {
					
					if (this.same_new_password) {
						
						const usuario = JSON.parse(localStorage.getItem('app-reuniones'))

						this.usuario.id_usuario = usuario.id

						const data = {
							url: 'actualizar_pass',
							data: this.usuario
						}

						request.post(data)
						.then((response) => {

							alert.show_alert(response.data)
							.then((result) => {

								if (result) {
									
									if (response.data.status == 200) {
									
										localStorage.removeItem('app-reuniones')
										this.$router.push({ name: 'login' })

									}

								}

							})

						})

					}else{

						const data = {
							title: 'Error',
							message: 'La nueva contraseña no coincide',
							type: 'error'
						}

						alert.show_alert(data)

					}
					
				}

			},
			clear(){

				this.usuario = {
					actual_pass: null,
					mostrar_actual_pass: false,
					nuevo_pass: null,
					mostrar_nuevo_pass: false,
					repite_nuevo_pass: null,
					mostrar_repite_nuevo_pass: false
				}

				this.$refs.form.resetValidation()

			}

		},
		computed: {

			same_new_password: function(){

				if (this.usuario.nuevo_pass == this.usuario.repite_nuevo_pass) {
					
					return true

				}

				return false

			}

		}
	}
</script>

<style>

</style>