import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: null,
        userId: null,
        tokenExpiration: null,
    },
    mutations: {
        ["SET_USER"](state, payload) {
            state.token = payload.token;
            state.userId = payload.userId;
            state.tokenExpiration = payload.tokenExpiration;
        },
    },
    actions: {
        signup({ commit }, payload) {
            return new Promise((resolve, reject) => {
                fetch(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAeaS3Q7D8I4kdHicUSASXUaW4KkkQsvf8",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email: payload.email,
                            password: payload.password,
                            returnSecureToken: true,
                        }),
                    }
                )
                    .then((response) => {
                        if (response.status !== 200) {
                            const error = new Error("Failed to login user");
                            error.response = response;
                            reject(error);
                            return;
                        }

                        return response.json();
                    })
                    .then((data) => {
                        console.log("RESPOMSE", data);

                        commit("SET_USER", {
                            token: data.idToken,
                            userId: data.localId,
                            tokenExpiration: data.expiresIn,
                        });
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        login({ commit }, payload) {
            return new Promise((resolve, reject) => {
                fetch(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAeaS3Q7D8I4kdHicUSASXUaW4KkkQsvf8",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email: payload.email,
                            password: payload.password,
                            returnSecureToken: true,
                        }),
                    }
                )
                    .then((response) => {
                        if (response.status !== 200) {
                            const error = new Error("Failed to login user");
                            error.response = response;
                            reject(error);
                            return;
                        }

                        return response.json();
                    })
                    .then((data) => {
                        commit("SET_USER", {
                            token: data.idToken,
                            userId: data.localId,
                            tokenExpiration: data.expiresIn,
                        });
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        logout({ commit }) {
            console.log("LOGOUT");
            commit("SET_USER", {
                token: null,
                userId: null,
                tokenExpiration: null,
            });
        },
    },
    getters: {
        isLoggedIn: (state) => state.userId !== null,
        getUserId: (state) => state.userId,
        getToken: (state) => state.token,
    },
});

export default store;
