<template>
    <GenericModal
        title="Add Task"
        actionLabel="Add"
        :handleAction="addTask"
        @close="cancelAddTask"
    >
        <input type="text" v-model="taskName" placeholder="Task name" />
    </GenericModal>
</template>

<script>
import GenericModal from "@/components/GenericModal/GenericModal.vue";
import { mapActions } from "vuex";

export default {
    components: {
        GenericModal,
    },
    data() {
        return {
            taskName: "",
        };
    },
    methods: {
        ...mapActions(["ADD_TASK", "FETCH_TASKS"]),
        async addTask() {
            try {
                await this.ADD_TASK({
                    name: this.taskName.trim(),
                    completed: false,
                });
                await this.FETCH_TASKS();
            } catch (error) {
                console.log("ERROR", error);
            } finally {
                this.taskName = "";
            }
        },
        cancelAddTask() {
            this.$emit("close");
        },
    },
};
</script>

<style scoped>
input {
    width: 100%;
}
</style>
