import axios from "axios";
import {API_URL} from "../config";
export const GET_PROJECT = "GET_PROJECT";
export const GET_PROJECT_SUCCESS = "GET_PROJECT_SUCCESS";
export const GET_PROJECT_FAILURE = "GET_PROJECT_FAILURE";

export function getProject (account) {
    return async dispatch => {
        dispatch({type: GET_PROJECT});
        try {
            const {data} = await axios.get(`${API_URL}/project`, {withCredentials: true, headers: {account}});
            dispatch({
                type: GET_PROJECT_SUCCESS,
                payload: data
            });
        } catch (e) {
            dispatch({
                type: GET_PROJECT_FAILURE,
                error: e
            });
        }
    };
}
