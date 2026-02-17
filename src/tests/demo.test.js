import { describe, expect, test } from "vitest";
import { createTodo, getTodos } from "../api/todo-api";
import { randomUUID } from "crypto"
import { error } from "console";

test('Logik test', () => {
    expect(1+1).toBe(2)
});

test('Hämta todos', async () => {
    const todosResult = await getTodos();
    // Hämta alla todos och utgå ifrån att första elementet i listan ha nedan id.
    expect(todosResult[0].id).toBe('47cf7acf-d0ff-42da-9e85-70e92f062dd7')
});

test('Spara en todo', async () => {
    // Testa att skapa en todo och se att mock lagret hanterar det.
    let todoToCreate = {id: randomUUID(), titletodoToCreate: 'Create from testcase', done: false};
    let response = await createTodo('', todoToCreate.title, todoToCreate.done);
    expect(response.id).toBe('47cf7acf-d0ff-42da-9e85-70e92f062dd7')
});