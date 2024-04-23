import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isLoggedIn: false
    },
    mutations: {
        ['SET_IS_LOGGED_IN'](state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn;
        }
    },
    actions: {
        login({ commit }) {
            console;
            commit('SET_IS_LOGGED_IN', true);
        },
        logout({ commit }) {
            commit('SET_IS_LOGGED_IN', false);
        }
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn
    }
});

export default store;