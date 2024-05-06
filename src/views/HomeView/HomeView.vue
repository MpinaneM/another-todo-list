// as a stretch goal create architecture diagram for this app
<template>
    <main class="w-1/2 border border-solid border-gray-200 m-auto p-8">
        <h2 class="text-2xl font-bold text-center underline">Tasks</h2>
        <div class="justify-end flex my-6">
            <button
                @click.prevent="setShowAddTask(true)"
                class="inline-block p-2 w-32 text-center text-white bg-[#41b783] hover:bg-[#247954] hover:cursor-pointer rounded-md"
            >
                Add Task
            </button>
        </div>
        <task-list />
        <add-task-modal
            v-if="showAddTaskModal"
            @close="setShowAddTask(false)"
        />
    </main>
</template>

<script>
import AddTaskModal from "@/components/AddTaskModal/AddTaskModal.vue";
import TaskList from "@/components/TaskList/TaskList.vue";

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
