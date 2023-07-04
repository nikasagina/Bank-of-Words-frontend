<template>
    <div class="max-w-lg mx-auto p-4">
        <h2 class="text-xl font-medium mb-4">Word Info</h2>
        <form class="flex items-center" @submit.prevent="getWordInfo">
            <label class="mr-4">
                <span class="text-gray-700">Word:</span>
                <input
                    v-model.trim="word"
                    type="text"
                    class="ml-2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </label>
            <button
                type="submit"
                class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out"
            >
                Get Word Info
            </button>
        </form>
        <div v-if="wordData" class="mt-4">
            <div class="mb-4">
                <span class="text-gray-700 font-medium">Definition: </span>
                <span>{{ wordData.definition }}</span>
            </div>
            <div v-if="wordData.other_definitions.length" class="mb-4">
                <span class="text-gray-700 font-medium">Other definitions: </span>
                <span v-html="formatDefinitions(wordData.other_definitions)"></span>
            </div>
            <div v-if="wordData.examples.length" class="mb-4">
                <span class="text-gray-700 font-medium">Examples: </span>
                <ul class="list-disc ml-4">
                    <li v-for="(example, index) in wordData.examples" :key="index">
                        {{ example }}
                    </li>
                </ul>
            </div>
            <div v-if="wordData.synonyms.length" class="mb-4">
                <span class="text-gray-700 font-medium">Synonyms: </span>
                <span>{{ wordData.synonyms.join(', ') }}</span>
            </div>
            <div v-if="wordData.antonyms.length" class="mb-4">
                <span class="text-gray-700 font-medium">Antonyms: </span>
                <span>{{ wordData.antonyms.join(', ') }}</span>
            </div>
            <span class="text-gray-700 font-medium">Generated Image: </span>
            <img :src="imageUrl" alt="Generated image of the searched word" class="mt-2 border border-gray-300 rounded-md shadow-sm">
        </div>
    </div>
</template>

<script>
import apiService from '@/services/apiService';
import {computed, ref} from 'vue';

export default {
    name: 'WordInfo',
    setup() {
        const word = ref('');
        const wordData = ref(null);
        const imageUrl = computed(() => `https://image.pollinations.ai/prompt/${encodeURIComponent(word.value)}`);

        async function getWordInfo() {
            try {
                const response = await apiService.getWordInfo(word.value);
                wordData.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }

        function formatDefinitions(definitions) {
            const formattedDefinitions = definitions.map((definition, index) => {
                return `${index + 1}. ${definition}`;
            });
            return formattedDefinitions.join('<br>').replace(/^\d+.\s/, '<br>$&');
        }

        return {
            word,
            wordData,
            getWordInfo,
            imageUrl,
            formatDefinitions,
        };
    },
};
</script>