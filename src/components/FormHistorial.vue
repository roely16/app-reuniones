<template>
	<div>
		<v-row>
			<v-col>
				<v-card>

					<v-list>
					<v-list-group
						v-for="item in items"
						:key="item.title"
						v-model="item.active"
						:prepend-icon="item.action"
						no-action
					>
						<template v-slot:activator>
						<v-list-item-content>
							<v-list-item-title v-text="item.title"></v-list-item-title>
						</v-list-item-content>
						</template>

						<v-list-item
						v-for="child in item.items"
						:key="child.title"
						>
						<v-list-item-content>
							<v-list-item-title v-text="child.title"></v-list-item-title>
						</v-list-item-content>
						</v-list-item>
					</v-list-group>
					</v-list>
				</v-card>
			</v-col>
		</v-row>
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
				items: [
        {
          action: 'mdi-ticket',
          items: [{ title: 'List Item' }],
          title: 'Attractions',
        },
        {
          action: 'mdi-silverware-fork-knife',
          active: true,
          items: [
            { title: 'Breakfast & brunch' },
            { title: 'New American' },
            { title: 'Sushi' },
          ],
          title: 'Dining',
        },
        {
          action: 'mdi-school',
          items: [{ title: 'List Item' }],
          title: 'Education',
        },
        {
          action: 'mdi-run',
          items: [{ title: 'List Item' }],
          title: 'Family',
        },
        {
          action: 'mdi-bottle-tonic-plus',
          items: [{ title: 'List Item' }],
          title: 'Health',
        },
        {
          action: 'mdi-content-cut',
          items: [{ title: 'List Item' }],
          title: 'Office',
        },
        {
          action: 'mdi-tag',
          items: [{ title: 'List Item' }],
          title: 'Promotions',
        },
      ],
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
				})

			}

		},
		mounted(){

			console.log(this.idItem);

			this.obtener_datos()

		}
	}
</script>

<style>

</style>