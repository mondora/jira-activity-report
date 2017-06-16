import axios from "axios";

export const GET_BOARD = "GET_PROJECT";
export const GET_BOARD_SUCCESS = "GET_BOARD_SUCCESS";
export const GET_BOARD_FAILURE = "GET_BOARD_FAILURE";

export function getBoard (account, username, password) {
    return async dispatch => {
        dispatch({type: GET_BOARD});
        try {
            const {data} = await axios.get(`https://${account}.atlassian.net/rest/agile/1.0/board`, {
                auth: {"username": username, "password": password}
            });
            dispatch({
                type: GET_BOARD_SUCCESS,
                payload: data
            });
        } catch (e) {
            dispatch({
                type: GET_BOARD_FAILURE,
                error: e
            });
        }
    };
}
