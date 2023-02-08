<template>
	<v-app>
		<v-snackbar
			location="right bottom"
			:timeout="snackbar.timeout"
			:color="snackbar.type === 'success' ? 'green' : 'red'"
			v-model="snackbar.visible"
		>
			{{ snackbar.text }}

			<template v-slot:actions>
				<v-btn variant="text" @click="store.dispatch('close')"> Kapat </v-btn>
			</template>
		</v-snackbar>
		<router-view></router-view>
	</v-app>
</template>

<script setup>
	import { computed } from 'vue';
	import store from './store/store';

	const snackbar = computed(() => store.getters.snackbar);
</script>
