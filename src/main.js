import './style.css'

// Service methods
import { loadTodos } from './service/todo-service.js'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div id="errorContainer"></div>
    <h1>Today!</h1>
    <div id="loadingContainer">Loading...</div>
    <ul id="todos">
    </ul>
  </div>
`
let loadingContainer = document.getElementById('loadingContainer');
let errorContainer = document.getElementById('errorContainer');

loadTodos(loadingContainer, errorContainer);