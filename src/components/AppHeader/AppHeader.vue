<template>
    <header
        class="w-full flex p-5 h-24 border-b border-solid border-b-gray-200 bg-white mb-24"
    >
        <nav class="grid grid-cols-3 w-full items-end">
            <router-link to="/" class="self-center">
                <img
                    alt="Vue logo"
                    class="logo"
                    src="@/assets/logo.svg"
                    width="48"
                    height="48"
                />
            </router-link>
            <div
                class="w-1/4 col-span-1 flex justify-between justify-self-center"
            >
                <router-link :to="{ name: 'home' }">Home</router-link>
                <router-link :to="{ name: 'about' }">About</router-link>
            </div>

            <div class="self-end justify-self-end">
                <template v-if="showLoginLogoutButton">
                    <router-link
                        v-if="!isLoggedIn"
                        :to="{ name: 'login' }"
                        class="button"
                    >
                        Login
                    </router-link>
                    <button class="button" v-if="isLoggedIn" @click="logout">
                        Logout
                    </button>
                </template>
            </div>
        </nav>
    </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "AppHeader",
    computed: {
        ...mapGetters(["isLoggedIn"]),
        showLoginLogoutButton() {
            return this.$route.path !== "/login";
        },
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
.button {
    @apply inline-block p-2 w-32 text-center  text-white  bg-[#41b783] hover:bg-[#247954] hover:cursor-pointer rounded-md;
}
</style>
