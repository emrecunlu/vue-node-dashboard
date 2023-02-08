<template>
	<v-card :loading="loading" :disabled="loading">
		<v-card-title>Menü</v-card-title>
		<v-card-subtitle>Menü(Ekle, Düzenle)</v-card-subtitle>
		<v-card-text>
			<v-form>
				<v-row>
					<v-col cols="12">
						<v-text-field
							label="Başlık"
							v-model="item.title"
							placeholder="Lütfen başlık giriniz."
						></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field
							label="Slug"
							v-model="item.slug"
							placeholder="Lütfen adres giriniz."
						></v-text-field>
					</v-col>
					<v-col cols="4">
						<v-switch
							label="Aktif"
							color="indigo"
							v-model="item.active"
						></v-switch>
					</v-col>
				</v-row>
			</v-form>
		</v-card-text>
		<v-card-actions>
			<v-btn
				@click="saveItem"
				class="ml-auto"
				color="indigo-darken-4"
				variant="elevated"
				v-if="selected === null"
				prepend-icon="mdi-content-save"
				>Kaydet</v-btn
			>
			<v-btn
				@click="updateItem"
				class="ml-auto"
				color="indigo-darken-4"
				variant="elevated"
				v-if="selected !== null"
				prepend-icon="mdi-refresh"
				>Güncelle</v-btn
			>
		</v-card-actions>
	</v-card>
</template>

<script setup>
	import { defineProps, toRefs, ref, defineEmits } from 'vue';
	import store from '@/store/store';
	import axios from '@/utils/axiosInstance';

	const props = defineProps({
		selected: {
			required: true,
			default: null,
		},
	});

	const emits = defineEmits(['change']);

	const { selected } = toRefs(props);

	const loading = ref(false);

	const item = ref({
		slug: selected.value?.slug,
		title: selected.value?.title,
		active: selected.value?.active,
	});

	const saveItem = () => {
		loading.value = true;

		axios
			.post('/menu/add', item.value)
			.then((res) => {
				store.dispatch('open', {
					text: 'Menü başarıyla eklendi.',
					type: 'success',
				});

				emits('change');
			})
			.catch((err) => {
				store.dispatch('open', {
					text: err.response.data.message,
					type: 'error',
				});
			});

		loading.value = false;
	};
	const updateItem = () => {
		loading.value = true;

		axios
			.put('/menu/' + selected.value.id, item.value)
			.then((res) => {
				store.dispatch('open', {
					text: 'Menü başarıyla güncellendi.',
					type: 'success',
				});

				emits('change');
			})
			.catch((err) => {
				store.dispatch('open', {
					text: err.response.data.message,
					type: 'error',
				});
			});

		loading.value = false;
	};
</script>
