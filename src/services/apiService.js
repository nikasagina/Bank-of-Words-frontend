import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:8000/api', // Replace with your API URL
});

// Add a request interceptor for setting the Authorization header
httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
});

export default {
    // AuthController
    register: (username, password, email) => httpClient.post('/register', null, { params: { username, password, email } }),
    authenticate: (username, password) => httpClient.post('/authenticate', null, { params: { username, password } }),

    // QuestionController
    getQuestion: (tableId) => httpClient.get(`/question/default/${tableId || ''}`),
    getSpellingQuestion: (tableId) => httpClient.get(`/question/spelling/${tableId || ''}`),
    getImageQuestion: (tableId) => httpClient.get(`/question/image/${tableId || ''}`),
    submitAnswer: (guess, id) => httpClient.post('/question/answer', null, { params: { guess, id } }),

    // StatisticsController
    getUserStatistics: () => httpClient.get('/stats/user'),
    getGlobalStatistics: () => httpClient.get('/stats/global'),

    // UploadController
    uploadWord: (tableId, word, definition, image) => {
        const formData = new FormData();
        formData.append('tableId', tableId);
        formData.append('word', word);
        formData.append('definition', definition);
        if (image) {
            formData.append('image', image);
        }
        return httpClient.post('/upload/word', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    uploadWordImage: (tableId, word, image) => {
        const formData = new FormData();
        formData.append('tableId', tableId);
        formData.append('image', image);
        return httpClient.post(`/upload/${word}/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
    },
    uploadBook: (tableId, file) => {
        const formData = new FormData();
        formData.append('tableId', tableId);
        formData.append('file', file);
        return httpClient.post('/upload/book', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    // WordController
    markWordAsLearned: (wordId) => httpClient.post(`/word/learn/${wordId}`),
    deleteWord: (wordId) => httpClient.delete(`/word/delete/${wordId}`),
    getDefinitions: (word) => httpClient.get(`/word/definitions/${word}`),
    getWordInfo: (word) => httpClient.get(`/word/info/${word}`),

    // UserController
    getUserInfo: () => httpClient.get('/user/info'),
    getLearningWords: () => httpClient.get('/user/learning'),
    getLearnedWords: () => httpClient.get('/user/learned'),


    // TableController
    createTable: (tableName) => httpClient.post('/table/create', null, { params: { tableName }} ),
    deleteTable: (tableId) => httpClient.delete(`/table/delete/${tableId}`),
    getInitialTables: () => httpClient.get('/table/initial'),
    getUserTables: () => httpClient.get('/table/user'),
    getTableWords: (tableId) => httpClient.get(`/table/words/${tableId}`),
};