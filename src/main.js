import { createApp } from 'vue';
import App from './App.vue';
import {router} from './router';
import store from './store';
import 'tailwindcss/tailwind.css';

const app = createApp(App);

const token = localStorage.getItem('token');

if (token) {
    store.commit('setAuthentication', { token });
}

app.use(router).use(store).mount('#app');