import './style.css'

// Service methods
import { loadTodos, saveTodo } from './service/todo-service.js'
import { renderAddTodoItem } from './views/todo-views.js';

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div id="errorContainer"></div>
    <h1>Today!</h1>
    <div id="loadingContainer">Loading...</div>
    <ul id="todos">
    </ul>
    <button id="addItem">+</button>
    <div id="addContainer"></div>
  </div>
`
let loadingContainer = document.getElementById('loadingContainer');
let errorContainer = document.getElementById('errorContainer');
let addButton = document.getElementById('addItem');
addButton.onclick = function() {
  document.getElementById('addContainer').innerHTML = renderAddTodoItem();
  let saveButton = document.getElementById('save');
  saveButton.onclick = async function() {
    let container = document.getElementById('addContainer');
    await saveTodo(container);
    await loadTodos(loadingContainer, errorContainer);
  }
}

loadTodos(loadingContainer, errorContainer);