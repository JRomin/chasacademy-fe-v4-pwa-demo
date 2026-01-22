export function createTodoElement(todo) {
  const li = document.createElement("li");

  li.className = "todo-item";

  li.innerHTML = `
    <input type="checkbox" ${todo.done ? "checked" : ""}>
    <span style="${todo.done ? "text-decoration: line-through" : ""}">${todo.title}</span>
  `;
  return li;
}

export function renderTodos(todos) {
  const list = document.getElementById("todos");

  // Rensa listan innan vi renderar på nytt
  list.innerHTML = "";

  todos.forEach(todo => {
    const todoItem = createTodoElement(todo);

    list.appendChild(todoItem);
  });
}

export function renderAddTodoItem() {
    return `<div>
        <label for="title">Title:</label>
        <input type="text" id="title"><br>
        <label for="description">Description:</label>
        <textarea id="description"></textarea><br>
        <button id="save">Save</button>
    </div>`;
}