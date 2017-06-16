import axios from "axios";
import {API_URL} from "../config";
export const GET_BOARD = "GET_PROJECT";
export const GET_BOARD_SUCCESS = "GET_BOARD_SUCCESS";
export const GET_BOARD_FAILURE = "GET_BOARD_FAILURE";

export function getBoard (account) {
    return async dispatch => {
        dispatch({type: GET_BOARD});
        try {
            const {data} = await axios.get(`${API_URL}/board`, {withCredentials: true, headers: {account}});
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
