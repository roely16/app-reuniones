<template>
    <div class="mt-4">
        <v-container fluid>
            <v-card class="pt-5 pr-5 pl-5 pb-5" outlined>
                <!-- <v-sheet
                tile
                height="54"
                class="d-flex"
                >
                <v-btn
                    icon
                    class="ma-2"
                    @click="$refs.calendar.prev()"
                >
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-select
                    v-model="type"
                    :items="types"
                    dense
                    outlined
                    hide-details
                    class="ma-2"
                    label="type"
                ></v-select>
                <v-select
                    v-model="mode"
                    :items="modes"
                    dense
                    outlined
                    hide-details
                    label="event-overlap-mode"
                    class="ma-2"
                ></v-select>
                <v-select
                    v-model="weekday"
                    :items="weekdays"
                    dense
                    outlined
                    hide-details
                    label="weekdays"
                    class="ma-2"
                ></v-select>
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    class="ma-2"
                    @click="$refs.calendar.next()"
                >
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                </v-sheet> -->

                <v-sheet height="64">
                  <v-toolbar
                    flat
                  >
                    <v-btn
                      outlined
                      class="mr-4"
                      color="grey darken-2"
                    >
                      hoy
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
                    :event-color="getEventColor"
                    @change="getEvents"
                    @click:event="editar_encargado"
                    @click:date="agregar_encargado"
                ></v-calendar>
                
                </v-sheet>
            </v-card>

            <Modal>
              <FormCalendario :date="date" :selectedEvent="selectedEvent"></FormCalendario>
            </Modal>

			<!--  
				TODO
				- Mostrar modal
				- Mostrar formulario
				- Obtener los participantes
				- Registrar el evento
				- Editar el evento
				- Eliminar el evento
				- Mostrar eventos en el calendario 
			-->

        </v-container>
  </div>
</template>

<script>

	import Modal from '@/components/Modal'
	import FormCalendario from '@/components/FormCalendario'

    export default {
		components: {
			Modal,
			FormCalendario
		},
		data: () => ({
		date: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      type: 'month',
      types: ['month', 'week', 'day', '4day'],
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
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
		methods: {
			agregar_encargado({ date }){
				console.log(date);
				console.log('agregar_encargado');
				this.selectedOpen = true
			},
			editar_encargado({ nativeEvent, event }){
				console.log(nativeEvent);
				console.log(event);

				const open = () => {
					this.selectedEvent = event
					this.selectedElement = nativeEvent.target
					setTimeout(() => {
					this.selectedOpen = true
					}, 10)
				}

				if (this.selectedOpen) {
					this.selectedOpen = false
					setTimeout(open, 10)
				} else {
					open()
				}

				nativeEvent.stopPropagation()
				console.log('editar_encargado');
			},
			getEvents ({ start, end }) {
				const events = []

				const min = new Date(`${start.date}T00:00:00`)
				const max = new Date(`${end.date}T23:59:59`)
				const days = (max.getTime() - min.getTime()) / 86400000
				const eventCount = this.rnd(days, days + 20)

				for (let i = 0; i < eventCount; i++) {
					const allDay = this.rnd(0, 3) === 0
					const firstTimestamp = this.rnd(min.getTime(), max.getTime())
					const first = new Date(firstTimestamp - (firstTimestamp % 900000))
					const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
					const second = new Date(first.getTime() + secondTimestamp)

					events.push({
					name: this.names[this.rnd(0, this.names.length - 1)],
					start: first,
					end: second,
					color: this.colors[this.rnd(0, this.colors.length - 1)],
					timed: !allDay,
					})
				}

				this.events = events
			},
			getEventColor (event) {
				return event.color
			},
			rnd (a, b) {
				return Math.floor((b - a + 1) * Math.random()) + a
			},
		},
  }
</script>