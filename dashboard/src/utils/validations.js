import { computed } from 'vue';
import { required, helpers } from '@vuelidate/validators';

export const authValidation = computed(() => ({
	username: {
		reqiured: helpers.withMessage(
			'Lütfen kullanıcı adınızı giriniz.',
			required
		),
	},
	password: {
		reqiured: helpers.withMessage('Lütfen şifrenizi giriniz.', required),
	},
}));
