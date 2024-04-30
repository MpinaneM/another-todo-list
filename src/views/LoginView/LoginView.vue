<template>
    <div class="login-view">
        <component :is="modeComponent.component" @switchMode="switchMode" />
    </div>
</template>

<script>
import Login from "../../components/Login/Login.vue";
import SignUp from "../../components/SignUp/SignUp.vue";

export default {
    components: {
        Login,
        SignUp,
    },
    data() {
        return {
            mode: "login",
        };
    },
    computed: {
        modeComponent: function () {
            if (this.isLoginMode) {
                return {
                    component: "Login",
                };
            } else {
                return {
                    component: "SignUp",
                };
            }
        },
        isLoginMode: function () {
            return this.mode === "login";
        },
    },
    methods: {
        switchMode() {
            this.mode = this.mode === "login" ? "signup" : "login";
        },
    },
};
</script>

<style scoped>
.login-view {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
