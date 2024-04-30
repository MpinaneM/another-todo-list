<template>
    <GenericModal
        title="Edit Task"
        actionLabel="Edit"
        :handleAction="editTask"
        @close="cancelEditTask"
    >
        <input
            type="text"
            :value="task.name"
            ref="taskName"
            placeholder="Task name"
        />
    </GenericModal>
</template>

<script>
import GenericModal from "@/components/GenericModal/GenericModal.vue";
import { mapActions } from "vuex";

export default {
    components: {
        GenericModal,
    },
    props: {
        task: {
            type: Object,
            required: true,
            validator: (value) => {
                return (
                    value.hasOwnProperty("id") &&
                    typeof value.id === "number" &&
                    value.hasOwnProperty("name") &&
                    typeof value.name === "string" &&
                    value.hasOwnProperty("completed") &&
                    typeof value.completed === "boolean"
                );
            },
        },
    },
    methods: {
        ...mapActions(["UPDATE_TASK", "FETCH_TASKS"]),
        async editTask() {
            try {
                await this.UPDATE_TASK({
                    taskId: this.task.id,
                    updatedTask: {
                        name: this.$refs.taskName.value.trim(),
                    },
                });
                this.$emit("close");
                await this.FETCH_TASKS();
            } catch (error) {
                console.log("ERROR", error);
            }
        },
        cancelEditTask() {
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
