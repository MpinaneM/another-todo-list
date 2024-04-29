<template>
    <div class="task-item">
        <input
            type="checkbox"
            v-model="task.completed"
            class="checkbox"
            @change="completeTask"
        />
        <span class="task-name">{{ task.name }}</span>
        <button @click="editTask" class="edit-button">Edit</button>
        <button @click="deleteTask" class="delete-button">Delete</button>
    </div>
</template>

<script>
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
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            isChecked: false,
        };
    },
    methods: {
        editTask() {
            this.$emit("edit-task", this.task.id);
        },
        deleteTask() {
            this.$emit("delete-task", this.task.id);
        },
        completeTask() {
            this.$emit("complete-task", this.task.id);
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
