<template>
    <div v-if="showRegister" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-75">
        <div class="register-box">
            <button class="close-button" @click="closeRegisterBox">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 class="text-xl font-medium mb-4">Register</h2>
            <form @submit.prevent="register" class="flex flex-col space-y-4">
                <label>
                    <span class="text-gray-700">Username:</span>
                    <input v-model.trim="username" type="text" class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
                </label>
                <label>
                    <span class="text-gray-700">Password:</span>
                    <input v-model.trim="password" type="password" class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
                </label>
                <label>
                    <span class="text-gray-700">Email:</span>
                    <input v-model.trim="email" type="email" class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
                </label>
                <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out" > Register </button>
            </form>
            <div v-if="!success" class="mt-4 text-gray-700 text-sm">
                Already have an account? <a href="/login" class="underline">Login here</a>.
            </div>
            <div v-if="success" class="mt-4 text-green-500 font-medium">
                Registered successfully! Please <a href="/login" class="underline">login here</a>.
            </div>
            <div v-if="errorMessage.length > 0" class="mt-4 text-red-500 font-medium">
                <ul class="list-disc list-inside">
                    <li v-for="error in errorMessage" :key="error">{{ error }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import apiService from '@/services/apiService';
import { ref } from 'vue';
import { useRouter} from "vue-router";

export default {
    name: 'RegisterComponent',
    setup() {
        const router = useRouter();
        const username = ref('');
        const password = ref('');
        const email = ref('');
        const success = ref(false);
        const errorMessage = ref([]);
        const showRegister = ref(true);

        // Variable to show or hide the register box
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
                    if (errorMessage.value.length=== 0) {
                        errorMessage.value.push('Registration failed. Please try again.');
                    }
                }
            } catch (error) {
                console.error(error);
                errorMessage.value = ['An error occurred during registration. Please try again later.'];
            }
        }

        function closeRegisterBox() {
            router.push('/'); // Redirect the user to the home page
        }

        return {
            username,
            password,
            email,
            success,
            errorMessage,
            showRegister,
            register,
            closeRegisterBox,
        };
    },
};
</script>

<style scoped>
.register-box {
    position: relative; /* Set the register-box position to relative */
    background-color: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    width: 25rem;
}

.close-button {
    position: absolute; /* Set the close button position to absolute */
    top: 0.5rem;
    right: 0.5rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
}

.close-button svg {
    width: 1.5rem;
    height: 1.5rem;
}
</style>