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
            <div v-if="answerSubmitted">
                <p v-if="answerIsCorrect">Your answer is correct!</p>
                <p v-else>Sorry, your answer is incorrect. The correct answer is: {{ correctAnswer }}</p>
                <button v-if="answerIsCorrect" @click="markWordAsLearned">Mark Word as Learned</button>
            </div>
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
        const answerSubmitted = ref(false);
        const answerIsCorrect = ref(false);
        const correctAnswer = ref('');

        async function getQuestion() {
            try {
                const response = await apiService.getQuestion();
                questionData.value = response.data;
                answerSubmitted.value = false;
                answerIsCorrect.value = false;
            } catch (error) {
                console.error(error);
            }
        }

        async function getSpellingQuestion() {
            try {
                const response = await apiService.getSpellingQuestion();
                questionData.value = response.data;
                answerSubmitted.value = false;
                answerIsCorrect.value = false;
            } catch (error) {
                console.error(error);
            }
        }

        async function submitAnswer() {
            try {
                const response = await apiService.submitAnswer(answer.value, questionData.value.id);
                answerSubmitted.value = true;
                const isCorrect = response.data.correct;
                answerIsCorrect.value = isCorrect;
                if (!isCorrect) {
                    correctAnswer.value = response.data.answer;
                }
            } catch (error) {
                console.error(error);
            }
        }

        async function markWordAsLearned() {
            try {
                await apiService.markWordAsLearned(answer.value);
            } catch (error) {
                console.error(error);
            }
        }

        return {
            questionData,
            answer,
            answerSubmitted,
            answerIsCorrect,
            correctAnswer,
            getQuestion,
            getSpellingQuestion,
            submitAnswer,
            markWordAsLearned
        };
    }
};
</script>