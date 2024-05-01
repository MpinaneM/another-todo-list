<template>
    <div class="login-view">
        <h1>{{ modeHeading }}</h1>
        <template v-if="authErrorMessage">
            <p>{{ authErrorMessage }}</p>
        </template>
        <KeepAlive>
            <component :is="modeComponent" @switchMode="switchMode" />
        </KeepAlive>
        <button @click="switchMode">{{ changeModeLabel }}</button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
        ...mapGetters({
            authErrorMessage: "getAuthErrorMessage",
        }),
        modeHeading: function () {
            if (this.isLoginMode) {
                return "Login";
            } else {
                return "Sign Up";
            }
        },
        changeModeLabel: function () {
            if (this.isLoginMode) {
                return "Sign up instead";
            } else {
                return "Login instead";
            }
        },
        modeComponent: function () {
            if (this.isLoginMode) {
                return "Login";
            } else {
                return "SignUp";
            }
        },
        isLoginMode: function () {
            return this.mode === "login";
        },
    },
    methods: {
        ...mapActions({
            setAuthErrorMessage: "SET_AUTH_ERROR_MESSAGE",
        }),
        switchMode() {
            this.setAuthErrorMessage("");
            this.mode = this.isLoginMode ? "signup" : "login";
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
