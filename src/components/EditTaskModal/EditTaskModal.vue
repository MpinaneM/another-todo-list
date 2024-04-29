<template>
    <GenericModal
        title="Edit Task"
        actionLabel="Edit"
        :handleAction="editTask"
        @close="cancelEditTask"
    >
        <input type="text" v-model="task.name" placeholder="Task name" />
    </GenericModal>
</template>

<script>
import GenericModal from "@/components/GenericModal/GenericModal.vue";

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
        editTask() {
            this.$emit("edit-task", this.task);
            this.$emit("close");
        },
        cancelEditTask() {
            console.log("CANCEL EDIT TASK");
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
