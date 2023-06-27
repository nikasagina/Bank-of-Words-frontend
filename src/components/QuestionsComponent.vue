<template>
    <div>
        <h2>Questions</h2>
        <button @click="getQuestion">Get Question</button>
        <button @click="getSpellingQuestion">Get Spelling Question</button>
        <div v-if="questionData">
            <h3>{{ questionData.question }}</h3>
            <form @submit.prevent="submitAnswer">
                <label v-for="(choice, index) in questionData.choices" :key="index">
                    <input v-model="answer" type="radio" :value="choice" />
                    {{ choice }}
                </label>
                <button type="submit">Submit Answer</button>
            </form>
        </div>
    </div>
</template>

<script>
import apiService from '@/services/apiService';
import { ref } from 'vue';

export default {
    name: 'QuestionsComponent',
    setup() {
        const questionData = ref(null);
        const answer = ref('');

        async function getQuestion() {
            try {
                const response = await apiService.getQuestion();
                questionData.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }

        async function getSpellingQuestion() {
            try {
                const response = await apiService.getSpellingQuestion();
                questionData.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }

        async function submitAnswer() {
            try {
                const response = await apiService.submitAnswer(answer.value, questionData.value.id);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }

        return {
            questionData,
            answer,
            getQuestion,
            getSpellingQuestion,
            submitAnswer
        };
    }
};
</script>
