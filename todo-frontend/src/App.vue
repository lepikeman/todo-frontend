<template>
  <div>
    <button @click="toggleModal" class="submit-button">Add task +</button>
  </div>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 class="text-4xl font-bold mb-6 text-blue-800">Mes Todo</h1>
    <ul class="space-y-4">
      <li v-for="(todo) in todos" :key="todo.id"
          class="p-4 w-80 border border-gray-300 rounded-lg bg-white shadow-md flex items-center justify-between">
        <div>
          <p class="text-lg font-semibold text-gray-700">{{ todo.task }} - {{ todo.taskname }}</p>
          <p class="text-sm text-gray-500"> Urgent: {{ BooleanToWord(todo) }}</p>
        </div>
        <button @click="removeTodos(todo.id)"
                class="text-red-500 hover:text-red-700 font-semibold"
        >Delete</button>
      </li>
    </ul>
    <Modal @postTodo="handleNewTodo" @close="toggleModal" v-if="showModal"/>
  </div>

</template>


<script>
import {deleteTodo, getTodos, } from "@/services/ApiService";
import {BooleanToWord} from "./services/Utility.js";
import Modal from "@/components/Modal.vue";


export default {
  components: {Modal},
  data() {
    return {
      showModal: false,
      todos: [],
    };
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {

    BooleanToWord,
    toggleModal() {
      this.showModal = !this.showModal;
    },
    async fetchTodos() {
      try {
        this.todos = await getTodos(); // Call the service function
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    async removeTodos(id) {
      try {
        this.todos = await deleteTodo(id);
        await this.fetchTodos()
      } catch (error) {
        console.error("Error delete todos", error)
      }
    },
    handleNewTodo(newTodo) {
      this.todos.push(newTodo);
    }
  }
};
</script>


<style>
/* main.css */
.input-field {
  @apply p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.form-label {
  @apply text-gray-700 font-semibold mb-1;
}

.submit-button {
  @apply w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300;
}

</style>
