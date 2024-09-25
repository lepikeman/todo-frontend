<template>
  <div @click.self="closeModal" class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
    <div class="p-8 bg-white shadow-lg rounded-lg max-w-lg w-full">
      <form @submit.prevent="insertTodos()" class="space-y-6">
        <div class="flex flex-col">
          <label for="task" class="form-label">task</label>
          <input type="text" id="task" v-model="todo.task" class="input-field"><br>
        </div>
        <div class="flex flex-col">
          <label class="form-label">taskName</label>
          <input type="text" v-model="todo.taskname" class="input-field">
        </div>
        <div class="flex flex-col">
          <label class="form-label">dueDate</label>
          <input type="text" v-model="todo.dueDate" class="input-field">
        </div>
        <div class="flex items-center">
          <input type="checkbox" v-model="todo.urgent" class="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded">
          <label class="text-gray-700 font-semibold">urgent</label>
        </div>
        <div class="flex flex-col">
          <label class="form-label">user</label>
          <input type="text" v-model="todo.todo_user" class="input-field">
        </div>

        <button type="submit" class="submit-button">submit</button>
      </form>
    </div>

  </div>
</template>

<script>
import {postTodo} from "@/services/ApiService.js";

export default {
  name: "modal",
  data() {
    return {

      todo : {
        task: '',
        taskname: '',
        dueDate: '',
        urgent: false,
        todo_user: 1
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
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
        await postTodo(newTodo);
        this.$emit('postTodo', newTodo);
        this.closeModal();

      } catch (error) {
        console.error(error)
      }
    }
  },
}
</script>



<style scoped>

</style>