<template>
    <h2 class="text-3xl mb-4 font-bold mx-auto">Tables</h2>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto">
            <div class="flex-1">
                <select v-model="selectedTable" class="border border-gray-300 p-2 rounded-md mx-2" style="width: 130px" @change="fetchTableWords()">
                    <option disabled value="">Select a table</option>
                    <option v-for="(table, index) in tables" :key="index" :value="table.tableId">{{ table.name }}</option>
                </select>
                <button @click="deleteTable(selectedTable)" :disabled="!isUserTableSelected" :class="{ 'disabled-button': !isUserTableSelected }"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2">Delete Table</button>
                <button @click="toggleDeleteWordsMode" :disabled="!isUserTableSelected" :class="{ 'disabled-button': !isUserTableSelected }"
                        class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-2">Delete Words</button>
                <button @click="exportSelectedTable()" :disabled="!isUserTableSelected" :class="{ 'disabled-button': !isUserTableSelected }"
                        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2">Export Table</button>
            </div>
        </div>
    </div>
    <div class="max-w-7xl mx-2.5 px-4 sm:px-6 lg:px-8">
        <div v-if="selectedTable">
            <ul class="list-disc pl-4 mt-2">
                <li v-for="(word) in tableWords" :key="word">
                    <input type="checkbox" v-if="deleteWordsMode" v-model="selectedWords" :value="word.id" class="mr-1">
                    <span class="text-black">{{ word.word }}:</span> <span class="text-gray-500">{{ word.definition }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import apiService from "@/services/apiService";
import { onMounted, ref } from "vue";

export default {
    name: 'TablesComponent',
    setup() {
        const tables = ref([]);
        const tableWords = ref([]);
        const selectedTable = ref('');
        const isUserTableSelected = ref(false);
        const initialTableIds = ref([]);
        const deleteWordsMode = ref(false);
        const selectedWords = ref([]);

        async function fetchTables() {
            try {
                const userTables = await apiService.getUserTables();
                const initialTables = await apiService.getInitialTables();

                initialTableIds.value = [...initialTables.data.tables].map(table => table.tableId);
                tables.value = [...initialTables.data.tables, ...userTables.data.tables];
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchTableWords() {
            if (selectedTable.value) {
                try {
                    isUserTableSelected.value = ! initialTableIds.value.some(id => id === selectedTable.value);
                    console.log(isUserTableSelected.value)

                    const tableWordsResponse = await apiService.getTableWords(selectedTable.value);
                    this.tableWords = tableWordsResponse.data.words;
                } catch (error) {
                    console.error(error);
                }
            }

        }

        async function deleteTable(tableId) {
            const isInitialTable = initialTableIds.value.some(id => id === tableId);

            if (isInitialTable) {
                console.log("Cannot delete initial table.");
                return;
            }

            try {
                await apiService.deleteTable(tableId);
                tables.value = tables.value.filter(table => table.tableId !== tableId);
                selectedTable.value = '';
            } catch (error) {
                console.error(error);
            }
        }

        function toggleDeleteWordsMode() {
            if (deleteWordsMode.value) {
                deleteSelectedWords();
            }
            deleteWordsMode.value = !deleteWordsMode.value;
        }

        async function deleteSelectedWords() {
            try {
                await Promise.all(selectedWords.value.map(wordId => apiService.deleteWord(wordId)));
                tableWords.value = tableWords.value.filter(word => !selectedWords.value.includes(word.id));
                selectedWords.value = [];
            } catch (error) {
                console.error(error);
            }
        }

        async function exportSelectedTable() {
            try {
                const response = await apiService.exportTable(selectedTable.value);
                const data = JSON.stringify(response.data);
                console.log(data)
                const url = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${response.data.tableName}.json`);
                document.body.appendChild(link);
                link.click();
            } catch (error) {
                console.error(error);
            }
        }



        onMounted(async () => {
            await fetchTables();
        });

        return {
            tables,
            tableWords,
            selectedTable,
            isUserTableSelected,
            fetchTables,
            fetchTableWords,
            deleteTable,
            deleteWordsMode,
            selectedWords,
            toggleDeleteWordsMode,
            exportSelectedTable,
        };
    },
};
</script>

<style>
.disabled-button {
    background-color: gray !important;
    cursor: not-allowed;
}
</style>