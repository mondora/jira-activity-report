import {GET_BOARD_SUCCESS, GET_BOARD_FAILURE} from "../actions/board";

const initialState = {};

export default function board (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
    case GET_BOARD_SUCCESS:
        return payload;
    case GET_BOARD_FAILURE:
        return initialState;
    default:
        return state;
    }
}
