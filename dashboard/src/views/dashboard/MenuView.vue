<template>
	<div>
		<v-card :loading="state.loading" :disabled="state.loading">
			<v-card-title>Menü</v-card-title>
			<v-card-subtitle>Tüm menüleri listeler</v-card-subtitle>

			<v-dialog width="1200" v-model="state.dialog">
				<template v-slot:activator="{ props }">
					<div class="text-right px-4 py-2">
						<v-btn
							v-bind="props"
							variant="elevated"
							prepend-icon="mdi-plus"
							color="indigo-darken-4"
							>Yeni</v-btn
						>
					</div>
				</template>

				<menu-form @change="fetchItems" :selected="state.selected"></menu-form>
			</v-dialog>

			<v-card-text>
				<v-data-table
					:loading="state.loading"
					v-model:items-per-page="state.itemsPerPage"
					:headers="menuHeaders"
					:items="state.data"
				>
					<template v-slot:item.active="{ item }">
						<v-chip :color="item.raw.active ? 'green' : 'red'">{{
							item.raw.active ? 'Aktif' : 'Pasif'
						}}</v-chip>
					</template>

					<template v-slot:item.actions="{ item }">
						<v-icon v-if="item.children.length === 0" icon="mdi-close" @click="removeItem(item.raw)"></v-icon>
						<v-icon
							icon="mdi-book-edit"
							class="ml-4"
							@click="(state.selected = item.raw), (state.dialog = true)"
						></v-icon>
					</template>
				</v-data-table>
			</v-card-text>
		</v-card>
	</div>
</template>

<script setup>
	import { onBeforeMount, reactive, watch } from 'vue';
	import axios from '@/utils/axiosInstance';
	import { menuHeaders } from '@/utils/tableHeaders';
	import MenuForm from '@/components/forms/MenuForm.vue';
	import store from '@/store/store';

	const state = reactive({
		loading: false,
		data: [],
		itemsPerPage: 10,
		dialog: false,
		selected: null,
	});

	const removeItem = async (item) => {
		axios
			.delete('/menu/' + item.id)
			.then((res) => {
				store.dispatch('open', {
					text: 'Menü başarıyla silindi',
					type: 'success',
				});

				fetchItems();
			})
			.catch((err) => {
				store.dispatch('open', {
					text: err.response.data.message,
					type: 'error',
				});
			});
	};

	const fetchItems = async () => {
		state.loading = true;
		const { data } = await axios.get('/menu');

		state.data = data;
		state.dialog = false;
		state.loading = false;
	};

	watch(
		() => state.dialog,
		(val) => {
			if (!val) {
				state.selected = null;
			}
		}
	);

	onBeforeMount(() => {
		fetchItems();
	});
</script>
