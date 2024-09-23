import axios from "axios";

const API_REFUND = "http://localhost:3000/todos"

export async function getTodos() {
    const result = await axios.get(`${API_REFUND}`);
    console.log(result.data);
    return result.data;

}

export async function deleteTodo(id) {
    console.log(id);
    await axios.delete(`${API_REFUND}/delete/${id}`)
        .then(response => {
            console.log(`Tâche ${id} supprimer`)
        })
        .catch(error => {
            console.log(error);
        });
    return getTodos();
}

export async function postTodo(todo) {
    await axios.post(`${API_REFUND}/submit`, todo)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        })
    return getTodos();
}