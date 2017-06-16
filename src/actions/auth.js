import axios from "axios";

import {API_URL} from "../config";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_START = "LOGOUT_START";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const FETCH_USER_INFO = "FETCH_USER_INFO";
export const FETCH_USER_INFO_SUCCESS = "FETCH_USER_INFO_SUCCESS";
export const FETCH_USER_INFO_FAILURE = "FETCH_USER_INFO_FAILURE";

export function login (account, username, password) {
    return async dispatch => {
        dispatch({type: LOGIN_START, payload: {account, username}});
        try {
            const {data} = await axios.post(`${API_URL}/session`, {username, password}, {headers: {account}});
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            });
        } catch (e) {
            dispatch({
                type: LOGIN_FAILURE,
                error: e
            });
        }
    };
}

export function logout (account) {
    return async dispatch => {
        dispatch({type: LOGOUT_START});
        try {
            const {data} = await axios.delete(`${API_URL}/session`, {withCredentials: true, headers: {account}});
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: data
            });
        } catch (e) {
            dispatch({
                type: LOGOUT_FAILURE,
                error: e
            });
        }
    };
}

export function userInfo (account, cookie) {
    return async dispatch => {
        dispatch({type: FETCH_USER_INFO});
        try {
            const {data} = await axios.get(`${API_URL}/session`, {withCredentials: true, headers: {account, cookie}});
            dispatch({
                type: FETCH_USER_INFO_SUCCESS,
                payload: data
            });
        } catch (e) {
            dispatch({
                type: FETCH_USER_INFO_FAILURE,
                error: e
            });
        }
    };
}
