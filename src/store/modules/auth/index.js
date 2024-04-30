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
    AUTH_USER({ commit }, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const action =
                    payload.mode === "signup" ? "signUp" : "signInWithPassword";

                const response = await makeRequest(
                    `https://identitytoolkit.googleapis.com/v1/accounts:${action}?key=AIzaSyAeaS3Q7D8I4kdHicUSASXUaW4KkkQsvf8`,
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
                console.log("HERE 2", error);
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
