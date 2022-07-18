<template>
	<div>
		<v-row>
			<v-col cols="6">
				<v-text-field rounded hide-details label="No. de minuta" filled></v-text-field>
			</v-col>
			<v-col cols="6">
				<v-text-field append-icon="mdi-calendar" rounded hide-details label="Fecha" filled></v-text-field>
			</v-col>
			<v-col cols="6">
				<v-text-field rounded hide-details label="Coordinación, Sección o Unidad" filled></v-text-field>
			</v-col>
			<v-col cols="6">
				<v-select rounded hide-details label="Método" filled></v-select>
			</v-col>
			<v-col cols="6">
				<v-text-field append-icon="mdi-plus-circle" rounded hide-details label="Participantes" filled></v-text-field>
			</v-col>
			<v-col cols="6">
				<v-text-field append-icon="mdi-plus-circle" rounded hide-details label="Responsable" filled></v-text-field>
			</v-col>
			<v-col cols="6">
				
				<v-menu
					ref="menu"
					v-model="menu2"
					:close-on-content-click="false"
					:nudge-right="40"
					:return-value.sync="time"
					transition="scale-transition"
					offset-y
					max-width="290px"
					min-width="290px"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field v-bind="attrs" v-on="on" append-icon="mdi-clock" rounded hide-details label="Hora de inicio" filled></v-text-field>
					</template>
				</v-menu>
				
			</v-col>
			<v-col cols="6">
				<v-text-field append-icon="mdi-clock" rounded hide-details label="Hora de finalización" filled></v-text-field>
			</v-col>
		</v-row>
	</div>
</template>