<template>
    <div v-if="showErrorToast" class="toast">{{ errorToastMessage }}</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data: () => ({
        timer: null,
    }),
    computed: {
        ...mapGetters(["showErrorToast", "errorToastMessage"]),
    },
    methods: {
        ...mapActions(["hideErrorToast"]),
        hideErrorToastMessage() {
            this.timer = setTimeout(() => {
                this.hideErrorToast();
            }, 3000);
        },
    },
    watch: {
        showErrorToast(newValue) {
            if (newValue) {
                this.hideErrorToastMessage();
            }
        },
    },
    beforeDestroy() {
        clearTimeout(this.timer);
    },
};
</script>

<style scoped>
.toast {
    position: fixed;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    background-color: red;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 1000;
}
</style>
