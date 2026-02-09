import { createTodo, getTodos } from '../api/todo-api.js'
import { renderTodos } from '../views/todo-views.js';

export async function loadTodos(loadingContainer, errorContainer, page = 0, pageSize = 5) {
  try {
    loadingContainer.innerHTML = '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span role="status">Loading</span>';
    let todos = await getTodos();
    todos = todos.slice(page * pageSize, (page+1)*pageSize);
    renderTodos(todos);
    loadingContainer.innerHTML = '';
  } catch (error) {
    loadingContainer.innerHTML = '';
    errorContainer.classList.remove('invisible');
    errorContainer.classList.remove('d-none');
    errorContainer.innerHTML = error.message;
  }
}

export async function saveTodo(todoContainer) {
    try {
        let todoTitle = todoContainer.querySelector('#title').value;
        let todoDescription = todoContainer.querySelector('#description').value;
        await createTodo(self.crypto.randomUUID(), todoTitle, false);
        document.getElementById('addContainer').innerHTML = '';
    } catch (error) {
      console.error(error);
      errorContainer.classList.remove('invisible');
      errorContainer.classList.remove('d-none');
      errorContainer.innerHTML = error.message;
    }
}

export async function syncOfflineTodos(loadingContainer, errorContainer) {
  let offlineCache = JSON.parse(localStorage.getItem("todos-queue")) || [];
  if (offlineCache.length == 0) return;
  let syncFailed = false;

  for(let i=0;i<offlineCache.length;i++) {
    let currentTodoItem = offlineCache[i];
    try {
      await createTodo(currentTodoItem.todoItem.id, currentTodoItem.todoItem.title, currentTodoItem.todoItem.done);
    } catch(error) {
      syncFailed = true;
      currentTodoItem.retries++;
      offlineCache[i] = currentTodoItem;
    }
  }
  console.log("Sync status: "+syncFailed);
  if (!syncFailed) {
    localStorage.removeItem("todos-queue");
    try {
      await loadTodos(loadingContainer, errorContainer);
    } catch(error) {
      console.log("Error when loading in sync: "+error);
    }
  } else {
    setTimeout(function() {
      // Testa att sync:a igen efter 5 sekunder.
      syncOfflineTodos(loadingContainer, errorContainer);
    }, 5000);
  }
}