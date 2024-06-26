import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/base.css";

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
