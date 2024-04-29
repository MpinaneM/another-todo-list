<template>
    <main>
        <h2>Tasks</h2>
        <div class="add-button-container">
            <button @click.prevent="handleShowAddTask">Add Task</button>
        </div>
        <task-list
            :tasks="tasks"
            @delete-task="deleteTask"
            @show-edit-task="handleShowEditTask"
            @complete-task="completeTask"
        />
        <add-task-modal
            v-if="showAddTaskModal"
            @add-task="addTask"
            @close="handleCancelAddTask"
        />
        <edit-task-modal
            v-if="showEditTaskModal"
            :task="taskToBeEdited"
            @edit-task="editTask"
            @close="handleCancelEditTask"
        />
    </main>
</template>

<script>
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal.vue";
import EditTaskModal from "../../components/EditTaskModal/EditTaskModal.vue";
import GenericModal from "../../components/GenericModal/GenericModal.vue";
import TaskList from "../../components/TaskList/TaskList.vue";
import store from "@/store";

export default {
    components: {
        GenericModal,
        AddTaskModal,
        EditTaskModal,
        TaskList,
    },
    data() {
        return {
            tasks: [],
            showAddTaskModal: false,
            showEditTaskModal: false,
            taskToBeEdited: null,
        };
    },
    mounted() {
        this.fetchTasks();
    },
    methods: {
        handleShowAddTask() {
            this.showAddTaskModal = true;
        },
        handleCancelAddTask() {
            this.showAddTaskModal = false;
        },
        handleShowEditTask(task) {
            console.log("TASK", task);
            this.taskToBeEdited = task;
            this.showEditTaskModal = true;
        },
        handleCancelEditTask() {
            console.log("HANDLE CANCEL EDIT TASK");
            this.showEditTaskModal = false;
            this.taskToBeEdited = null;
        },
        deleteTask(id) {
            const idToken = store.getters.getToken;

            fetch(
                `https://vue-http-demo-ea18d-default-rtdb.firebaseio.com/tasks/${id}.json?auth=${idToken}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                if (response.ok) {
                    this.fetchTasks();
                }
            });
        },
        completeTask(id) {
            const idToken = store.getters.getToken;

            const updatedTask = {
                completed: this.tasks.find((task) => task.id === id).completed,
            };
            fetch(
                `https://vue-http-demo-ea18d-default-rtdb.firebaseio.com/tasks/${id}.json?auth=${idToken}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedTask),
                }
            ).then((response) => {
                if (response.ok) {
                    this.fetchTasks();
                }
            });
        },
        addTask(taskName) {
            const userId = store.getters.getUserId;
            const idToken = store.getters.getToken;

            const newTask = {
                userId,
                name: taskName.trim(),
                completed: false,
            };
            fetch(
                `https://vue-http-demo-ea18d-default-rtdb.firebaseio.com/tasks.json?auth=${idToken}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newTask),
                }
            ).then((response) => {
                if (response.ok) {
                    this.fetchTasks();
                }
            });
        },
        editTask(task) {
            const taskId = task.id;

            const idToken = store.getters.getToken;

            const updatedTask = {
                name: task.name.trim(),
            };
            fetch(
                `https://vue-http-demo-ea18d-default-rtdb.firebaseio.com/tasks/${taskId}.json?auth=${idToken}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedTask),
                }
            ).then((response) => {
                if (response.ok) {
                    this.fetchTasks();
                    this.showEditTaskModal = false;
                    this.taskToBeEdited = null;
                }
            });
        },
        fetchTasks() {
            const userId = store.getters.getUserId;
            const idToken = store.getters.getToken;
            fetch(
                `https://vue-http-demo-ea18d-default-rtdb.firebaseio.com/tasks.json?auth=${idToken}&orderBy="userId"&equalTo="${userId}"`
            )
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const tasks = [];
                    for (const key in data) {
                        const task = {
                            id: key,
                            ...data[key],
                        };
                        tasks.push(task);
                    }
                    this.tasks = tasks;
                });
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
