import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import LogoutComponent from "@/components/LogoutComponent.vue";
import QuestionsComponent from "@/components/QuestionsComponent.vue";
import WordInfoComponent from "@/components/WordInfoComponent.vue";
import StatisticsComponent from "@/components/StatisticsComponent.vue";
import UploadComponent from "@/components/UploadComponent.vue";
import WelcomeComponent from "@/components/WelcomeComponent.vue";
import ProfileComponent from "@/components/ProfileComponent.vue";
import store from "@/store";

const routes = [
    { path: '/', component: WelcomeComponent },
    { path: '/register', component: RegisterComponent },
    { path: '/login', component: LoginComponent },
    { path: '/logout', component: LogoutComponent },
    { path: '/questions', component: QuestionsComponent },
    { path: '/word-info', component: WordInfoComponent },
    { path: '/statistics', component: StatisticsComponent },
    { path: '/upload', component: UploadComponent },
    {path: '/profile', component: ProfileComponent},
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;

    if (!isAuthenticated && to.path !== '/login' && to.path !== '/register' && to.path !== '/' ) {
        // Redirect to login page if user is not authenticated and tries to access any page except login/register
        next({ path: '/login' });
    } else if ((to.path === '/login' || to.path === '/register' || to.path === '/') && isAuthenticated) {
        // Redirect to home page if user is already authenticated and tries to access login/register page
        next({ path: '/profile' });
    } else {
        // Continue with navigation
        next();
    }
});

const app = createApp({});
app.use(router);
app.mount('#app');