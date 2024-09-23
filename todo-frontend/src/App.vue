<template>
  <h1>Mes Todo</h1>
  <ul>
    <li v-for="(todo) in todos">
      {{ todo.task }} - {{ todo.taskname }} - {{ BooleanToWord(todo) }}
      <button @click="removeTodos(todo.id)">Delete</button>
    </li>
  </ul>
  <form @submit.prevent="insertTodos()" >
    <span>task</span>
    <input type="text" v-model="todo.task"><br>
    <span>taskName</span>
    <input type="text" v-model="todo.taskname">
    <span>dueDate</span>
    <input type="text" v-model="todo.dueDate">
    <span>urgent</span>
    <input type="checkbox" v-model="todo.urgent">
    <span>user</span>
    <input type="text" v-model="todo.todo_user">
    <button type="submit">submit</button>
  </form>
</template>


<script>
import {deleteTodo, getTodos, postTodo} from "@/services/ApiService";
import {BooleanToWord} from "./services/Utility.js";


export default {
  data() {
    return {
      todos: [],
      todo : {
        task: '',
        taskname: '',
        dueDate: '',
        urgent: false,
        todo_user: 1
      }// To store the fetched JSON data
    };
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {

    BooleanToWord,
    postTodo,
    deleteTodo,
    getTodos,
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
    async insertTodos() {
      try {
        const newTodo = {
          task: this.todo.task,
          taskname: this.todo.taskname,
          dueDate: this.todo.dueDate,
          urgent: this.todo.urgent,
          todo_user: this.todo.todo_user
        }
        this.todos = await postTodo(newTodo);
      } catch (error) {
        console.error(error)
      }
    }
  }
};
</script>


<style scoped>

</style>
