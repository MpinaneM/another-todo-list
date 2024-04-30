import makeRequest from "../../../utils/makeRequest";

const state = {
    token: null,
    userId: null,
    tokenExpiration: null,
};

const mutations = {
    ["SET_USER"](state, payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.tokenExpiration = payload.tokenExpiration;
    },
};

const actions = {
    signup({ commit }, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await makeRequest(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAeaS3Q7D8I4kdHicUSASXUaW4KkkQsvf8",
                    "POST",
                    {
                        email: payload.email,
                        password: payload.password,
                        returnSecureToken: true,
                    }
                );
                commit("SET_USER", {
                    token: response.idToken,
                    userId: response.localId,
                    tokenExpiration: response.expiresIn,
                });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },
    login({ commit }, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await makeRequest(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAeaS3Q7D8I4kdHicUSASXUaW4KkkQsvf8",
                    "POST",
                    {
                        email: payload.email,
                        password: payload.password,
                        returnSecureToken: true,
                    }
                );
                commit("SET_USER", {
                    token: response.idToken,
                    userId: response.localId,
                    tokenExpiration: response.expiresIn,
                });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },
    logout({ commit }) {
        commit("SET_USER", {
            token: null,
            userId: null,
            tokenExpiration: null,
        });
    },
};

const getters = {
    isLoggedIn: (state) => state.userId !== null,
    getUserId: (state) => state.userId,
    getToken: (state) => state.token,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
