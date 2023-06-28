<template>
    <div>
        <h2>Word Info</h2>
        <form @submit.prevent="getWordInfo">
            <label>Word: <input v-model="word" type="text" /></label>
            <button type="submit">Get Word Info</button>
        </form>
        <div v-if="wordData">
            <h3>{{ wordData.word }}</h3>
            <p>{{ wordData.definition }}</p>
            <p>Other definitions: {{ wordData.other_definitions }}</p>
            <p>Examples: {{ wordData.examples }}</p>
            <p>Synonyms: {{ wordData.synonyms }}</p>
            <p>Antonyms: {{ wordData.antonyms }}</p>
        </div>
    </div>
</template>

<script>
import apiService from '@/services/apiService';
import { ref } from 'vue';

export default {
    name: 'WordInfo',
    setup() {
        const word = ref('');
        const wordData = ref(null);

        async function getWordInfo() {
            try {
                const response = await apiService.getWordInfo(word.value);
                wordData.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }

        return {
            word,
            wordData,
            getWordInfo
        };
    }
};
</script>
