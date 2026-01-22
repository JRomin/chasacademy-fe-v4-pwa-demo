import { getTodos } from '../api/todo-api.js'
import { renderTodos } from '../views/todo-views.js';

export async function loadTodos(loadingContainer, errorContainer) {
  try {
    loadingContainer.innerHTML = 'Loading...';
    const todos = await getTodos();
    renderTodos(todos);
    loadingContainer.innerHTML = '';
  } catch (error) {
    errorContainer.innerHTML = error;
    console.error("error: ", error);
  }
}
