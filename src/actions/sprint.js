import axios from "axios";

export const GET_SPRINT = "GET_SPRINT";
export const GET_SPRINT_SUCCESS = "GET_SPRINT_SUCCESS";
export const GET_SPRINT_FAILURE = "GET_SPRINT_FAILURE";

export function getSprint (account, username, password) {
    return async dispatch => {
        dispatch({type: GET_SPRINT});
        try {
            const {data} = await axios.get(`https://${account}.atlassian.net/rest/agile/1.0/board/104/sprint`, {
                auth: {"username": username, "password": password}
            });
            dispatch({
                type: GET_SPRINT_SUCCESS,
                payload: data
            });
        } catch (e) {
            dispatch({
                type: GET_SPRINT_FAILURE,
                error: e
            });
        }
    };
}
