import './style.css'

// Service methods
import { loadTodos, saveTodo, syncOfflineTodos } from './service/todo-service.js'
import { renderAddTodoItem } from './views/todo-views.js';
import { loginUser } from './api/auth-api.js';

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div id="errorContainer"></div>
    <h1>Today!</h1>
    <div>
    <label for="colorMode">Färg-läge:</label>
    <select id="colorMode">
    <option value="light">Ljus</option>
    <option value="dark">Mörk</option>
    </select>
    </div>
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

window.addEventListener("online", function() {
  errorContainer.innerHTML = "";
  syncOfflineTodos(loadingContainer, errorContainer)
});

window.addEventListener("offline", function() {
  errorContainer.innerHTML = "Offline!";
});

document.getElementById('colorMode').onchange = function(event) {
  let selectedColorMode = event.target.value;
  document.cookie="colorMode="+selectedColorMode+"; max-age=60; path=/";
}

/*
* Nedan är testkod för ett inloggningsflöde!
try {
let isLoggedIn = await loginUser('johan','topsecret');
if (isLoggedIn) {
  console.log("User is logged in!");
}
}catch(error) {
  if (error instanceof TypeError) {
    errorContainer.innerHTML = 'Network error!';
  }
}*/

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      new Response(
        JSON.stringify({ error: "offline" }),
        { headers: { "Content-Type": "application/json" } }
      )
    )
  );
});