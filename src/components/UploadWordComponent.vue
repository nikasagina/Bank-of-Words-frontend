<template>
    <div>
        <h2>Upload a Word</h2>
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
        <div v-if="message">
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
    name: 'UploadWordComponent',
    data() {
        return {
            word: '',
            definition: '',
            message: '',
            error: '',
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
        }
    }
}
</script>