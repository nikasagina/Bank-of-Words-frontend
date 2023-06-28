import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import LogoutComponent from "@/components/LogoutComponent.vue";
import QuestionsComponent from "@/components/QuestionsComponent.vue";
import WordInfoComponent from "@/components/WordInfoComponent.vue";
import StatisticsComponent from "@/components/StatisticsComponent.vue";
import UploadComponent from "@/components/UploadComponent.vue";

const routes = [
    { path: '/register', component: RegisterComponent },
    { path: '/login', component: LoginComponent },
    { path: '/logout', component: LogoutComponent },
    { path: '/questions', component: QuestionsComponent },
    { path: '/word-info', component: WordInfoComponent },
    { path: '/statistics', component: StatisticsComponent },
    { path: '/upload', component: UploadComponent },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp({});
app.use(router);
app.mount('#app');