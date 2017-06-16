import {combineReducers} from "redux";

import auth from "./auth";
import project from "./project";
import sprint from "./sprint";
import board from "./board";

export default combineReducers({
    auth,
    board,
    project,
    sprint
});
