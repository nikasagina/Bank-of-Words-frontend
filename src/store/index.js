import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            isAuthenticated: false,
            token: '',
        };
    },
    mutations: {
        setAuthentication(state, { token }) {
            state.isAuthenticated = true;
            state.token = token;
            localStorage.setItem('token', token);
        },
        clearAuthentication(state) {
            state.isAuthenticated = false;
            state.token = '';
            localStorage.removeItem('token');
        },
    },
    actions: {
        login({ commit }, { token }) {
            commit('setAuthentication', { token });
        },
        logout({ commit }) {
            commit('clearAuthentication');
        },
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
    },
    modules: {},
});
