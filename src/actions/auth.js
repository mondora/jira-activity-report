export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export function login (account, username, password) {
    return {
        type: LOGIN,
        payload: {
            account: account,
            username: username,
            password: password
        }
    };
}

export function logout () {
    return {
        type: LOGOUT
    };
}
