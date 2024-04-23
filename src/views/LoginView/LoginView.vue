<template>
    <div class="login-view">
        <h1>Login</h1>
        <p v-if="hasIncorrectCredentials">Username and/or password are incorrect, please try again</p>
        <form @submit.prevent="submitLogin">
        
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
    data() {
        return {
            username: '',
            password: '',
            hasIncorrectCredentials: false
        };
    },
    methods: {
        ...mapActions(['login']),
        submitLogin() {
            if (this.username === 'admin' && this.password === 'pass') {
                this.login(true);
                this.$router.push('/');
            } else {
                this.hasIncorrectCredentials = true;
                this.username = '';
                this.password = '';
            }
        }
    }
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