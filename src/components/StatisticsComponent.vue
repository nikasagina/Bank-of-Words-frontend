<template>
    <div>
        <h2>Statistics</h2>
        <button @click="getUserStatistics">Get Statistics</button>
        <div v-if="statsData">
            <p>Correct answers: {{ statsData.correctAnswers }}</p>
            <p>Incorrect answers: {{ statsData.incorrectAnswers }}</p>
            <p>Questions answered: {{ statsData.totalQuestions }}</p>
        </div>
    </div>
</template>

<script>
import apiService from '@/services/apiService';
import { ref } from 'vue';

export default {
    name: 'StatisticsComponent',
    setup() {
        const statsData = ref(null);

        async function getUserStatistics() {
            try {
                const response = await apiService.getUserStatistics();
                statsData.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }

        return {
            statsData,
            getUserStatistics
        };
    }
};
</script>
