<template>
    <header
        class="w-full flex p-5 h-24 border-b border-solid border-b-gray-200 bg-white mb-24"
    >
        <nav class="grid grid-cols-2 w-full items-end">
            <div class="col-span-1 flex gap-8">
                <router-link to="/" class="self-center">
                    <img
                        alt="Vue logo"
                        class="logo"
                        src="@/assets/logo.svg"
                        width="48"
                        height="48"
                    />
                </router-link>
                <route-link :to="{ name: 'home' }"> Home </route-link>
                <route-link :to="{ name: 'about' }"> About </route-link>
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
import RouteLink from "@/components/RouteLink/RouteLink.vue";

export default {
    name: "AppHeader",
    components: {
        RouteLink,
    },
    computed: {
        ...mapGetters("auth", ["isLoggedIn"]),
        showLoginLogoutButton() {
            return this.$route.name !== "login";
        },
    },
    methods: {
        ...mapActions("auth", {
            logoutAction: "LOGOUT",
        }),
        logout() {
            this.logoutAction();
            this.$router.replace({ name: "login" });
        },
    },
};
</script>

<style scoped>
.button {
    @apply inline-block p-2 w-32 text-center  text-white  bg-[#41b783] hover:bg-[#247954] hover:cursor-pointer rounded-md;
}
</style>
