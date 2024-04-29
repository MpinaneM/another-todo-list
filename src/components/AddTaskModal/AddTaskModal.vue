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
        addTask() {
            this.$emit("add-task", this.taskName);
            this.taskName = "";
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
