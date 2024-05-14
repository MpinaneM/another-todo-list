import Vue from "vue";
import {
    deleteTask,
    getTasks,
    patchUpdateTask,
    postAddTask,
} from "@/utils/api";

const state = {
    tasks: [],
};

const mutations = {
    SET_TASKS(state, response) {
        if (response !== null) {
            const tasks = Object.keys(response)?.map((id) => ({
                ...response[id],
                id,
            }));
            Vue.set(state, "tasks", tasks);
        } else {
            Vue.set(state, "tasks", []);
        }
    },
};

const actions = {
    SET_TASKS({ commit }, tasks) {
        commit("SET_TASKS", tasks);
    },
    FETCH_TASKS({ commit, rootGetters: getters }) {
        const userId = getters["auth/getUserId"];
        const idToken = getters["auth/getToken"];
        return new Promise(async (resolve, reject) => {
            try {
                const response = await getTasks(idToken, userId);

                commit("SET_TASKS", response);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },
    ADD_TASK({ rootGetters: getters }, task) {
        const userId = getters["auth/getUserId"];
        const idToken = getters["auth/getToken"];
        return new Promise(async (resolve, reject) => {
            try {
                await postAddTask(idToken, { userId, ...task });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },
    UPDATE_TASK({ rootGetters: getters }, { taskId, updatedTask }) {
        const idToken = getters["auth/getToken"];
        return new Promise(async (resolve, reject) => {
            try {
                await patchUpdateTask(idToken, taskId, updatedTask);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },
    DELETE_TASK({ commit, rootGetters: getters }, taskId) {
        const idToken = getters["auth/getToken"];
        return new Promise(async (resolve, reject) => {
            try {
                await deleteTask(idToken, taskId);
                commit(
                    "SET_TASKS",
                    getters["tasks/getTasks"].filter(
                        (task) => task.id !== taskId
                    )
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
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
