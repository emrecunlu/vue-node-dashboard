<template>
	<div class="h-screen d-flex align-center justify-center bg-grey-lighten-4">
		<v-container fluid>
			<v-card
				:loading="loading"
				:disabled="loading"
				class="mx-auto pa-4"
				max-width="800"
			>
				<div class="text-center pb-8 pt-4">
					<v-avatar color="indigo-darken-4" size="56">
						<v-icon icon="mdi-account"></v-icon>
					</v-avatar>
				</div>
				<v-card-title>Yönetim Paneli</v-card-title>
				<v-card-subtitle>Giriş yapmak için formu doldurunuz.</v-card-subtitle>
				<v-card-text class="pt-8">
					<v-form>
						<v-row dense>
							<v-text-field
								v-model="admin.username"
								:error="v$.username.error"
								:error-messages="validationErrors(v$.username)"
								label="Kullanıcı Adı"
							></v-text-field>
						</v-row>
						<v-row>
							<v-text-field
								:error="v$.password.error"
								:error-messages="validationErrors(v$.password)"
								v-model="admin.password"
								label="Şifre"
								type="password"
							></v-text-field>
						</v-row>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-btn
						:loading="loading"
						@click="loginHandle"
						variant="elevated"
						class="ml-auto"
						color="indigo-darken-4"
						prepend-icon="mdi-login"
						>Giriş Yap</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-container>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { useVuelidate } from '@vuelidate/core';
	import { authValidation } from '@/utils/validations';
	import { useRouter } from 'vue-router';
	import { validationErrors } from '@/helpers/helper';
	import store from '@/store/store';
	import axios from '@/utils/axiosInstance';

	const router = useRouter();

	const admin = ref({
		username: '',
		password: '',
	});

	const loading = ref(false);

	const v$ = useVuelidate(authValidation, admin);

	const loginHandle = () => {
		v$.value.$validate();

		if (!v$.value.$error) {
			loading.value = true;

			axios
				.post('/auth/login', admin.value)
				.then((res) => {
					loading.value = false;

					const { accessToken, refreshToken, credentials } = res.data;

					store.dispatch('open', { text: 'Giriş Başarılı!', type: 'success' });

					store.dispatch('login', { accessToken, refreshToken, credentials });

					router.push({ path: '/' });
				})
				.catch((err) => {
					loading.value = false;

					const { message } = err.response.data;

					store.dispatch('open', { text: message });
				});
		}
	};
</script>
