import {combineReducers} from "redux";

import auth from "./auth";
import project from "./project";
import sprint from "./sprint";
export default combineReducers({
    auth,
    project,
    sprint
});
