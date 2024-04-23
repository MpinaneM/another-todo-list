<template>
  <main>
    
    <h2>Tasks</h2>
    <button @click.prevent="handleShowAddTask">Add Task</button>
    <ul>
      <li v-for="task in tasks" :key="task.id">
       <input type="checkbox" :id="task.id" v-model="task.completed" @change="updateTask">
       <span :class="{ completed: task.completed }">{{ task.name }}</span>
       <button @click="deleteTask(task.id)">Delete</button>
       <button @click="handleShowEditTask(task.id)">Edit</button>
       </li>
    </ul>
    <generic-modal :show="showAddTaskModal" @close="handleCancelAddTask" title="Add Task" actionLabel="Add" :handleAction="addTask">
        <input type="text" v-model="newTaskName" placeholder="Task name" /> 
    </generic-modal>
  </main>
</template>

<script>
import GenericModal from '../../components/GenericModal/GenericModal.vue';

export default {
    components: {
        GenericModal,
    },  
    data() {
        return { 
            tasks: [],
            newTaskName: '',
            showAddTaskModal: false,
        };
    },
    created() {
        this.tasks = [
            { id: 1, name: 'Task 1', completed: false },
            { id: 2, name: 'Task 2', completed: true },
            { id: 3, name: 'Task 3', completed: false },
        ];
    },
    methods: {
        handleShowAddTask() {
            this.showAddTaskModal = true;
        },
        handleCancelAddTask() {
            this.showAddTaskModal = false;
        },
        handleShowEditTask(id) {
            this.showEditTaskModal = true;
            this.editTaskObj = this.tasks.find(task => task.id === id);
        },
        handleCancelEditTask() {
            this.showEditTaskModal = false;
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(task => task.id !== id);
        },
        updateTask(id) {
            const task = this.tasks.find(task => task.id === id);
            task.completed = !task.completed;
        },
        addTask() {
            const newTask = {
                id: this.tasks.length + 1,
                name: this.newTaskName.trim(),
                completed: false,
            };
            this.tasks.push(newTask);
            this.newTaskName = '';
        },
    }
};
</script>

<style scoped>
main {
    margin: 0 auto;
    width: 50%;
    border: 1px solid #ccc;
}
</style>