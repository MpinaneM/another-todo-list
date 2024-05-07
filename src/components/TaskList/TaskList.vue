<template>
    <div v-cloak>
        <template v-if="loading">
            <Spinner />
        </template>
        <template v-else-if="error">
            <p>An error occurred, please try again</p>
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
import Spinner from "@/components/Spinner/Spinner.vue";

export default {
    name: "TaskList",
    components: {
        TaskItem,
        Spinner,
    },
    data: () => ({
        error: false,
        loading: false,
    }),
    computed: {
        ...mapGetters("tasks", {
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
        ...mapActions("tasks", {
            fetchTasks: "FETCH_TASKS",
        }),
        ...mapActions(["setErrorToastMessage"]),
        async loadTasks() {
            try {
                this.loading = true;
                await this.fetchTasks();
            } catch (error) {
                this.setErrorToastMessage(
                    "An error occurred while fetching tasks"
                );
                this.error = true;
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
