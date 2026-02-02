const API_URL = "http://pro.local:3001/todos";

export async function getTodos() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const todos = await response.json();
    localStorage.setItem('todos-cache', JSON.stringify(todos));
    return todos;

  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return JSON.parse(localStorage.getItem('todos-cache')) || [];

    // Viktigt för PWA:
    // Vi kastar felet vidare så UI kan avgöra
    // om data ska hämtas från cache / visa offline-meddelande
//    throw error;
  }
}

export async function createTodo(todoId, todoTitle, isChecked  ) {
  try {
    const rawResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: todoId, title: todoTitle, done: isChecked})
    });
  }
  catch (error) {
    throw error;
  }
}