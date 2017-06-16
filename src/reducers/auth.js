import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    FETCH_USER_INFO,
    FETCH_USER_INFO_SUCCESS,
    FETCH_USER_INFO_FAILURE
} from "../actions/auth";

const initialState = {
    isLoggingIn: false,
    isLoggedIn: false,
    isLoggingOut: false,
    isLoggedOut: true,
    isFetchingInfo: false,
    isFetched: false,
    account: "",
    username: ""
};

export default function auth (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
    case LOGIN_START:
        return {
            isLoggingIn: true,
            isLoggedIn: false,
            account: payload.account,
            username: payload.username
        };
    case LOGIN_SUCCESS:
        return {
            ...state,
            isLoggingIn: false,
            isLoggedIn: true
        };
    case LOGIN_FAILURE:
        return initialState;
    case LOGOUT_START:
        return {
            isLoggingOut: true,
            isLoggedOut: false
        };
    case LOGOUT_SUCCESS:
        return initialState;
    case LOGOUT_FAILURE:
        return {
            ...state,
            isLoggingOut: false,
            isLoggedOut: false
        };
    case FETCH_USER_INFO:
        return {
            isFetchingInfo: true,
            isFetched: false,
            account: payload
        };
    case FETCH_USER_INFO_SUCCESS:
        return {
            ...state,
            isFetchingInfo: false,
            isFetched: true
        };
    case FETCH_USER_INFO_FAILURE:
        return initialState;
    default:
        return state;
    }
}
