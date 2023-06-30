<template>
    <div>
        <h1>Welcome {{ user.username }}!</h1>
        <p>Email: {{ user.email }}</p>
        <p>Account created on {{ user.joinDate }}</p>
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