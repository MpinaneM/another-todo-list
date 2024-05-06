<template>
    <div>
        <template v-if="error">
            <p>An error occured, please refresh page</p>
        </template>
        <template v-else-if="noTasksAvailable">
            <p>No tasks, click "Add Task" to add a new task</p>
        </template>
        <template v-else>
            <ul>
                <li v-for="task in tasks" :key="task.id">
                    <task-item :task="task" />
                </li>
            </ul>
        </template>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TaskItem from "@/components/TaskItem/TaskItem.vue";

export default {
    name: "TaskList",
    components: {
        TaskItem,
    },
    data: () => ({
        error: false,
    }),
    computed: {
        ...mapGetters({
            tasks: "getTasks",
        }),
        noTasksAvailable() {
            return this.tasks?.length === 0;
        },
    },
    async mounted() {
        await this.loadTasks();
    },
    methods: {
        ...mapActions({
            fetchTasks: "FETCH_TASKS",
        }),
        async loadTasks() {
            try {
                await this.fetchTasks();
            } catch (error) {
                console.log("ERROR", error);
                this.error = true;
            }
        },
    },
};
</script>
