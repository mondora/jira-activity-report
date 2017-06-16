import axios from "axios";

export const POST_LOGIN = "POST_LOGIN";
export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
export const POST_LOGIN_FAILURE = "POST_LOGIN_FAILURE";

export function jiraLogin (account, username, password) {
    return async dispatch => {
        dispatch({type: POST_LOGIN});
        try {
            const {data} = await axios.post(`https://${account}.atlassian.net/rest/greenhopper/latest/xboard/work/allData/?rapidViewId={104}`, {auth: {"username": username, "password": password}});
            dispatch({
                type: POST_LOGIN_SUCCESS,
                payload: data
            });
        } catch (e) {
            dispatch({
                type: POST_LOGIN_FAILURE,
                error: e
            });
        }
    };
}
