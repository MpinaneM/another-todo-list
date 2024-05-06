import Vue from "vue";
import { postAuthUser } from "@/utils/api";

const state = {
    token: null,
    userId: null,
    tokenExpiration: null,
    authRequestErrorMessage: "",
};

const mutations = {
    ["SET_USER"](state, payload) {
        Vue.set(state, "token", payload.token);
        Vue.set(state, "userId", payload.userId);
        Vue.set(state, "tokenExpiration", payload.tokenExpiration);
    },
    ["SET_AUTH_ERROR_MESSAGE"](state, error) {
        Vue.set(state, "authRequestErrorMessage", error);
    },
};

const actions = {
    AUTH_USER({ commit }, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await postAuthUser(
                    payload.email,
                    payload.password,
                    payload
                );
                commit("SET_USER", {
                    token: response.idToken,
                    userId: response.localId,
                    tokenExpiration: response.expiresIn,
                });
                resolve();
            } catch (error) {
                console.log(`${payload.mode} Error`, error);
                reject(error);
            }
        });
    },
    LOGOUT({ commit }) {
        commit("SET_USER", {
            token: null,
            userId: null,
            tokenExpiration: null,
        });
        commit("SET_TASKS", null);
    },
    SET_AUTH_ERROR_MESSAGE({ commit }, error) {
        commit("SET_AUTH_ERROR_MESSAGE", error);
    },
};

const getters = {
    isLoggedIn: (state) => state.userId !== null,
    getUserId: (state) => state.userId,
    getToken: (state) => state.token,
    getAuthErrorMessage: (state) => state.authRequestErrorMessage,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
