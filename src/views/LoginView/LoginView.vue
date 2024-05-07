<template>
    <div
        class="w-1/6 border border-solid border-gray-200 rounded-lg m-auto p-6"
    >
        <h1 class="text-2xl font-bold text-center">{{ modeHeading }}</h1>
        <template v-if="authErrorMessage">
            <p class="text-red-500 text-sm mt-4">{{ authErrorMessage }}</p>
        </template>
        <KeepAlive>
            <component :is="modeComponent" @switchMode="switchMode" />
        </KeepAlive>
        <p class="text-xs text-center">
            {{ changeModeLabel }}
            <button @click="switchMode" class="text-[#41b783] hover:underline">
                {{ changeModeLink }}
            </button>
        </p>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Login from "@/components/Login/Login.vue";
import SignUp from "@/components/SignUp/SignUp.vue";

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
        ...mapGetters("auth", {
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
                return "Don't have an account? ";
            } else {
                return "Already have an account? ";
            }
        },
        changeModeLink: function () {
            if (this.isLoginMode) {
                return "Signup";
            } else {
                return "Login";
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
        ...mapActions("auth", {
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
