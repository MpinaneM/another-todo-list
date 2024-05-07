<template>
    <GenericModal title="Add Task" actionLabel="Add" @close="cancelAddTask">
        <template v-slot:header>
            <h3>Add Task</h3>
        </template>
        <template v-if="loading">
            <Spinner />
        </template>
        <template v-else>
            <input
                type="text"
                v-model="taskName"
                placeholder="Task name"
                class="w-full p-2 mb-1 border-2 border-gray-200 rounded-md"
            />
        </template>
        <template v-slot:footer>
            <button
                @click="cancelAddTask"
                class="ml-4 w-20 bg-red-600 text-white p-2 hover:bg-red-800 rounded-md hover:cursor-pointer shadow-md mr-2 disabled:opacity-50 disabled:cursor-default"
                :disabled="loading"
            >
                Cancel
            </button>
            <button
                @click="addTask"
                class="p-2 w-20 text-center text-white bg-[#41b783] hover:bg-[#247954] hover:cursor-pointer rounded-md disabled:opacity-50 disabled:cursor-default"
                :disabled="loading"
            >
                Add
            </button>
        </template>
    </GenericModal>
</template>

<script>
import GenericModal from "@/components/GenericModal/GenericModal.vue";
import { mapActions } from "vuex";
import Spinner from "@/components/Spinner/Spinner.vue";

export default {
    components: {
        GenericModal,
        Spinner,
    },
    data() {
        return {
            taskName: "",
            loading: false,
        };
    },
    methods: {
        ...mapActions("tasks", {
            addTaskAction: "ADD_TASK",
            fetchTasksAction: "FETCH_TASKS",
        }),
        ...mapActions(["setErrorToastMessage"]),
        async addTask() {
            try {
                this.loading = true;
                await this.addTaskAction({
                    name: this.taskName.trim(),
                    completed: false,
                });
                await this.fetchTasksAction();
            } catch (error) {
                this.setErrorToastMessage(
                    "An error occurred while adding the task"
                );
                console.log("ERROR", error);
            } finally {
                this.taskName = "";
                this.loading = false;
            }
        },
        cancelAddTask() {
            this.$emit("close");
        },
    },
};
</script>
