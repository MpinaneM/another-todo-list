<template>
    <div
        class="p-4 h-20 border border-gray-200 mb-4 shadow-md flex items-center rounded-md"
    >
        <input
            type="checkbox"
            v-model="task.completed"
            class="h-4 w-4 hover:cursor-pointer"
        />
        <span class="ml-4 flex-grow text-base">{{ task.name }}</span>
        <button
            @click="setShowEditTaskModal(true)"
            class="ml-4 w-20 bg-blue-400 text-white p-2 hover:bg-blue-500 rounded-md shadow-md"
        >
            Edit
        </button>

        <button
            @click="deleteTask"
            class="ml-4 w-20 h-10 bg-red-600 text-white p-2 hover:bg-red-800 rounded-md shadow-md"
        >
            <template v-if="deleteLoading">
                <div>
                    <Spinner :size="20" color="white" />
                </div>
            </template>
            <template v-else>Delete</template>
        </button>
        <edit-task-modal
            v-if="showEditTaskModal"
            :task="task"
            @close="setShowEditTaskModal(false)"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EditTaskModal from "@/components/EditTaskModal/EditTaskModal.vue";
import Spinner from "@/components/Spinner/Spinner.vue";

export default {
    name: "TaskItem",
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
    data: () => ({
        showEditTaskModal: false,
        deleteLoading: false,
    }),
    components: {
        EditTaskModal,
        Spinner,
    },
    computed: {
        ...mapGetters("tasks", {
            tasks: "getTasks",
        }),
    },
    watch: {
        "task.completed"() {
            this.updateCompletedTask({
                taskId: this.task.id,
                updatedTask: {
                    completed: this.task.completed,
                },
            });
        },
    },
    methods: {
        ...mapActions("tasks", ["UPDATE_TASK", "DELETE_TASK"]),
        ...mapActions(["setErrorToastMessage"]),
        setShowEditTaskModal(show) {
            this.showEditTaskModal = show;
        },
        async deleteTask() {
            try {
                this.deleteLoading = true;
                await this.DELETE_TASK(this.task.id);
                const indexToDelete = this.tasks.findIndex(
                    (task) => task.id === this.task.id
                );
            } catch (error) {
                this.setErrorToastMessage(
                    "An error occurred while deleting the task"
                );
                console.log("ERROR", error);
            } finally {
                this.deleteLoading = false;
            }
        },
        async updateCompletedTask(taskUpdate) {
            try {
                await this.UPDATE_TASK(taskUpdate);
            } catch (error) {
                this.setErrorToastMessage(
                    "An error occurred while updating the task"
                );
                console.log("ERROR", error);
            }
        },
    },
};
</script>
