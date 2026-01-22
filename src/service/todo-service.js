import { createTodo, getTodos } from '../api/todo-api.js'
import { renderTodos } from '../views/todo-views.js';

export async function loadTodos(loadingContainer, errorContainer) {
  try {
    loadingContainer.innerHTML = 'Loading...';
    const todos = await getTodos();
    renderTodos(todos);
    loadingContainer.innerHTML = '';
  } catch (error) {
    loadingContainer.innerHTML = '';
    errorContainer.innerHTML = error.message;
  }
}

export async function saveTodo(todoContainer) {
    try {
        let todoTitle = todoContainer.querySelector('#title').value;
        let todoDescription = todoContainer.querySelector('#description').value;
        console.log(todoTitle);
        await createTodo(self.crypto.randomUUID(), todoTitle, false);
        document.getElementById('addContainer').innerHTML = '';
    } catch (error) {
        errorContainer.innerHTML = error.message;
    }
}