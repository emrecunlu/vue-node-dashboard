<template>
	<v-card :loading="loading" :disabled="loading">
		<v-card-title>Sayfalar</v-card-title>
		<v-card-subtitle>Sayfa(Ekle, Düzenle)</v-card-subtitle>
		<v-card-text>
			<v-form>
				<v-row>
					<v-col cols="12" md="6">
						<v-text-field
							v-model="content.title"
							label="Başlık"
							placeholder="Lütfen başlık giriniz."
						></v-text-field>
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field
							v-model="content.slug"
							label="Slug"
							placeholder="Lütfen slug giriniz."
						></v-text-field>
					</v-col>
					<v-col cols="12" md="6">
						<v-textarea
							rows="3"
							v-model="content.brief"
							label="Açıklama"
							placeholder="Lütfen açıklama giriniz."
						></v-textarea>
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field
							v-model="content.icon"
							label="İkon"
							placeholder="Lütfen ikon giriniz."
						></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-select
							v-model="content.menuId"
							item-title="title"
							item-value="id"
							label="Üst Menü"
							:items="menus"
						></v-select>
					</v-col>
					<v-col cols="12">
						<v-file-input
							type="file"
							@change="changeHandle"
							accept="image/png, image/jpeg, image/jpg"
							show-size
							label="Resim"
						></v-file-input>
					</v-col>
					<v-col cols="12" class="mb-16">
						<QuillEditor
							type="text"
							v-model:content="content.markdown"
							content-type="html"
							toolbar="full"
						/>
					</v-col>
				</v-row>
			</v-form>
		</v-card-text>
		<v-card-text>
			<v-btn
				@click="saveItem"
				color="indigo-darken-4"
				prepend-icon="mdi-content-save"
				>Kaydet</v-btn
			>
		</v-card-text>
		{{ content }}
	</v-card>
</template>

<script setup>
	import { ref, onBeforeMount, defineEmits } from 'vue';
	import { QuillEditor } from '@vueup/vue-quill';
	import { setFormData } from '@/helpers/helper';
	import store from '@/store/store';
	import axios from '@/utils/axiosInstance';
	import '@vueup/vue-quill/dist/vue-quill.snow.css';

	const loading = ref(false);
	const menus = ref([]);

	const content = ref({
		title: '',
		slug: '',
		brief: '',
		icon: '',
		menuId: 22,
		image: '',
		markdown: '',
	});

	const emits = defineEmits(['change']);

	const saveItem = () => {
		loading.value = true;

		axios
			.post('/content/add', setFormData(content.value))
			.then((res) => {
				console.log(res);

				store.dispatch('open', {text: 'Sayfa başarıyla eklendi.', type: 'success'})

				emits('change');
			})
			.catch((err) => {
				console.log(err);
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

	const changeHandle = (e) => {
		const files = e.target.files;

		if (files.length > 0) {
			content.value.image = files[0];
		}
	};

	onBeforeMount(() => {
		const fetchMenus = async () => {
			loading.value = true;

			const { data } = await axios.get('/menu');

			menus.value = data;
			loading.value = false;
		};

		fetchMenus();
	});
</script>
