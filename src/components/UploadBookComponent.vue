<template>
    <div>
        <h2>Upload a Book</h2>
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
        <div v-else-if="error">
            {{ error }}
        </div>
    </div>
</template>

<script>
import apiService from "@/services/apiService";
export default {
    name: 'UploadBookComponent',
    data() {
        return {
            message: '',
            error: '',
            addedWords: {},
        }
    },
    methods: {
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