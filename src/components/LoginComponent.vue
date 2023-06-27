<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <label>Username: <input v-model="username" type="text" /></label>
            <label>Password: <input v-model="password" type="password" /></label>
            <button type="submit">Login</button>
        </form>
        <div v-if="loggedIn">
            Login successful!
        </div>
        <div v-if="errorMessage">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script>
import apiService from '@/services/apiService';
import { ref } from 'vue';

export default {
    name: 'LoginComponent',
    setup() {
        const username = ref('');
        const password = ref('');
        const loggedIn = ref(false); // Variable to track login status
        const errorMessage = ref(''); // Variable to store error message

        async function login() {
            try {
                const response = await apiService.authenticate(username.value, password.value);
                const token = response.data.token; // Assuming the token is present in the response's "data" field
                if (token) {
                    localStorage.setItem('token', token); // Save the token in localStorage
                    loggedIn.value = true; // Set login status to true
                    errorMessage.value = ""
                }
            } catch (error) {
                console.error(error);
                loggedIn.value = false;
                errorMessage.value = 'Authentication failed. Please check your username and password.'; // Update error message
            }
        }

        return {
            username,
            password,
            loggedIn,
            errorMessage, // Include errorMessage in the return object
            login
        };
    }
};
</script>
