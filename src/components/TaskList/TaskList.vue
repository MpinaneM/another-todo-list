<template>
    <div>
        <p v-if="error">An error occured, please refresh page</p>
        <p v-else-if="tasks && tasks.length === 0">
            No tasks, click "Add Task" to add a new task
        </p>
        <ul v-else>
            <li v-for="task in tasks" :key="task.id">
                <task-item :task="task" />
            </li>
        </ul>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TaskItem from "../../components/TaskItem/TaskItem.vue";

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
    },
    async mounted() {
        await this.fetchTasks();
    },
    methods: {
        ...mapActions(["FETCH_TASKS"]),
        async fetchTasks() {
            try {
                await this.FETCH_TASKS();
            } catch (error) {
                console.log("ERROR", error);
                this.error = true;
            }
        },
    },
};
</script>
