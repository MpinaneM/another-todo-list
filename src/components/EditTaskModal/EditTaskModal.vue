<template>
    <GenericModal title="Edit Task" actionLabel="Edit" @close="cancelEditTask">
        <template v-slot:header>
            <h3>Edit Task</h3>
        </template>
        <template v-if="loading">
            <Spinner />
        </template>
        <template v-else>
            <input
                type="text"
                :value="task.name"
                ref="taskName"
                placeholder="Task name"
                class="w-full p-2 mb-1 border-2 border-gray-200 rounded-md"
            />
        </template>
        <template v-slot:footer>
            <button
                @click="cancelEditTask"
                class="ml-4 w-20 bg-red-600 text-white p-2 hover:bg-red-800 rounded-md shadow-md mr-2 disabled:opacity-50 disabled:cursor-default"
                :disabled="loading"
            >
                Cancel
            </button>
            <button
                @click="editTask"
                class="p-2 w-20 text-center bg-blue-400 text-white hover:bg-blue-500 hover:cursor-pointer rounded-md disabled:opacity-50 disabled:cursor-default"
                :disabled="loading"
            >
                Edit
            </button>
        </template>
    </GenericModal>
</template>

<script>
import GenericModal from "@/components/GenericModal/GenericModal.vue";
import Spinner from "@/components/Spinner/Spinner.vue";
import { mapActions } from "vuex";

export default {
    components: {
        Spinner,
        GenericModal,
    },
    data() {
        return {
            loading: false,
        };
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
        ...mapActions("tasks", ["UPDATE_TASK"]),
        ...mapActions(["setErrorToastMessage"]),
        async editTask() {
            try {
                this.loading = true;
                const inputValue = this.$refs.taskName.value.trim();
                await this.UPDATE_TASK({
                    taskId: this.task.id,
                    updatedTask: {
                        name: inputValue,
                    },
                });
                this.task.name = inputValue;
                this.$emit("close");
            } catch (error) {
                console.log("ERROR", error);
                this.setErrorToastMessage(
                    "An error occurred while updating the task"
                );
            } finally {
                this.loading = false;
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
