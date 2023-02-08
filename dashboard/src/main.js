import * as Vue from 'vue';
import App from './App.vue';
import router from './plugins/router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import store from './store/store';

loadFonts();

const app = Vue.createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);

app.mount('#app');
