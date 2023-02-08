const authModule = {
	state: () => ({
		admin: localStorage.getItem('admin')
			? JSON.parse(localStorage.getItem('admin'))
			: null,
	}),
	getters: {
		isAuthenticated: (state) => {
			return state.admin === null ? false : true;
		},
		credentials: (state) => {
			return state.admin?.credentials || null;
		},
	},
	mutations: {
		login: (state, payload) => {
			state.admin = payload;
		},
	},
	actions: {
		login: ({ commit }, payload) => {
			localStorage.setItem('admin', JSON.stringify(payload));

			commit('login', JSON.stringify(payload));
		},
	},
};

export default authModule;
