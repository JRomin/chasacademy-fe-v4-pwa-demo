import { deleteTodoItem, setTodoItemDone } from "../service/todo-service";

export function createTodoElement(todo) {
  const li = document.createElement("li");

  li.className = "list-group-item d-flex justify-content-between align-items-center";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = todo.done;
  input.dataset.todoId = todo.id;
  input.onclick = function() {
    setTodoItemDone(this);
  }

  const span = document.createElement('span');
  span.style = todo.done ? "text-decoration: line-through" : "";
  span.classList.add("ms-2");
  span.classList.add("me-auto");
  span.innerHTML = todo.title;

  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('bi');
  deleteIcon.classList.add('bi-trash');
  deleteIcon.dataset.todoId = todo.id;
  deleteIcon.onclick = async function() {
    let loadingContainer = document.getElementById('loadingContainer');
    let errorContainer = document.getElementById('errorContainer');
    await deleteTodoItem(this, loadingContainer, errorContainer);
  }

  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(deleteIcon);

  return li;
}

export function clearTodoList() {
  const list = document.getElementById("todos");
  // Clears all childNodes
  list.replaceChildren();
}

export function renderTodos(todos) {
  const list = document.getElementById("todos");

  // Rensa listan innan vi renderar på nytt
  //list.innerHTML = "";

  todos.forEach(todo => {
    const todoItem = createTodoElement(todo);

    list.appendChild(todoItem);
  });
}

export function renderAddTodoItem() {
    return `<div>
        <div class="mb-1">
        <label for="title" class="form-label">Title:</label>
        <input class="form-control" type="text" id="title">
        </div>
        <div class="mb-1">
        <label class="form-label" for="description">Description:</label>
        <textarea class="form-control" id="description"></textarea>
        </div>
        <div class="mb-1">
        <button class="btn btn-primary" id="save">Save</button>
        </div>
    </div>`;
}