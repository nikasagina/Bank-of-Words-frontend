import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import LogoutComponent from "@/components/LogoutComponent.vue";
import QuestionsComponent from "@/components/QuestionsComponent.vue";
import WordInfoComponent from "@/components/WordInfoComponent.vue";
import StatisticsComponent from "@/components/StatisticsComponent.vue";
import UploadWordComponent from "@/components/UploadWordComponent.vue";
import UploadBookComponent from "@/components/UploadBookComponent.vue";

const routes = [
    { path: '/register', component: RegisterComponent },
    { path: '/login', component: LoginComponent },
    { path: '/logout', component: LogoutComponent },
    { path: '/questions', component: QuestionsComponent },
    { path: '/word-info', component: WordInfoComponent },
    { path: '/statistics', component: StatisticsComponent },
    { path: '/upload/word', component: UploadWordComponent },
    { path: '/upload/book', component: UploadBookComponent },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp({});
app.use(router);
app.mount('#app');