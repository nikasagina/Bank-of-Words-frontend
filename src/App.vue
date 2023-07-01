<template>
    <div id="app" class="bg-gray-100">
        <nav class="bg-white shadow">
            <ul class="flex justify-around px-4 py-2">
                <li v-if="!isAuthenticated">
                    <router-link to="/register"
                                 class="text-gray-700 hover:text-gray-900 font-medium tracking-wide transition-colors duration-200 ease-in-out">Register</router-link>
                </li>
                <li v-if="!isAuthenticated">
                    <router-link to="/login"
                                 class="text-gray-700 hover:text-gray-900 font-medium tracking-wide transition-colors duration-200 ease-in-out">Login</router-link>
                </li>
                <li v-if="isAuthenticated">
                    <router-link to="/questions"
                                 class="text-gray-700 hover:text-gray-900 font-medium tracking-wide transition-colors duration-200 ease-in-out">Questions</router-link>
                </li>
                <li v-if="isAuthenticated">
                    <router-link to="/word-info"
                                 class="text-gray-700 hover:text-gray-900 font-medium tracking-wide transition-colors duration-200 ease-in-out">Word Info</router-link>
                </li>
                <li v-if="isAuthenticated">
                    <router-link to="/statistics"
                                 class="text-gray-700 hover:text-gray-900 font-medium tracking-wide transition-colors duration-200 ease-in-out">Statistics</router-link>
                </li>
                <li v-if="isAuthenticated">
                    <router-link to="/upload"
                                 class="text-gray-700 hover:text-gray-900 font-medium tracking-wide transition-colors duration-200 ease-in-out">Upload</router-link>
                </li>
                <li v-if="isAuthenticated">
                    <router-link to="/profile"
                                 class="text-gray-700 hover:text-gray-900 font-medium tracking-wide transition-colors duration-200 ease-in-out">Profile</router-link>
                </li>
            </ul>
        </nav>
        <router-view class="p-4"></router-view>
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