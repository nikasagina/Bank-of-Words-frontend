<template>
    <div v-if="showLogin" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-75">
        <div class="login-box">
            <button @click="closeLoginBox" class="close-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 class="text-xl font-medium mb-4">Login</h2>
            <form @submit.prevent="login" class="flex flex-col space-y-4">
                <label>
                    <span class="text-gray-700">Username:</span>
                    <input
                        v-model.trim="username"
                        type="text"
                        class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                </label>
                <label>
                    <span class="text-gray-700">Password:</span>
                    <input
                        v-model.trim="password"
                        type="password"
                        class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                </label>
                <button
                    type="submit"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out"
                >
                    Login
                </button>
                <div class="mt-4 text-gray-700 text-sm">
                    Don't have an account? <a href="/register" class="underline">Register here</a>.
                </div>
            </form>
            <div v-if="loggedIn" class="mt-4 text-green-500 font-medium">
                Login successful!
            </div>
            <div v-if="errorMessage" class="mt-4 text-red-500 font-medium">
                {{ errorMessage }}
            </div>
        </div>
    </div>
</template>

<script>
import apiService from '@/services/apiService';
import { ref } from 'vue';
import store from "@/store";
import {useRouter} from "vue-router";

export default {
    name: 'LoginComponent',
    setup() {
        const router = useRouter();
        const username = ref('');
        const password = ref('');
        const loggedIn = ref(false); // Variable to track login status
        const errorMessage = ref(''); // Variable to store error message
        const showLogin = ref(true); // Variable to show or hide the login box

        async function login() {
            try {
                const response = await apiService.authenticate(username.value, password.value);
                const token = response.data.token; // Assuming the token is present in the response's "data" field
                if (token) {
                    await store.dispatch('login', { token }); // Call the store's login action to update authentication state
                    errorMessage.value = "";
                    loggedIn.value = true;
                    showLogin.value = false; // Hide the login box when the user logs in
                    await router.push('/profile');
                }
            } catch (error) {
                console.error(error);
                loggedIn.value = false;
                errorMessage.value = 'Authentication failed. Please check your username and password.'; // Update error message
            }
        }

        function closeLoginBox() {
            router.push('/'); // Redirect the user to the home page
        }


        return {
            username,
            password,
            loggedIn,
            errorMessage, // Include errorMessage in the return object
            showLogin, // Include showLogin in the return object
            login,
            closeLoginBox, // Include closeLoginBox in the return object
        };
    },
};
</script>

<style>
.login-box {
    position: relative;
    width: 25rem;
    padding: 30px 40px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
</style>