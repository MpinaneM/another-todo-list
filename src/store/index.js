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
    },
    mutations: {
        SHOW_ADD_TASK_MODAL(state, show) {
            state.showAddTaskModal = show;
        },
    },
    actions: {
        showAddTaskModal({ commit }, show) {
            commit("SHOW_ADD_TASK_MODAL", show);
        },
    },
    getters: {
        showAddTaskModal: (state) => state.showAddTaskModal,
    },
    modules: {
        auth: authModule,
        tasks: tasksModule,
    },
});

export default store;
