import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

const posts = [
    {
        "id": "47cf7acf-d0ff-42da-9e85-70e92f062dd7",
        "title": "Testa PWA Offline",
        "done": true
    }
  // ...
]

export const restHandlers = [
  http.get('http://localhost:3001/todos', () => {
    return HttpResponse.json(posts)
  }),
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers())

//print ("Did setup!")