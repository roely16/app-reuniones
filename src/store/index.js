import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import reunion from './reunion'
import lista_minutas from './lista_minutas'
import dialog from './dialog'

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		reunion: reunion,
		lista_minutas: lista_minutas,
		dialog: dialog
	}
})
