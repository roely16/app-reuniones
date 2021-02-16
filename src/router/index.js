import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Registro from '../views/Registro.vue'

import Home from '../views/Home'

// eslint-disable-next-line no-unused-vars
import Reuniones from '../views/Reuniones'
import Calendario from '../views/Calendario'
import Participantes from '../views/Participantes'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'login',
		component: Login
	},
	{
		path: '/registro',
		name: 'registro',
		component: Registro
	},
	{
		path: '/home',
		name: 'home',
		component: Home,
		children: [
			{
				path: '/home/reuniones',
				name: 'reuniones',
				component: Reuniones
			},
			{
				path: '/home/calendario',
				name: 'calendario',
				component: Calendario
			},
			{
				path: '/home/participantes',
				name: 'participantes',
				component: Participantes
			}
		]
	}
]

const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {
	
	let usuario = JSON.parse(localStorage.getItem('app-reuniones'))

	if(!usuario){

		usuario = {
			
		}

	}
	
	if (to.name != 'login') {
		
		if (usuario.id == null) {

			return next('/');

		}

	}
	if (to.name == 'login') {

		if (usuario.id != null) {
			
			return next('/home');
		}
	}
	
	next();
});

export default router
