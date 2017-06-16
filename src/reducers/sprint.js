import {GET_SPRINT_SUCCESS, GET_SPRINT_FAILURE} from "../actions/sprint";

const initialState = [];

export default function project (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
    case GET_SPRINT_SUCCESS:
        return payload;
    case GET_SPRINT_FAILURE:
        return initialState;
    default:
        return state;
    }
}
