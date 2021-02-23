<template>
    <div class="mt-4">
		<v-container fluid>
			<v-card class="pt-5 pr-5 pl-5 pb-5" outlined>
				
				<v-sheet height="64">
					<v-toolbar
						flat
					>
					
						<v-btn
							outlined
							class="mr-4"
							color="grey darken-2"
							@click="type = 'month'"
							:disabled="type == 'month'"
						>
							<v-icon>
								mdi-arrow-left
							</v-icon>
						</v-btn>
						<v-btn
							fab
							text
							small
							color="grey darken-2"
							@click="$refs.calendar.prev()"
						>
							<v-icon small>
							mdi-chevron-left
							</v-icon>
						</v-btn>
						<v-btn
							fab
							text
							small
							color="grey darken-2"
							@click="$refs.calendar.next()"
						>
							<v-icon small>
							mdi-chevron-right
							</v-icon>
						</v-btn>
						<v-toolbar-title v-if="$refs.calendar">
							{{ $refs.calendar.title }}
						</v-toolbar-title>
						<v-spacer></v-spacer>
					</v-toolbar>
				</v-sheet>
				<v-sheet class="mt-4" height="600">
					<v-calendar
						ref="calendar"
						v-model="value"
						:weekdays="weekday"
						:type="type"
						:events="events"
						:event-overlap-mode="mode"
						:event-overlap-threshold="30"
						
						@click:event="editar_encargado"
						@click:date="agregar_encargado"
						@click:more="more"
					></v-calendar>
					
				</v-sheet>
			</v-card>

			<Modal @clear_form="clear_form" ref="modal" :title="title" :fullscreen="fullscreen" :width="width">
				<template #form>
					<FormCalendario ref="form" @saved="obtener_calendario" :idItem="idItem" :idEvento="idEvento" :date="date" :selectedEvent="selectedEvent" @closeModal="close_modal"></FormCalendario>
				</template>
			</Modal>

		</v-container>
  </div>
</template>

<script>

	/* eslint-disable no-unused-vars */


	import Modal from '@/components/Modal'
	import FormCalendario from '@/components/FormCalendario'

	import request from '@/functions/request.js'

    export default {
		components: {
			Modal,
			FormCalendario
		},
		data: () => ({
			date: null,
			title: null,
			fullscreen: false,
			width: null,
			idItem: null,
			idEvento: null,
			selectedEvent: {},
			selectedElement: null,
			selectedOpen: false,
			type: 'month',
			mode: 'stack',
			modes: ['stack', 'column'],
			weekday: [0, 1, 2, 3, 4, 5, 6],
			weekdays: [
				{ text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
				{ text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
				{ text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
				{ text: 'Mon, Wed, Fri', value: [1, 3, 5] },
			],
			value: '',
			events: [],
			colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
		}),
		methods: {
			agregar_encargado({ date }){
				
				this.title = "Agregar Participante"
				this.fullscreen = false
				this.width = "700"
				this.date = date
				this.idItem = null
				this.idEvento = null
				this.$refs.modal.show()

			},
			editar_encargado({ event }){

				if (event.editable) {
					
					this.title = "Editar Participante"
					this.fullscreen = false
					this.width = "700"
					this.date = null
					this.idItem = event.id_persona
					this.idEvento = event.id
					this.$refs.modal.show()

				}

			},
			more({date}){

				this.type = 'day'
				this.value = date

			},
			rnd (a, b) {
				return Math.floor((b - a + 1) * Math.random()) + a
			},
			obtener_calendario(){

				const usuario = JSON.parse(localStorage.getItem('app-reuniones'))

				const data = {

					url: 'obtener_calendario',
					data: {
						id_usuario: usuario.id,
						id_persona: usuario.id_persona
					}

				}

				request.post(data)
				.then((response) => {
					this.events = response.data
				})

			},
			close_modal(){

                this.$refs.modal.close()
				this.idItem = null
				this.idEvento = null

            },
			hoy(){



			},
			clear_form(){

				this.idItem = null
				this.idEvento = null
				this.$refs.form.clear()

			}
		},
		mounted(){

			this.obtener_calendario()

		}
  }
</script>