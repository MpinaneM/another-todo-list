<template>
    <div class="login">
        <h1>Login</h1>
        <template v-if="hasIncorrectCredentials">
            <p>{{ incorrectCredentialsError }}</p>
        </template>
        <template v-else-if="hasRequestError">
            <p>{{ requestError }}</p>
        </template>
        <form @submit.prevent="authUser('login')">
            <div>
                <label for="email">Email:</label>
                <input type="text" id="email" v-model="email" />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" />
            </div>
            <button type="submit">Login</button>
            <button @click="switchMode">Sign up instead</button>
        </form>
    </div>
</template>

<script>
import authMixin from "../../utils/mixins/auth/authMixin";

export default {
    mixins: [authMixin],
    methods: {
        switchMode() {
            this.$emit("switchMode");
        },
        validateForm() {
            console.log("IS IT WORKING");
            if (this.email === "" || this.password === "") {
                this.incorrectCredentialsError =
                    "Please enter your email and password";
            } else {
                this.incorrectCredentialsError = "";
            }
        },
    },
};
</script>
