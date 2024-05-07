<script setup>
import AppHeader from "@/components/AppHeader/AppHeader.vue";
import ErrorToast from "./components/ErrorToast/ErrorToast.vue";
</script>

<template>
    <div id="app">
        <AppHeader />
        <ErrorToast />
        <router-view />
    </div>
</template>

<style scoped></style>
