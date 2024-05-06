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
            class="ml-4 w-20 bg-red-600 text-white p-2 hover:bg-red-800 rounded-md shadow-md"
        >
            Delete
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
    }),
    components: {
        EditTaskModal,
    },
    computed: {
        ...mapGetters({
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
        ...mapActions(["UPDATE_TASK", "DELETE_TASK"]),
        setShowEditTaskModal(show) {
            this.showEditTaskModal = show;
        },
        async deleteTask() {
            try {
                await this.DELETE_TASK(this.task.id);
                const indexToDelete = this.tasks.findIndex(
                    (task) => task.id === this.task.id
                );
            } catch (error) {
                console.log("ERROR", error);
            }
        },
        async updateCompletedTask(taskUpdate) {
            try {
                await this.UPDATE_TASK(taskUpdate);
            } catch (error) {
                console.log("ERROR", error);
            }
        },
    },
};
</script>
