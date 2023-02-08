import { createStore } from 'vuex';

const snackbar = {
	visible: false,
	text: null,
	timeout: 3000,
	type: null,
};

const snackbarModule = {
	state: () => ({
		snackbar,
	}),
	getters: {
		snackbar: (state) => {
			return state.snackbar;
		},
	},
	mutations: {
		open: (state, payload) => {
			state.snackbar = {
            ...state.snackbar,
            visible: true,
				...payload
			};
		},
		close: (state) => {
			state.snackbar = snackbar;
		},
	},
	actions: {
		open: ({ commit }, payload) => {
			commit('open', payload);
		},
		close: ({ commit }) => {
			commit('close');
		},
	},
};

export default snackbarModule;
