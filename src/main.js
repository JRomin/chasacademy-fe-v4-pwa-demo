//import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap';

// Service methods
import { loadTodos, saveTodo, syncOfflineTodos } from './service/todo-service.js'
import { renderAddTodoItem } from './views/todo-views.js';
//import { loginUser } from './api/auth-api.js';

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div id="errorContainer" class="alert alert-danger invisible d-none" role="alert"></div>
    <h1>Today!</h1>
    <div class="input-group">
    <label class="form-label" for="colorMode">Färg-läge:</label>
      <select class="form-select" id="colorMode">
        <option value="light">Ljus</option>
        <option value="dark">Mörk</option>
      </select>
    </div>
    <div id="loadingContainer">Loading...</div>
    <ul id="todos" class="list-group list-group-flush mt-2">
    </ul>
    <div id="load-trigger"></div>
    <button class="btn btn-primary" id="addItem">+</button>
    <div id="addContainer"></div>
  </div>
`
let loadingContainer = document.getElementById('loadingContainer');
let errorContainer = document.getElementById('errorContainer');
let addButton = document.getElementById('addItem');
addButton.onclick = function() {
  let addContainer = document.getElementById('addContainer');
  if (addContainer.childNodes.length > 0) {
    // Clear children
    addContainer.replaceChildren();
  } else {
    addContainer.innerHTML = renderAddTodoItem();
    let saveButton = document.getElementById('save');
    saveButton.onclick = async function() {
      let container = document.getElementById('addContainer');
      await saveTodo(container);
      await loadTodos(loadingContainer, errorContainer);
    }
  }
}

let currentPage = 0;

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

const observer = new IntersectionObserver(
  async entries => {
    if (entries[0].isIntersecting) {
      currentPage += 1;
      await loadTodos(loadingContainer, errorContainer, currentPage);
    }
  }
);

observer.observe(
  document.querySelector("#load-trigger")
);