export function createTodoElement(todo) {
  const li = document.createElement("li");

  li.className = "list-group-item";

  li.innerHTML = `
    <input class="form-check-input" type="checkbox" ${todo.done ? "checked" : ""}>
    <span style="${todo.done ? "text-decoration: line-through" : ""}">${todo.title}</span>
  `;
  return li;
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