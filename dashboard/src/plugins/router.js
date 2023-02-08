import * as VueRouter from 'vue-router';
import store from '@/store/store';
import { computed } from 'vue';

const routes = [
	{
		path: '/',
		component: () => import('@/views/layouts/MainLayout.vue'),
		meta: {
			auth: true,
		},
		children: [
			{
				path: '',
				component: () => import('@/views/dashboard/DashboardView.vue'),
			},
			{
				path: 'menu',
				component: () => import('@/views/dashboard/MenuView.vue'),
			},
			{
				path: 'contents',
				component: () => import('@/views/dashboard/ContentView.vue'),
			},
		],
	},
	{
		path: '/login',
		component: () => import('@/views/auth/LoginView.vue'),
	},
];

const router = VueRouter.createRouter({
	history: VueRouter.createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.meta?.auth) {
		const isAuthenticated = store.getters.isAuthenticated;

		if (!isAuthenticated) {
			router.push({ path: '/login' });
		}
	}

	next();
});

export default router;
