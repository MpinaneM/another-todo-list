<template>
    <div class="task-item">
        <input type="checkbox" v-model="task.completed" class="checkbox" />
        <span class="task-name">{{ task.name }}</span>
        <button @click="setShowEditTaskModal(true)" class="edit-button">
            Edit
        </button>
        <button @click="deleteTask" class="delete-button">Delete</button>
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

<style scoped>
.task-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 16px;
    border-bottom: 1px solid #ccc;
}

.checkbox {
    margin-right: 10px;
}

.task-name {
    flex-grow: 1;
}

.edit-button,
.delete-button {
    margin-left: 10px;
}
</style>
