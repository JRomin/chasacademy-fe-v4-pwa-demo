const API_URL = "http://localhost:3001/todos";

export async function getTodos() {
  try {
    const todos = await apiRequest(API_URL);
    return todos;

  } catch (error) {
    throw error;
  }
}

export async function apiRequest(requestUrl, options = {}) {
  const response = await fetch(requestUrl, options);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  try {
    const responseData = await response.json();
    return responseData;

  } catch (error) {
    throw error;
  }
}

export async function updateTodo(todoId, todoTitle, isChecked) {
  let newTodoItem = {id: todoId, title: todoTitle, done: isChecked};
  try {
    const rawResponse = await apiRequest(`${API_URL}/${todoId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodoItem)
    });
  }
  catch (error) {
    let offlineQueue = JSON.parse(localStorage.getItem("todos-queue")) || [];
    let syncItemFound = false;
    for(let i=0;i<offlineQueue.length;i++) {
      let currentSyncItem = offlineQueue[i];
      if (currentSyncItem.syncId === todoId) syncItemFound = true;
      currentSyncItem.todoItem.done = isChecked;
    }

    if (!syncItemFound) {
      console.log("Add sync item with id: "+todoId);
      offlineQueue.push({todoItem: newTodoItem, retires: 0, syncId: todoId, syncOperation: "update"});
    }

    localStorage.setItem("todos-queue", JSON.stringify(offlineQueue));
    throw error;
  }
}

export async function deleteTodo(todoId) {
    try {
    const rawResponse = await apiRequest(`${API_URL}/${todoId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }
  catch (error) {
    let offlineQueue = JSON.parse(localStorage.getItem("todos-queue")) || [];
    let syncItemFound = false;
    for(let i=0;i<offlineQueue.length;i++) {
      let currentSyncItem = offlineQueue[i];
      if (currentSyncItem.syncId === todoId) syncItemFound = true;
    }

    if (!syncItemFound) {
      console.log("Add sync item with id: "+todoId);
      let newTodoItem = {id: todoId, title: '', done: false};
      offlineQueue.push({todoItem: newTodoItem, retires: 0, syncId: todoId, syncOperation: "delete"});
    }

    localStorage.setItem("todos-queue", JSON.stringify(offlineQueue));
    throw error;
  }
}

export async function createTodo(todoId, todoTitle, isChecked  ) {
  let newTodoItem = {id: crypto.randomUUID(), title: todoTitle, done: isChecked};
  try {
    const rawResponse = await apiRequest(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodoItem)
    });
    return rawResponse;
  }
  catch (error) {
    throw error;
  }
}