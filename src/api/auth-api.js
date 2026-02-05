import { apiRequest } from "./todo-api"

const BASE_AUTH_API='http://localhost:3001/users2'

export async function loginUser(userName, password) {
    let users = await apiRequest(BASE_AUTH_API);
    let isUserFound = false;

    for(let i=0;i<users.length;i++) {
        if (users[i].userName === userName
            && users[i].password === password) isUserFound = true;
    }

    return isUserFound;
}