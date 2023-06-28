<template>
    <div>
        <h2>Statistics</h2>
        <button @click="showUserStats = true; showGlobalStats = false; getUserStatistics()">Get User Statistics</button>
        <button @click="showGlobalStats = true; showUserStats = false; getGlobalStatistics()">Get Global Statistics</button>
        <div v-if="showUserStats && statsData">
            <div> User Statistics </div>
            <p>Correct answers: {{ statsData.success_guesses_count }}</p>
            <p>Incorrect answers: {{ statsData.total_guesses_count - statsData.success_guesses_count }}</p>
            <p>Questions answered: {{ statsData.total_guesses_count }}</p>
            <p>Success rate: {{ Math.floor(statsData.success_rate * 100) }}%</p>
            <p>Most guessed word: {{ statsData.most_guessed_word }}</p>
            <p>Least guessed word: {{ statsData.least_guessed_word }}</p>
        </div>

        <div v-if="showGlobalStats && globalStatsData">
            <div> Global Statistics </div>
            <p>Top user: {{ globalStatsData.top_user }}</p>
            <p>Most guessed word: {{ globalStatsData.most_guessed_word }}</p>
            <p>Least guessed word: {{ globalStatsData.least_guessed_word }}</p>
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
        const globalStatsData = ref(null);
        const showUserStats = ref(false);
        const showGlobalStats = ref(false);

        async function getUserStatistics() {
            try {
                const response = await apiService.getUserStatistics();
                statsData.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }

        async function getGlobalStatistics() {
            try {
                const response = await apiService.getGlobalStatistics();
                globalStatsData.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }

        return {
            statsData,
            globalStatsData,
            showUserStats,
            showGlobalStats,
            getUserStatistics,
            getGlobalStatistics
        };
    }
};
</script>