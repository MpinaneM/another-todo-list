import Vue from "vue";
import Vuex from "vuex";
import authModule from "@/store/modules/auth";
import tasksModule from "@/store/modules/tasks";
Vue.use(Vuex);

// use vue.set to make sure that the new properties are reactive
// https://vuejs.org/v2/guide/reactivity.html#For-Objects
const store = new Vuex.Store({
    state: {
        showAddTaskModal: false,
        errorToastMessage: "",
    },
    mutations: {
        SHOW_ADD_TASK_MODAL(state, show) {
            Vue.set(state, "showAddTaskModal", show);
        },
        SET_ERROR_TOAST_MESSAGE(state, message) {
            Vue.set(state, "errorToastMessage", message);
        },
    },
    actions: {
        showAddTaskModal({ commit }, show) {
            commit("SHOW_ADD_TASK_MODAL", show);
        },
        setErrorToastMessage({ commit }, message) {
            commit("SET_ERROR_TOAST_MESSAGE", message);
        },
        hideErrorToast({ commit }) {
            console.log("HIDING ERROR TOAST");
            commit("SET_ERROR_TOAST_MESSAGE", "");
        },
    },
    getters: {
        showAddTaskModal: (state) => state.showAddTaskModal,
        errorToastMessage: (state) => state.errorToastMessage,
        showErrorToast: (state) => state.errorToastMessage !== "",
    },
    modules: {
        auth: authModule,
        tasks: tasksModule,
    },
});

export default store;
