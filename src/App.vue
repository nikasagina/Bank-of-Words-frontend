<!-- src/App.vue -->
<template>
    <div id="app">
        <nav>
            <ul>
                <li v-if="!isAuthenticated">
                    <router-link to="/register">Register</router-link>
                </li>
                <li v-if="!isAuthenticated">
                    <router-link to="/login">Login</router-link>
                </li>
                <li v-if="isAuthenticated">
                    <router-link to="/logout">Logout</router-link>
                </li>
                <li v-if="isAuthenticated">
                    <router-link to="/questions">Questions</router-link>
                </li>
                <li v-if="isAuthenticated">
                    <router-link to="/word-info">Word Info</router-link>
                </li>
                <li v-if="isAuthenticated">
                    <router-link to="/statistics">Statistics</router-link>
                </li>
                <li v-if="isAuthenticated">
                    <router-link to="/upload">Upload</router-link>
                </li>
            </ul>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'App',
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    }
});
</script>