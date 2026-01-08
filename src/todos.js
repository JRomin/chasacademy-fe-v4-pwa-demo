const API_URL = "http://localhost:3001/todos";

export async function getTodos() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const todos = await response.json();
    return todos;

  } catch (error) {
    console.error("Failed to fetch todos:", error);

    // Viktigt för PWA:
    // Vi kastar felet vidare så UI kan avgöra
    // om data ska hämtas från cache / visa offline-meddelande
    throw error;
  }
}

export function createTodoElement(todo) {
  const li = document.createElement("li");

  li.className = "todo-item";

  li.innerHTML = `
    <input type="checkbox" disabled>
    <span style="${todo.done ? "text-decoration: line-through" : ""}">${todo.title}</span>
  `;
  return li;
}