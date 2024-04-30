<template>
    <header>
        <router-link to="/">
            <img
                alt="Vue logo"
                class="logo"
                src="@/assets/logo.svg"
                width="125"
                height="125"
            />
        </router-link>

        <div>
            <nav>
                <router-link to="/">Home</router-link>
                <router-link to="/about">About</router-link>
                <router-link v-if="!isLoggedIn" to="/login">
                    <button>Login</button>
                </router-link>
            </nav>
            <button v-if="isLoggedIn" @click="logout">Logout</button>
        </div>
    </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "AppHeader",
    computed: {
        ...mapGetters(["isLoggedIn"]),
    },
    methods: {
        ...mapActions({
            logoutAction: "LOGOUT",
        }),
        logout() {
            this.logoutAction();
            this.$router.push({ name: "about" });
        },
    },
};
</script>

<style scoped>
header {
    display: flex;
    background-color: #f2f2f2;
    padding: 20px;
    text-align: center;
}
</style>
