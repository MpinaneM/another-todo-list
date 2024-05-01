<template>
    <GenericModal title="Edit Task" actionLabel="Edit" @close="cancelEditTask">
        <template v-slot:header>
            <h3>Edit Task</h3>
        </template>

        <input
            type="text"
            :value="task.name"
            ref="taskName"
            placeholder="Task name"
        />
        <template v-slot:footer>
            <button @click="cancelEditTask">Cancel</button>
            <button @click="editTask">Edit</button>
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
    //v-model getters & setter. make sure the changes value doesn't update in the parent
    methods: {
        ...mapActions(["UPDATE_TASK"]),
        async editTask() {
            try {
                await this.UPDATE_TASK({
                    taskId: this.task.id,
                    updatedTask: {
                        name: this.$refs.taskName.value.trim(),
                    },
                });

                this.task.name = this.$refs.taskName.value.trim();
                this.$emit("close");
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
