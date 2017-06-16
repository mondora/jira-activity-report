import {GET_PROJECT_SUCCESS, GET_PROJECT_FAILURE} from "../actions/project";

const initialState = [];

export default function project (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
    case GET_PROJECT_SUCCESS:
        return payload;
    case GET_PROJECT_FAILURE:
        return initialState;
    default:
        return state;
    }
}
