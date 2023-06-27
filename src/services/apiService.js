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
    getQuestion: () => httpClient.get('/question'),
    getSpellingQuestion: () => httpClient.get('/question/spelling'),
    submitAnswer: (guess, id) => httpClient.post('/answer', null, { params: { guess, id } }),

    // StatisticsController
    getUserStatistics: () => httpClient.get('/stats/user'),
    getGlobalStatistics: () => httpClient.get('/stats/global'),

    // UploadController
    uploadWord: (word, definition) => httpClient.post('/upload/word', null, { params: { word, definition } }),
    uploadBook: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return httpClient.post('/upload/book', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    // WordController
    markWordAsLearned: (word) => httpClient.post('/word/learn', null, { params: { word }}),
    getDefinitions: (word) => httpClient.get(`/word/definitions?word=${word}`),
    getWordInfo: (word) => httpClient.get(`/word/info?word=${word}`),
    getLearningWords: () => httpClient.get('/word/learning'),
    getLearnedWords: () => httpClient.get('/word/learned'),
};