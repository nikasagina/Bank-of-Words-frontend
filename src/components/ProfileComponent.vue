<template>
    <div class="flex flex-col items-center">
        <div class="bg-gray-200 h-32 w-32 rounded-full flex items-center justify-center mb-4">
            <span class="text-4xl font-bold text-gray-500">{{ user.username.charAt(0).toUpperCase() }}</span>
        </div>
        <h1 class="text-3xl font-bold">Welcome {{ user.username }}!</h1>
        <p>Email address: {{ user.email }}</p>
        <p>Account created on {{ user.joinDate }}</p>
        <button
            class="bg-indigo-600 text-white px-4 py-2 rounded mt-4"
            onclick="window.location.href = '/logout'">
            Logout
        </button>
    </div>
</template>

<script>
import apiService from '@/services/apiService';
import { reactive, onMounted } from 'vue';

export default {
    name: 'ProfileComponent',
    setup() {
        const user = reactive({
            username: '',
            email: '',
            joinDate: ''
        });

        const getUserInfo = async () => {
            try {
                const response = await apiService.getUserInfo();
                user.username = response.data.username;
                user.email = response.data.email;
                user.joinDate = response.data.joinDate;
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };

        onMounted(() => {
            getUserInfo();
        });

        return {
            user
        };
    }
};
</script>