import {LOGIN, LOGOUT} from "../actions/auth";

const initialState = {
    account: null,
    password: null,
    username: null
};

export default function auth (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
    case LOGIN:
        return payload;
    case LOGOUT:
        return initialState;
    default:
        return state;
    }
}
