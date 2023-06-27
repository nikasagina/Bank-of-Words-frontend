<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="register">
            <label>Username: <input v-model="username" type="text" /></label>
            <label>Password: <input v-model="password" type="password" /></label>
            <label>Email: <input v-model="email" type="email" /></label>
            <button type="submit">Register</button>
        </form>
        <div v-if="success">
            Registered successfully!
        </div>
        <div v-if="errorMessage.length > 0">
            <ul>
                <li v-for="error in errorMessage" :key="error">{{ error }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import apiService from '@/services/apiService';
import { ref } from 'vue';

export default {
    name: 'RegisterComponent',
    setup() {
        const username = ref('');
        const password = ref('');
        const email = ref('');
        const success = ref(false);
        const errorMessage = ref([]);

        async function register() {
            try {
                const response = await apiService.register(username.value, password.value, email.value);
                const { successful, usernameErrorClass, passwordErrorClass, emailErrorClass } = response.data;
                errorMessage.value = []; // Clear any previous error messages

                if (successful) {
                    success.value = true;
                } else {
                    if (usernameErrorClass) {
                        errorMessage.value.push(usernameErrorClass);
                    }
                    if (passwordErrorClass) {
                        errorMessage.value.push(passwordErrorClass);
                    }
                    if (emailErrorClass) {
                        errorMessage.value.push(emailErrorClass);
                    }

                    if (errorMessage.value.length === 0) {
                        errorMessage.value.push('Registration failed. Please try again.');
                    }
                }
            } catch (error) {
                console.error(error);
                errorMessage.value = ['An error occurred during login. Please try again.'];
            }
        }

        return {
            username,
            password,
            email,
            success,
            errorMessage,
            register
        };
    }
};
</script>
