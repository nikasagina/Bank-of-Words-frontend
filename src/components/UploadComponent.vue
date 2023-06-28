<template>
    <div>
        <h2>Upload</h2>
        <div>
            <button @click="mode = 'word'">Upload Word</button>
            <button @click="mode = 'book'">Upload Book</button>
        </div>
        <div v-if="mode === 'word'">
            <h3>Upload a Word</h3>
            <form @submit.prevent="uploadWord">
                <div>
                    <label for="word">Word:</label>
                    <input id="word" v-model="word" required>
                </div>
                <div>
                    <label for="definition">Definition:</label>
                    <textarea id="definition" v-model="definition" required></textarea>
                </div>
                <div>
                    <button type="submit">Upload</button>
                </div>
            </form>
        </div>
        <div v-else-if="mode === 'book'">
            <h3>Upload a Book</h3>
            <form @submit.prevent="uploadBook">
                <div>
                    <label for="file">File:</label>
                    <input id="file" type="file" ref="file" required>
                </div>
                <div>
                    <button type="submit">Upload</button>
                </div>
            </form>
            <div v-if="message">
                {{ message }}
                <ul>
                    <li v-for="(definition, word) in addedWords" :key="word">{{ word }}: {{ definition }}</li>
                </ul>
            </div>
        </div>
        <div v-if="message && mode === 'word'">
            {{ message }}
        </div>
        <div v-else-if="error">
            {{ error }}
        </div>
    </div>
</template>

<script>
import apiService from "@/services/apiService";
export default {
    name: 'UploadComponent',
    data() {
        return {
            mode: null,
            word: '',
            definition: '',
            message: '',
            error: '',
            addedWords: {},
        }
    },
    methods: {
        async uploadWord() {
            try {
                const response = await apiService.uploadWord(this.word, this.definition);
                if (response.data.successful) {
                    this.message = 'Word uploaded successfully.';
                }
            } catch (error) {
                console.error(error);
                this.error = 'Failed to upload word.';
            }
        },
        async uploadBook() {
            try {
                const file = this.$refs.file.files[0];
                const response = await apiService.uploadBook(file);
                if (response.data.successful) {
                    this.message = response.data.message;
                    this.addedWords = response.data.addedWords;
                }
            } catch (error) {
                console.error(error);
                this.error = 'Failed to upload book.';
            }
        }
    }
}
</script>