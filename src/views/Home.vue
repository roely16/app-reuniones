<template>
	<div class="home">
		<v-app>
			
			<v-app-bar clipped-left app color="primary" dark>
				<v-app-bar-nav-icon v-if="!$vuetify.breakpoint.mdAndUp" @click="drawer = !drawer"></v-app-bar-nav-icon>

				<v-toolbar-title>Control de Reuniones</v-toolbar-title>

				<v-spacer></v-spacer>

			</v-app-bar>
			
			<v-navigation-drawer class="elevation-2"  clipped v-model="drawer" :permanent="$vuetify.breakpoint.mdAndUp" app>
				
				<template v-slot:prepend>
					<v-list>
						<v-list-item two-line>
							<v-list-item-avatar height="75" width="75">
								<img contain :src="persona.avatar ? persona.avatar : 'avatar/user.png'">
							</v-list-item-avatar>
							<v-list-item-content>
								
									<v-list-item-title class="subtitle">{{ persona.nombres }} {{ persona.apellidos }}</v-list-item-title>
									<v-list-item-subtitle>{{ persona.cargo }}</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						
					</v-list>
				</template>

				
				<template v-slot:append>
					<!-- <v-list-item  link>
						<v-list-item-icon>
						<v-icon>mdi-logout</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Salir</v-list-item-title>
					</v-list-item> -->
					<div class="pa-2">
						<v-btn @click="salir()" color="red" dark block>
							Salir 
							<v-icon>
								mdi-logout
							</v-icon>
						</v-btn>
					</div>
				</template>

				<v-divider></v-divider>

				<v-list nav dense>
					<v-list-item :to="{ name: item.url }" v-for="(item, index) in menu" :key="index" link>
						<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-title>{{ item.nombre }}</v-list-item-title>
					</v-list-item>
				</v-list>
				
			</v-navigation-drawer>

			<v-container fluid>

				<v-row dense v-if="show_img" justify="center">
					<v-col md="6" cols="12">
						
						<v-img
							src="@/assets/img/logo_muni.jpg"
						></v-img>

					</v-col>
				</v-row>

				<router-view></router-view>
			</v-container>

		</v-app>
	</div>
</template>

<script>

	import request from '@/functions/request'

	export default {
		data(){
			return{
				drawer: false,
				persona: {},
				api: process.env.VUE_APP_API_URL,
				menu: []
			}
		},
		methods: {

			obtener_datos(){

				const usuario = JSON.parse(localStorage.getItem('app-reuniones'))

				const data = {

					url: 'datos_usuario',
					data: {
						id: usuario.id,
						id_persona: usuario.id_persona
					}

				}

				request.post(data)
				.then(( response ) => {

					this.persona = response.data.persona

					if (this.persona.avatar) {
						
						this.persona.avatar = this.api + this.persona.avatar
						
					}

					
					this.menu = response.data.menu

				})

			},
			salir(){

				this.$router.push({ name: 'login' })

			}

		},
		computed: {

			show_img: function(){

				const route = this.$route.name

				if (route === 'home') {
					
					return true

				}

				return false

			}

		},
		mounted(){

			this.obtener_datos()

		}
	}
</script>
