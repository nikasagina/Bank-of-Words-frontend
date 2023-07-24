<template>
    <div class="space-y-4">
        <div class="flex justify-center flex-col sm:flex-row gap-2">
            <select v-model="selectedTable" class="border border-gray-300 p-2 rounded-md mr-5">
                <option disabled value="">Select a table</option>
                <option v-for="(table, index) in tables" :key="index" :value="table.tableId">{{ table.name }}</option>
            </select>
            <button @click="getTextFlashcard(selectedTable)"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out">
                Text Flashcard
            </button>
            <button @click="getImageFlashcard(selectedTable)"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out">
                Image Flashcard
            </button>
        </div>
        <div v-if="error" class="text-red-500 " style="text-align: center">{{ error }}</div>
        <div  v-if="currentFlashcard.front || currentFlashcard.back" class="flashcard-container flex justify-center">
            <div class="flashcard" :class="{ 'flip': !isFrontSide }">
                <div class="flashcard-face flashcard-front rounded-lg shadow-lg bg-white p-8 items-center justify-center">
                    <div v-if="currentFlashcard.front && isFrontSide">
                        <h3 v-if="currentFlashcard.front.frontText" class="text-lg font-medium my-auto">{{ currentFlashcard.front.frontText }}</h3>
                        <div v-else-if="image" class="image-container">
                            <img :src="image" alt="Question Image" class="rounded-lg" style="max-width: 100%; max-height: 400px;">
                        </div>
                    </div>
                </div>
                <div class="flashcard-face flashcard-back rounded-lg shadow-lg bg-gray-100 p-4 flex items-center justify-center">
                    <div v-if="currentFlashcard.back && !isFrontSide">
                        <h3 class="text-lg font-medium mb-2">{{ currentFlashcard.back.back }}</h3>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="currentFlashcard.front || currentFlashcard.back" class="flex justify-center">
            <button type="submit" class="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out mt-4"
                    @click="flipFlashcard">
                Flip
            </button>
            <button class="inline-flex items-center ml-6 px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out mt-4"
                    @click="getNextFlashcard(selectedTable)">
                Next
            </button>

        </div>
    </div>
</template>

<script>
import apiService from '@/services/apiService';
import {onMounted, ref} from 'vue';

export default {
    name: 'QuestionsComponent',
    setup() {
        const isFrontSide = ref(true);
        const lastQuestionType = ref(null);
        const image = ref(null);
        const error = ref(null);
        const selectedTable = ref('');
        const tables = ref([]);
        const currentFlashcard = ref({front: null, back: null});

        async function getTextFlashcard(tableId) {
            try {
                const response= await apiService.getFlashcardTextFront(tableId);
                error.value = response.data.error;
                currentFlashcard.value.front = response.data;
                currentFlashcard.value.back = null;

                image.value = null
                lastQuestionType.value = 'text'; // Set the type of the last question
                isFrontSide.value = true
            } catch (error) {
                console.error(error);
            }
        }

        async function getImageFlashcard(tableId) {
            try {
                error.value = null
                const response = await apiService.getImageQuestion(tableId);
                currentFlashcard.value.front = response.data;
                currentFlashcard.value.back = null;
                isFrontSide.value = true
                lastQuestionType.value = 'image'; // Set the type of the last question

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

            } catch (error) {
                console.error(error);
            }
        }

        async function flipFlashcard() {
            try {
                if (currentFlashcard.value.back === null){
                    const response = await apiService.getFlashcardBack(currentFlashcard.value.front.id);
                    currentFlashcard.value.back = response.data;
                }

                isFrontSide.value = !isFrontSide.value;

            } catch (error) {
                console.error(error);
            }
        }


        async function getNextFlashcard(selectedTable) {
            // Get the next flashcard based on the type of the last question
            if (lastQuestionType.value === 'text') {
                await getTextFlashcard(selectedTable);
            } else if (lastQuestionType.value === 'image') {
                await getImageFlashcard(selectedTable);
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

        onMounted(async () => {
            await fetchTables();
        });

        return {
            isFrontSide,
            currentFlashcard,
            flipFlashcard,
            getTextFlashcard,
            getImageFlashcard,
            getNextFlashcard,
            image,
            error,
            selectedTable,
            tables,
        };
    }
};
</script>

<style scoped>
.flashcard-container {
    perspective: 1000px;
}

.flashcard {
    position: relative;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    width: 400px;
    height: 240px;
}

.flashcard.flip {
    transform: rotateY(180deg);
}

.flashcard-face {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    display: flex;
    text-align: center;
}

.flashcard-back {
    transform: rotateY(180deg);
}

.flashcard-face.flashcard-front {
    flex-direction: column;
}

.image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}

img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}


@media screen and (min-width: 1536px) {
    .flashcard {
        width: 600px;
        height: 360px;
    }
}

</style>