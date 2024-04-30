<template>
    <GenericModal title="Add Task" actionLabel="Add" @close="cancelAddTask">
        <template v-slot:header>
            <h3>Add Task</h3>
        </template>
        <input type="text" v-model="taskName" placeholder="Task name" />
        <template v-slot:footer>
            <button @click="cancelAddTask">Cancel</button>
            <button @click="addTask">Add</button>
        </template>
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
        ...mapActions({
            addTaskAction: "ADD_TASK",
            fetchTasksAction: "FETCH_TASKS",
        }),
        async addTask() {
            try {
                await this.addTaskAction({
                    name: this.taskName.trim(),
                    completed: false,
                });
                await this.fetchTasksAction();
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
