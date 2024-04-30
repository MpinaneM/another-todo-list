// as a stretch goal create architecture diagram for this app
<template>
    <main>
        <h2>Tasks</h2>
        <div class="add-button-container">
            <button @click.prevent="setShowAddTask(true)">Add Task</button>
        </div>
        <task-list />
        <add-task-modal
            v-if="showAddTaskModal"
            @close="setShowAddTask(false)"
        />
    </main>
</template>

<script>
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal.vue";
import TaskList from "../../components/TaskList/TaskList.vue";

// v-cloak directive to hide the content until the Vue instance is mounted
// have a look at that

export default {
    components: {
        AddTaskModal,
        TaskList,
    },
    data: () => ({
        showAddTaskModal: false,
    }),
    methods: {
        setShowAddTask(show) {
            this.showAddTaskModal = show;
        },
    },
};
</script>

<style scoped>
main {
    margin: 0 auto;
    width: 50%;
    border: 1px solid #ccc;
}

.add-button-container {
    display: flex;
    justify-content: flex-end;
    padding: 16px;
}
</style>
