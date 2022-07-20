<template>
	<div>
		<v-row>
			<v-col cols="6">
				<v-text-field v-model="encabezado.numero" rounded hide-details label="No. de Minuta" filled></v-text-field>
			</v-col>
			<v-col cols="6">
				<v-menu
					v-model="menu_fecha"
					:close-on-content-click="false"
					:nudge-right="40"
					transition="scale-transition"
					offset-y
					min-width="auto"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							v-model="encabezado.fecha"
							label="Fecha"
							append-icon="mdi-calendar"
							readonly
							v-bind="attrs"
							v-on="on"
							rounded
							filled
							hide-details
						></v-text-field>
					</template>
					<v-date-picker
					v-model="encabezado.fecha"
					@input="menu_fecha = false"
					></v-date-picker>
				</v-menu>
			</v-col>
			<v-col cols="6">
				<v-text-field v-model="encabezado.seccion" rounded hide-details label="Coordinación, Sección o Unidad" filled></v-text-field>
			</v-col>
			<v-col cols="6">
				<v-select rounded hide-details label="Método" filled></v-select>
			</v-col>
			<v-col cols="6">
				<v-text-field @click:append="false" append-icon="mdi-plus-circle" rounded hide-details label="Participantes" filled></v-text-field>
			</v-col>
			<v-col cols="6">
				<v-text-field @click:append="false"  append-icon="mdi-account" rounded hide-details label="Responsable" filled></v-text-field>
			</v-col>
			<v-col cols="6">
				<v-menu
					ref="menu"
					v-model="menu_inicio"
					:close-on-content-click="false"
					:nudge-right="40"
					:return-value.sync="encabezado.hora_inicio"
					transition="scale-transition"
					offset-y
					max-width="290px"
					min-width="290px"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field v-model="encabezado.hora_inicio" v-bind="attrs" v-on="on" append-icon="mdi-clock" rounded hide-details label="Hora de inicio" readonly filled></v-text-field>
					</template>
					<v-time-picker
						v-if="menu_inicio"
						v-model="encabezado.hora_inicio"
						full-width
						@click:minute="$refs.menu.save(encabezado.hora_inicio)"
					></v-time-picker>
				</v-menu>
			</v-col>
			<v-col cols="6">
				<v-menu
					ref="menu2"
					v-model="menu_fin"
					:close-on-content-click="false"
					:nudge-right="40"
					:return-value.sync="encabezado.hora_fin"
					transition="scale-transition"
					offset-y
					max-width="290px"
					min-width="290px"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field v-model="encabezado.hora_fin" v-bind="attrs" v-on="on" append-icon="mdi-clock" rounded hide-details label="Hora de inicio" readonly filled></v-text-field>
					</template>
					<v-time-picker
						v-if="menu_fin"
						v-model="encabezado.hora_fin"
						full-width
						@click:minute="$refs.menu2.save(encabezado.hora_fin)"
					></v-time-picker>
				</v-menu>
				
			</v-col>
			<v-col cols="12">
				<v-textarea label="Comentarios" :rows="5" no-resize filled rounded hide-details></v-textarea>
			</v-col>
		</v-row>
	</div>
</template>

<script>

import { mapState } from 'vuex'

export default {
	data(){
		return{
			menu_inicio: false,
			menu_fin: false,
			menu_fecha: false
		}
	},
	computed: {
		...mapState({
			encabezado: state => state.reunion.encabezado
		})
	}
}
</script>