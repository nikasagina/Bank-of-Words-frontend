<template>
    <div class="flex flex-col items-center">
        <div class="bg-gray-200 h-32 w-32 rounded-full flex items-center justify-center mb-4">
            <span class="text-4xl font-bold text-gray-500">{{ user.username.charAt(0).toUpperCase() }}</span>
        </div>
        <h1 class="text-3xl font-bold">Welcome {{ user.username }}!</h1>
        <p>Email address: {{ user.email }}</p>
        <p>Account created on {{ user.joinDate }}</p>
    </div>
    <div class="flex justify-around" v-if="learningWords.length > 0 || learnedWords.length > 0">
        <div>
            <h2 class="text-2xl font-bold mt-8">Learning Words</h2>
            <ul>
                <li v-for="word in learningWords" :key="word.id" @click="showDefinition(word)">{{ word.word }}</li>
            </ul>
        </div>
        <div>
            <h2 class="text-2xl font-bold mt-8">Learned Words</h2>
            <ul>
                <li v-for="word in learnedWords" :key="word.id" @click="showDefinition(word)">{{ word.word }}</li>
            </ul>
        </div>
    </div>
    <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center" v-if="showingDefinition.value" @click.self="hideDefinition">
        <div class="bg-white p-8 rounded-xl shadow-xl relative">
            <button class="absolute top-0 right-0 m-2 p-2" @click="hideDefinition">x</button>
            <h3 class="text-2xl font-bold">{{ selectedWord.word }}</h3>
            <p>{{ selectedWord.definition }}</p>
        </div>
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

        const learningWords = reactive([]);
        const learnedWords = reactive([]);
        const showingDefinition = reactive({ value: false });
        const selectedWord = reactive({ word: '', definition: '' });

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

        const getLearningWords = async () => {
            try {
                const response = await apiService.getLearningWords();
                learningWords.push(...response.data.learning_words);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };

        const getLearnedWords = async () => {
            try {
                const response = await apiService.getLearnedWords();
                learnedWords.push(...response.data.learned_words);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };

        const showDefinition = (word) => {
            selectedWord.word = word.word;
            selectedWord.definition = word.definition;
            showingDefinition.value = true;
        };

        const hideDefinition = () => {
            showingDefinition.value = false;
        };


        onMounted(() => {
            getUserInfo();
            getLearningWords();
            getLearnedWords();
        });

        return {
            user,
            learningWords,
            learnedWords,
            showDefinition,
            hideDefinition,
            showingDefinition,
            selectedWord
        };
    }
};
</script>