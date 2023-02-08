<template>
	<v-layout>
		<v-navigation-drawer color="grey-darken-4" v-model="drawer">
			<template v-slot:prepend>
				<v-list-item
					lines="two"
					:title="admin.name + ' ' + admin.surname"
					subtitle="Yönetim Paneli"
				>
					<template v-slot:prepend>
						<v-avatar color="brown-darken-4">
							<v-icon icon="mdi-account"></v-icon>
						</v-avatar>
					</template>
				</v-list-item>
			</template>
			<v-divider></v-divider>

			<v-list nav>
				<template v-for="(list, index) in items">
					<v-list-item
						:active="route.path === list.href" 
						v-if="!list.children"
						:key="list.title + index"
						:title="list.title"
						:prepend-icon="list.icon"
						:to="list.href"
					></v-list-item>

					<v-list-group
						:value="list.title"
						v-else
						:key="list.title + (index + 1)"
					>
						<template v-slot:activator="{ props }">
							<v-list-item
								v-bind="props"
								:prepend-icon="list.icon"
								:title="list.title"
							></v-list-item>
						</template>

						<v-list-item
							v-for="(child, index) in list.children"
							:key="index"
							:title="child.title"
							:to="child.href"
						>
						</v-list-item>
					</v-list-group>
				</template>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar>
			<v-app-bar-nav-icon
				@click="drawer = !drawer"
				:icon="drawer ? 'mdi-close' : 'mdi-menu'"
			></v-app-bar-nav-icon>
			<v-app-bar-title>Replik Yazılım</v-app-bar-title>
			<v-spacer></v-spacer>
			<v-menu>
				<template v-slot:activator="{ props }">
					<v-btn icon="mdi-account" v-bind="props"></v-btn>
				</template>

				<v-list nav>
					<v-list-item title="Ayarlar" to="/settings/account"></v-list-item>

					<v-divider></v-divider>

					<v-list-item
						class="mt-1"
						title="Çıkış Yap"
						to="/settings/logout"
					></v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>

		<v-main>
			<v-container fluid>
				<router-view></router-view>
			</v-container>
		</v-main>
	</v-layout>
</template>

<script setup>
	import { computed, ref } from 'vue';
	import store from '@/store/store';
	import { useRoute } from 'vue-router';

	const route = useRoute();

	const admin = computed(() => store.getters.credentials);

	const drawer = ref(null);

	const items = [
		{
			title: 'Dashboard',
			icon: 'mdi-view-dashboard',
			href: '/',
		},
		{
			title: 'Menüler',
			icon: 'mdi-menu',
			href: '/menu',
		},
		{
			title: 'Sayfalar',
			icon: 'mdi-book-open-page-variant',
			href: '/contents'
		},
		{
			title: 'Ayarlar',
			icon: 'mdi-cog',
			children: [
				{
					title: 'Site Ayarları',
					href: '/settings/general',
				},
				{
					title: 'Çıkış Yap',
					href: '/settings/logout',
				},
			],
		},
	];
</script>
