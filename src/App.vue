<template>
    <div id="app" class="bg-gray-100 flex flex-col min-h-screen">
        <nav class="bg-white shadow mb-2">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <div v-if="isAuthenticated" class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                            <router-link to="/questions" class="text-gray-700 hover:text-gray-900 font-medium tracking-wide transition-colors duration-200 ease-in-out py-4 px-1 border-b-2 border-transparent hover:border-blue-500">Questions</router-link>
                            <router-link to="/word-info" class="text-gray-700 hover:text-gray-900 font-medium tracking-wide transition-colors duration-200 ease-in-out py-4 px-1 border-b-2 border-transparent hover:border-blue-500">Word Info</router-link>
                            <router-link to="/upload" class="text-gray-700 hover:text-gray-900 font-medium tracking-wide transition-colors duration-200 ease-in-out py-4 px-1 border-b-2 border-transparent hover:border-blue-500">Upload</router-link>
                            <router-link to="/tables" class="text-gray-700 hover:text-gray-900 font-medium tracking-wide transition-colors duration-200 ease-in-out py-4 px-1 border-b-2 border-transparent hover:border-blue-500">Tables</router-link>
                            <router-link to="/flashcards" class="text-gray-700 hover:text-gray-900 font-medium tracking-wide transition-colors duration-200 ease-in-out py-4 px-1 border-b-2 border-transparent hover:border-blue-500">Flashcards</router-link>
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
                    <!-- Menu button for small screens -->
                    <div class="sm:hidden flex items-center">
                        <button @click="showMenu = !showMenu" class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" aria-label="Main menu">
                            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <!-- Responsive menu for small screens -->
                <div :class="{'block': showMenu, 'hidden': !showMenu}" class="sm:hidden">
                    <div class="pt-2 pb-3 space-y-1">
                        <router-link to="/questions" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition duration-150 ease-in-out">Questions</router-link>
                        <router-link to="/word-info" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition duration-150 ease-in-out">Word Info</router-link>
                        <router-link to="/upload" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition duration-150 ease-in-out">Upload</router-link>
                        <router-link to="/tables" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition duration-150 ease-in-out">Tables</router-link>
                        <router-link to="/flashcards" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition duration-150 ease-in-out">Flashcards</router-link>
                        <router-link to="/profile" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition duration-150 ease-in-out">Profile</router-link>
                    </div>
                    <div class="pt-4 pb-3 border-t border-gray-200">
                        <div class="mt-3 space-y-1">
                            <a href="/logout" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition duration-150 ease-in-out">Logout</a>
                        </div>
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
    },
    data() {
        return {
            showMenu: false
        }
    }
});
</script>