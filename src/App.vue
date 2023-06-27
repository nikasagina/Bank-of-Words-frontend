<template>
    <div id="app">
        <nav>
            <ul>
                <li>
                    <router-link to="/register">Register</router-link>
                </li>
                <li>
                    <router-link to="/login">Login</router-link>
                </li>
                <li>
                    <router-link to="/questions">Questions</router-link>
                </li>
                <li>
                    <router-link to="/word-info">Word Info</router-link>
                </li>
                <li>
                    <router-link to="/statistics">Statistics</router-link>
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
});
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
