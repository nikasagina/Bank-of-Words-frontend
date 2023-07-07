<template>
    <div id="app" class="bg-gray-100 flex flex-col min-h-screen">
        <nav class="bg-white shadow mb-2">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <div class="flex-shrink-0 flex items-center">
                            <img class="h-8 w-auto" src="src/assets/logo.png" alt="Logo">
                        </div>
                        <div v-if="isAuthenticated" class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                            <router-link to="/questions" class="text-gray-700 hover:text-gray-900 font-medium tracking-wide transition-colors duration-200 ease-in-out py-4 px-1 border-b-2 border-transparent hover:border-blue-500">Questions</router-link>
                            <router-link to="/word-info" class="text-gray-700 hover:text-gray-900 font-medium tracking-wide transition-colors duration-200 ease-in-out py-4 px-1 border-b-2 border-transparent hover:border-blue-500">Word Info</router-link>
                            <router-link to="/upload" class="text-gray-700 hover:text-gray-900 font-medium tracking-wide transition-colors duration-200 ease-in-out py-4 px-1 border-b-2 border-transparent hover:border-blue-500">Upload</router-link>
                            <router-link to="/profile" class="text-gray-700 hover:text-gray-900 font-medium tracking-wide transition-colors duration-200 ease-in-out py-4 px-1 border-b-2 border-transparent hover:border-blue-500">Profile</router-link>
                        </div>
                    </div>
                    <div v-if="isAuthenticated" class="hidden sm:flex sm:items-center sm:ml-6">
                        <button class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onclick="window.location.href = '/logout'">
                            Logout
                        </button>
                    </div>
                    <div v-else class="hidden sm:flex sm:items-center sm:ml-6">
                        <a href="/login" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300">
                            Login
                        </a>
                        <a href="/register" class="inline-flex items-center ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                            Register
                        </a>
                    </div>
                </div>
            </div>
        </nav>
        <router-view class="flex-grow p-4"></router-view>
        <footer class="bg-white shadow mt-auto">
            <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <div class="text-center text-gray-500">
                    &copy; 2023 Bank of Words
                </div>
            </div>
        </footer>
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