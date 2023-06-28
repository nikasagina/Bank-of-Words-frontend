<template>
    <div class="px-4 py-8">
        <div class="space-y-4">
            <div class="flex justify-center my-4">
                <button @click="getQuestion"
                        class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out">
                    Get Question
                </button>
                <button @click="getSpellingQuestion"
                        class="inline-flex items-center ml-4 px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out">
                    Get Spelling Question
                </button>
            </div>
            <div v-if="questionData" class="rounded-lg border p-4">
                <h3 class="text-lg font-medium mb-2">{{ questionData.question }}</h3>
                <div class="flex flex-col">
                    <label v-for="(choice, index) in questionData.choices" :key="index"
                           class="flex items-center text-gray-700">
                        <input v-model="answer" type="radio" :value="choice"
                               class="form-radio h-4 w-4 text-indigo-600 transition-colors duration-200 ease-in-out">
                        <span class="ml-2">{{ choice }}</span>
                    </label>
                </div>
                <button type="submit"
                        class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out mt-4"
                        @click="submitAnswer">
                    Submit Answer
                </button>
                <div v-if="answerSubmitted" class="mt-4">
                    <p v-if="answerIsCorrect"
                       class="text-green-600 font-medium">Your answer is correct!</p>
                    <p v-else class="text-red-600 font-medium">Sorry, your answer is incorrect. The correct answer is:
                        {{ correctAnswer }}</p>
                    <button v-if="answerIsCorrect"
                            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out"
                            @click="markWordAsLearned">
                        Mark Word as Learned
                    </button>
                </div>
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
                answer.value = '';
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
                answer.value = '';
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