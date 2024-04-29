<template>
    <div class="login-view">
        <h1>{{ heading }}</h1>
        <p v-if="hasIncorrectCredentials">
            Username and/or password are incorrect, please try again
        </p>
        <p v-if="error">
            {{ error }}
        </p>
        <form @submit.prevent="submitLogin">
            <div>
                <label for="email">Email:</label>
                <input type="text" id="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    v-model="password"
                    required
                />
            </div>
            <div v-if="mode === 'signup'">
                <label for="confirm_password">Confirm password:</label>
                <input
                    type="confirm_password"
                    id="password"
                    v-model="confirm_password"
                    required
                />
            </div>
            <button type="submit">{{ heading }}</button>
            <button @click="switchMode">{{ switchModeText }}</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            email: "",
            password: "",
            confirm_password: "",
            hasIncorrectCredentials: false,
            mode: "login",
            error: null,
        };
    },
    computed: {
        heading: function () {
            return this.mode === "login" ? "Login" : "Sign Up";
        },
        switchModeText: function () {
            return this.mode === "login" ? "Sign Up Instead" : "Login Instead";
        },
    },
    methods: {
        ...mapActions(["login", "signup"]),
        async submitLogin() {
            if (
                this.mode === "signup" &&
                this.password !== this.confirm_password
            ) {
                this.hasIncorrectCredentials = true;
                this.email = "";
                this.password = "";
                this.confirm_password = "";
            } else {
                try {
                    this.loading = true;
                    if (this.mode === "login") {
                        await this.login({
                            email: this.email,
                            password: this.password,
                        });
                        this.loading = false;
                        this.$router.push("/");
                    } else
                        await this.signup({
                            email: this.email,
                            password: this.password,
                        });
                    this.loading = false;
                    this.$router.push("/");
                } catch (error) {
                    this.loading = false;
                    this.error = error.message || "An error occurred";
                }
            }
        },
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
