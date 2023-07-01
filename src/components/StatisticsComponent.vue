<template>
    <div class="max-w-lg mx-auto p-4">
        <h2 class="text-3xl mb-4 font-bold">Statistics</h2>
        <div class="flex mb-8">
            <button
                @click="showUserStats = true; showGlobalStats = false; getUserStatistics()"
                :class="{'bg-gray-200 text-gray-700': showUserStats, 'bg-gray-300 text-gray-600': !showUserStats}"
                class="flex-1 py-2 px-4 rounded-l-md font-medium focus:outline-none"
            >
                Get User Statistics
            </button>
            <button
                @click="showGlobalStats = true; showUserStats = false; getGlobalStatistics()"
                :class="{'bg-gray-200 text-gray-700': showGlobalStats, 'bg-gray-300 text-gray-600': !showGlobalStats}"
                class="flex-1 py-2 px-4 rounded-r-md font-medium focus:outline-none"
            >
                Get Global Statistics
            </button>
        </div>
        <div v-if="showUserStats && statsData" class="mb-8">
            <div class="text-lg font-bold mb-2">User Statistics</div>
            <p>Correct answers: {{ statsData.success_guesses_count }}</p>
            <p>Incorrect answers: {{ statsData.total_guesses_count - statsData.success_guesses_count }}</p>
            <p>Questions answered: {{ statsData.total_guesses_count }}</p>
            <p>Success rate: {{ Math.floor(statsData.success_rate * 100) }}%</p>
            <p>Most guessed word: {{ statsData.most_guessed_word }}</p>
            <p>Least guessed word: {{ statsData.least_guessed_word }}</p>
        </div>
        <div v-if="showGlobalStats && globalStatsData" class="mb-8">
            <div class="text-lg font-bold mb-2">Global Statistics</div>
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
            getGlobalStatistics,
        };
    },
};
</script>