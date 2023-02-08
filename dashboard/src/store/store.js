import { createStore } from 'vuex';
import adminModule from './modules/admin';
import snackbarModule from './modules/snackbar';

const store = createStore({
	modules: {
		admin: adminModule,
		snackbar: snackbarModule,
	},
});

export default store;
