<template>
    <div class="max-w-xg mx-auto p-4">
        <h2 class="text-3xl mb-4 font-bold">Upload</h2>
        <div class="flex-1">
            <select v-model="selectedTable" class="border border-gray-300 p-2 rounded-md mr-5" style="width: 130px">
                <option disabled value="">Select a table</option>
                <option v-for="(table, index) in tables" :key="index" :value="table.tableId">{{ table.name }}</option>
            </select>
            <button
                @click="switchMode('table')"
                :class="{'bg-gray-200 text-gray-700': mode === 'table', 'bg-gray-300 text-gray-600': mode !== 'table'}"
                class="flex-1 py-2 px-6 rounded-l-md font-medium focus:outline-none"
            >
                Create Table
            </button>
            <button
                @click="switchMode('word')"
                :class="{'bg-gray-200 text-gray-700': mode === 'word', 'bg-gray-300 text-gray-600': mode !== 'word'}"
                class="flex-1 py-2 px-6 rounded-x-md font-medium focus:outline-none"
            >
                Upload Word
            </button>
            <button
                @click="switchMode('book')"
                :class="{'bg-gray-200 text-gray-700': mode === 'book', 'bg-gray-300 text-gray-600': mode !== 'book'}"
                class="flex-1 py-2 px-6 rounded-r-md font-medium focus:outline-none"
            >
                Upload Book
            </button>
        </div>
        <div v-if="mode === 'word'" class="mb-8">
            <h3 class="text-xl mb-4 font-bold">Upload a Word</h3>
            <form @submit.prevent="uploadWord(selectedTable)">
                <div class="mb-4">
                    <label for="word" class="block text-gray-700 font-medium mb-2">Word:</label>
                    <input id="word" v-model="word" required class="w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                </div>
                <div class="mb-4">
                    <label for="definition" class="block text-gray-700 font-medium mb-2">Definition:</label>
                    <textarea id="definition" v-model="definition" required class="w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>
                <label for="image" class="block text-gray-700 font-medium mb-2">Image (optional):</label>
                <div class="relative rounded-md shadow-sm">
                    <input id="image" type="file" @change="onImageSelect" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md">
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 4v16m8-8H4"></path>
                        </svg>
                    </div>
                </div>
                <div>
                    <button type="submit" class="bg-indigo-600 text-white py-2 px-4 rounded-md mt-4 font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
                        Upload
                    </button>
                </div>
            </form>
        </div>
        <div v-else-if="mode === 'book'" class="mb-8">
            <h3 class="text-xl mb-4 font-bold">Upload a Book</h3>
            <form @submit.prevent="uploadBook(selectedTable)">
                <div class="mb-4">
                    <label for="file" class="block text-gray-700 font-medium mb-2">File:</label>
                    <div class="relative rounded-md shadow-sm">
                        <input id="file" type="file" ref="file" required class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5 4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4zm1 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8zM3 8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8zm2 0a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8zm0 3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" class="bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
                        Upload
                    </button>
                </div>
            </form>
            <div v-if="message" class="mt-4 text-green-500 font-medium">
                {{ message }}
            </div>
            <ul class="list-disc pl-4 mt-2">
                <li v-for="(definition, word) in addedWords" :key="word">
                    <span class="text-black">{{ word }}:</span> <span class="text-gray-500">{{ definition }}</span>
                </li>
            </ul>
        </div>
        <div v-if="mode === 'table'" class="mb-8">
            <h3 class="text-xl mb-4 font-bold">Create a Table</h3>
            <form @submit.prevent="createTable">
                <div class="mb-4">
                    <label for="tableName" class="block text-gray-700 font-medium mb-2">Table Name:</label>
                    <input id="tableName" v-model="tableName" required class="w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                </div>
                <div class="flex justify-between">
                    <button type="submit" class="bg-indigo-600 text-white py-2 px-4 rounded-md mt-4 font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
                        Create
                    </button>
                    <label for="import-table"
                           class="bg-indigo-600 text-white py-2 px-4 rounded-md mt-4 font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
                        Import</label>
                    <input id="import-table" type="file" name="file" style="display:none" @change="importSelectedTable($event)">
                </div>
            </form>

        </div>
        <div v-if="message" class="mt-4 text-green-500 font-medium">
            {{ message }}
        </div>
        <div v-else-if="error" class="mt-4 text-red-500 font-medium">
            {{ error }}
        </div>
    </div>
</template>

<script>
import apiService from "@/services/apiService";
import {onMounted, ref} from "vue";
export default {
    name: 'UploadComponent',
    data() {
        return {
            mode: null,
            word: '',
            definition: '',
            image: null,
            message: '',
            error: '',
            addedWords: {},
            selectedTable: '',
        }
    },

    setup() {
        const tables = ref([]);

        async function fetchTables() {
            try {
                const userTables = await apiService.getUserTables();
                tables.value = [...userTables.data.tables];
            } catch (error) {
                console.error(error);
            }
        }

        onMounted(async () => {
            await fetchTables();
        });

        return {
            tables,
            fetchTables,
        }
    },
    methods: {

        switchMode(newMode) {
            this.mode = newMode;
            this.message = '';
            this.error = '';
        },

        onImageSelect(e) {
            this.image = e.target.files[0];
        },

        async uploadWord(tableId) {
            if (tableId === undefined) {
                this.error = 'Please select a table to add the word to';
                return;
            }

            try {
                const response = await apiService.uploadWord(tableId, this.word, this.definition, this.image);
                if (response.data.successful) {
                    this.message = `Word uploaded successfully: ${this.word}`;
                    this.error = '';
                } else {
                    this.error = `You already have the word added with the same definition: ${this.word}`;
                }
            } catch (error) {
                console.error(error);
                this.error = 'Failed to upload word.';
            }
        },

        async uploadBook(tableId) {
            if (tableId === undefined) {
                this.error = 'Please select a table to add the words to';
                return;
            }

            try {
                const file = this.$refs.file.files[0];
                const response = await apiService.uploadBook(tableId, file);

                if (response.data.successful) {
                    this.addedWords = response.data.added_words

                    if (Object.keys(this.addedWords).length === 0) {
                        this.error = 'No new words added.';
                    } else {
                        this.error = '';
                        this.message = response.data.message;
                        this.addedWords = response.data.added_words;
                    }
                }
            } catch (error) {
                console.error(error);
                this.error = 'Failed to upload book.';
            }
        },

        async createTable() {
            try {
                const response = await apiService.createTable(this.tableName);

                if (response.data.success) {
                    this.message = `Table created successfully: ${this.tableName}`;
                    this.error = '';
                    this.tables.push(response.data.table);
                    this.selectedTable = response.data.table.tableId;
                } else {
                    this.error = response.data.message;
                }
            } catch (error) {
                console.error(error);
                this.error = 'Failed to create table.';
            }
        },

        async importSelectedTable(event) {
            const file = event.target.files[0];

            try {
                const response = await apiService.importTable(file);
                if (!response.data.error) {
                    console.log("here")
                    this.message = `Table imported successfully: ${response.data.table.name}`;
                    this.error = '';
                    this.tables.push(response.data.table);
                    this.selectedTable = response.data.table.tableId;
                } else {
                    this.error = response.data.error;
                }
            } catch (error) {
                console.error(error);
            }
        }


    },
}
</script>