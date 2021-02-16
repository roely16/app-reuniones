<template>
	<div>
		<v-container>
			<v-row>
			<v-col>
				<v-card>

					<v-card-text v-if="historial_envios.length <= 0">
						<h2 class="text-center">
							Esta bitácora aún no se ha compartido.
						</h2>
					</v-card-text>
					<v-list>
						<v-list-group
							v-for="historial in historial_envios"
							:key="historial.id"
							v-model="historial.active"
							prepend-icon="mdi-email-send"
							no-action
						>
							<template v-slot:activator>
								<v-list-item-content>
									<v-list-item-title v-text="historial.created_at"></v-list-item-title>
									<v-list-item-subtitle>Enviado por: {{ historial.persona_envia }}</v-list-item-subtitle>
								</v-list-item-content>
								</template>

								<v-list-item
									v-for="envio in historial.detalle_envio"
									:key="envio.id"
								>
								<v-list-item-avatar>
									<v-img
										:src="envio.avatar ? api + envio.avatar : 'avatar/user.png'"
									></v-img>
								</v-list-item-avatar>

								<v-list-item-content>
									<v-list-item-title v-text="envio.persona_envio"></v-list-item-title>
									<v-list-item-subtitle>{{ envio.cargo }}</v-list-item-subtitle>
									<v-list-item-subtitle>
										<small>{{ envio.email }}</small>
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-list-group>
					</v-list>
				</v-card>
			</v-col>
		</v-row>
		</v-container>
	</div>
</template>

<script>

	import request from '@/functions/request.js'

	export default {
		props: {
            idItem: Number
        },
		data(){
			return{
				historial_envios: [],
				api: process.env.VUE_APP_API_URL,
			}
		},
		methods: {

			obtener_datos(){

				const data = {
					url: 'historial_envios',
					data: {
						id: this.idItem
					}
				}

				request.post(data)
				.then((response) => {
					console.log(response.data)
					this.historial_envios = response.data
				})

			}

		},
		watch: {

			idItem: function(val){

                if (val) {
                    
                    this.obtener_datos()

                }

            }

		},
		mounted(){

			this.obtener_datos()

		}
	}
</script>

<style>

</style>