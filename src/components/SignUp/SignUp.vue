<template>
    <div class="signup">
        <h1>Sign Up</h1>
        <template v-if="hasIncorrectCredentials">
            <p>{{ incorrectCredentialsError }}</p>
        </template>
        <template v-else-if="hasRequestError">
            <p>{{ requestError }}</p>
        </template>
        <form @submit.prevent="authUser('signup')">
            <div>
                <label for="email">Email:</label>
                <input type="text" id="email" v-model="email" />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" />
            </div>
            <div>
                <label for="confirm_password">Confirm password:</label>
                <input
                    type="password"
                    id="confirm_password"
                    v-model="confirm_password"
                />
            </div>
            <button type="submit">Sign up</button>
            <button @click="switchMode">Login instead</button>
        </form>
    </div>
</template>

<script>
import authMixin from "../../utils/mixins/auth/authMixin";

export default {
    mixins: [authMixin],
    data() {
        return {
            confirm_password: "",
        };
    },
    methods: {
        switchMode() {
            this.$emit("switchMode");
        },
        validateForm() {
            if (
                this.email === "" ||
                this.password === "" ||
                this.confirm_password === ""
            ) {
                this.incorrectCredentialsError =
                    "Please enter your email and password";
            } else if (this.password !== this.confirm_password) {
                this.incorrectCredentialsError = "Passwords do not match";
            }
        },
    },
};
</script>
