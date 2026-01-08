import './style.css'
import { createTodoElement, getTodos } from './todos.js' 

document.querySelector('#app').innerHTML = `
  <div>
    <h1>My tasks of today!</h1>
    <ul id="todos">
    </ul>
  </div>
`

function renderTodos(todos) {
  const list = document.getElementById("todos");

  // Rensa listan innan vi renderar på nytt
  list.innerHTML = "";

  todos.forEach(todo => {
    const todoItem = createTodoElement(todo);

    list.appendChild(todoItem);
  });
}

function showOfflineMessage(errorMessage) {
  console.error("error: ", errorMessage);
}

async function loadTodos() {
  try {
    const todos = await getTodos();
    renderTodos(todos);
  } catch (error) {
    showOfflineMessage(error);
  }
}

loadTodos();