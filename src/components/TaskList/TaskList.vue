<template>
    <div>
        <p v-if="tasks && tasks.length === 0">
            No tasks, click "Add Task" to add a new task
        </p>
        <ul v-else>
            <li v-for="task in tasks" :key="task.id">
                <task-item
                    :task="task"
                    @delete-task="deleteTask"
                    @edit-task="handleShowEditTask(task)"
                    @complete-task="completeTask"
                />
            </li>
        </ul>
    </div>
</template>
<script>
import TaskItem from "../../components/TaskItem/TaskItem.vue";

export default {
    name: "TaskList",
    components: {
        TaskItem,
    },
    props: {
        tasks: {
            type: Array,
            required: true,
            validator: (value) => {
                return value.every((task) => {
                    return (
                        task.hasOwnProperty("id") &&
                        typeof task.id === "number" &&
                        task.hasOwnProperty("name") &&
                        typeof task.name === "string" &&
                        task.hasOwnProperty("completed") &&
                        typeof task.completed === "boolean"
                    );
                });
            },
        },
    },
    methods: {
        deleteTask(id) {
            this.$emit("delete-task", id);
        },
        handleShowEditTask(task) {
            this.$emit("show-edit-task", task);
        },
        completeTask(id) {
            this.$emit("complete-task", id);
        },
    },
};
</script>
