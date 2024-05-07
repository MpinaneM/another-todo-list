<template>
    <div v-if="showErrorToast" class="toast">Error occurred!</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["showErrorToast"]),
    },
    methods: {
        ...mapActions(["hideErrorToast"]),
        hideErrorToastMessage() {
            setTimeout(() => {
                this.hideErrorToast();
            }, 3000);
        },
    },
    mounted() {
        this.hideErrorToastMessage();
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
}
</style>
