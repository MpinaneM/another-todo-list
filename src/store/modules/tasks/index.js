import makeRequest from "../../../utils/makeRequest";

const state = {
    tasks: [],
};

const mutations = {
    SET_TASKS(state, tasks) {
        state.tasks = tasks;
    },
};

const actions = {
    FETCH_TASKS({ commit, getters }) {
        const userId = getters.getUserId;
        const idToken = getters.getToken;
        return new Promise(async (resolve, reject) => {
            try {
                const response = await makeRequest(
                    `https://vue-http-demo-ea18d-default-rtdb.firebaseio.com/tasks.json?auth=${idToken}&orderBy="userId"&equalTo="${userId}"`
                );
                const tasks = [];
                for (const taskId in response) {
                    tasks.push({
                        id: taskId,
                        ...response[taskId],
                    });
                }
                commit("SET_TASKS", tasks);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },
    ADD_TASK({ getters }, task) {
        const idToken = getters.getToken;
        const userId = getters.getUserId;
        return new Promise(async (resolve, reject) => {
            try {
                await makeRequest(
                    `https://vue-http-demo-ea18d-default-rtdb.firebaseio.com/tasks.json?auth=${idToken}`,
                    "POST",
                    { userId, ...task }
                );
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },
    UPDATE_TASK({ getters }, { taskId, updatedTask }) {
        const idToken = getters.getToken;
        return new Promise(async (resolve, reject) => {
            try {
                await makeRequest(
                    `https://vue-http-demo-ea18d-default-rtdb.firebaseio.com/tasks/${taskId}.json?auth=${idToken}`,
                    "PATCH",
                    updatedTask
                );
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },
    DELETE_TASK({ getters }, taskId) {
        const idToken = getters.getToken;
        return new Promise(async (resolve, reject) => {
            try {
                await makeRequest(
                    `https://vue-http-demo-ea18d-default-rtdb.firebaseio.com/tasks/${taskId}.json?auth=${idToken}`,
                    "DELETE"
                );
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },
};

const getters = {
    getTasks: (state) => state.tasks,
};

export default {
    state,
    mutations,
    actions,
    getters,
};