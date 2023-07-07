<template>
    <div class="space-y-4">
        <div class="flex justify-center">
            <select v-model="selectedTable" @change="fetchInitialQuestion" class="border border-gray-300 p-2 rounded-md mr-5">
                <option disabled value="">Select a table</option>
                <option v-for="(table, index) in tables" :key="index" :value="table.tableId">{{ table.name }}</option>
            </select>
            <button @click="getQuestion(selectedTable)"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out">
                Get Question
            </button>
            <button @click="getSpellingQuestion(selectedTable)"
                    class="inline-flex items-center ml-4 px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out">
                Get Spelling Question
            </button>
            <button @click="getImageQuestion(selectedTable)"
                    class="inline-flex items-center ml-4 px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out">
                Get Image Question
            </button>
        </div>
        <div v-if="error" class="text-red-500">{{ error }}</div>
        <div v-if="questionData" class="rounded-lg border p-4">
            <h3 class="text-lg font-medium mb-2">{{ questionData.question }}</h3>
            <div class="flex flex-col">
                <div v-if="image" class="mb-4">
                    <img :src="image" alt="Question Image" class="rounded-lg" style="max-width: 100%; max-height: 400px;">
                    <input v-model="answer" type="text" class="mt-4 w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Type your answer here" style="display: inline-block;">
                </div>
                <label v-for="(choice, index) in questionData.choices" :key="index" class="flex items-center text-gray-700">
                    <input v-model="answer" type="radio" :value="choice" class="form-radio h-4 w-4 text-indigo-600 transition-colors duration-200 ease-in-out"
                           :disabled="answerSubmitted">
                    <span class="ml-2">{{ choice }}</span>
                </label>
            </div>
            <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out mt-4"
                    @click="submitAnswer"
                    :disabled="answerSubmitted">
                Submit Answer
            </button>
            <button v-if="!answerSubmitted"
                    class="inline-flex items-center ml-6 px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-400 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-200 ease-in-out mt-4"
                    disabled>
                Next Question
            </button>
            <button v-if="answerSubmitted"
                    class="inline-flex items-center ml-6 px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out mt-4"
                    @click="getNextQuestion">
                Next Question
            </button>
            <div v-if="answerSubmitted" class="mt-4">
                <p v-if="answerIsCorrect"
                   class="text-green-600 font-medium">Your answer is correct!</p>
                <p v-else class="text-red-600 font-medium">Sorry, your answer is incorrect. The correct answer is:
                    {{ correctAnswer }}</p>
                <button v-if="answerIsCorrect"
                        class="inline-flex items-center mt-4 px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out"
                        @click="markWordAsLearned">
                    Mark Word as Learned
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import apiService from '@/services/apiService';
import {onMounted, ref} from 'vue';

export default {
    name: 'QuestionsComponent',
    setup() {
        const questionData = ref(null);
        const answer = ref('');
        const answerSubmitted = ref(false);
        const answerIsCorrect = ref(false);
        const correctAnswer = ref('');
        const showNextQuestion = ref(false); // Added to track when to show the "Next Question" button
        let lastQuestionType = null; // Added to track the type of the last question
        let textAnswer = ''
        const image = ref(null);
        const error = ref(null);
        const selectedTable = ref('');
        const tables = ref([]);

        async function getQuestion(tableId = null) {
            try {
                error.value = null
                const response= await apiService.getQuestion(tableId);
                questionData.value = response.data;
                answer.value = '';
                answerSubmitted.value = false;
                answerIsCorrect.value = false;
                showNextQuestion.value = false; // Reset the "Next Question" button
                image.value = null
                lastQuestionType = 'normal'; // Set the type of the last question
            } catch (error) {
                console.error(error);
            }
        }

        async function getSpellingQuestion(tableId = null) {
            try {
                error.value = null
                const response = await apiService.getSpellingQuestion(tableId);
                questionData.value = response.data;
                answer.value = '';
                answerSubmitted.value = false;
                answerIsCorrect.value = false;
                showNextQuestion.value = false; // Reset the "Next Question" button
                image.value = null
                lastQuestionType = 'spelling'; // Set the type of the last question
            } catch (error) {
                console.error(error);
            }
        }

        async function getImageQuestion(tableId = null) {
            try {
                error.value = null
                const response = await apiService.getImageQuestion(tableId);
                questionData.value = response.data;

                if ('error' in response.data) {
                    console.error(response.data.error);
                    error.value = response.data.error
                    image.value = null
                } else {

                    const imageResponse = await fetch(`http://localhost:8000/api/image/${response.data.filename}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    // const imageResponse = await apiService.getImage(response.data.id)

                    const blob = await imageResponse.blob();
                    image.value = URL.createObjectURL(blob);
                }

                answer.value = '';
                answerSubmitted.value = false;
                answerIsCorrect.value = false;
                showNextQuestion.value = false; // Reset the "Next Question" button
                lastQuestionType = 'image'; // Set the type of the last question
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
                showNextQuestion.value = true; // Show the "Next Question" button
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

        async function getNextQuestion() {
            // Get the next question based on the type of the last question
            if (lastQuestionType === 'normal') {
                await getQuestion();
            } else if (lastQuestionType === 'spelling') {
                await getSpellingQuestion();
            } else if (lastQuestionType === 'image') {
                await getImageQuestion();
            }
        }

        async function fetchTables() {
            try {
                const initialTables = await apiService.getInitialTables();
                const userTables = await apiService.getUserTables();
                tables.value = [...initialTables.data.tables, ...userTables.data.tables];
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchInitialQuestion() {
            if (selectedTable.value) {
                const tableId = selectedTable.value;
                await getQuestion(tableId);
            }
        }

        onMounted(async () => {
            await fetchTables();
        });

        return {
            questionData,
            answer,
            answerSubmitted,
            answerIsCorrect,
            correctAnswer,
            showNextQuestion,
            getQuestion,
            getSpellingQuestion,
            submitAnswer,
            markWordAsLearned,
            getNextQuestion,
            getImageQuestion,
            image,
            textAnswer,
            error,
            selectedTable,
            tables,
            fetchInitialQuestion,
        };
    }
};
</script>