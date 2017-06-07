import {expect} from "chai";

import {
    LOGIN,
    LOGOUT
} from "actions/auth";
import reducer from "reducers/auth";

describe("auth reducers", () => {
    it("LOGIN reducer", () => {
        const state = {
            account: null,
            password: null,
            username: null
        };
        const action = {
            type: LOGIN,
            payload: {
                account: "account",
                password: "password",
                username: "username"
            }
        };
        expect(
            reducer(state, action)
        ).to.deep.equal(action.payload);
    });
    it("LOGOUT reducer", () => {
        const state = {
            account: "account",
            password: "password",
            username: "username"
        };
        const action = {
            type: LOGOUT,
            payload: {
                account: null,
                password: null,
                username: null
            }
        };
        expect(
            reducer(state, action)
        ).to.deep.equal(action.payload);
    });
    it("default reducer", () => {
        const state = {
            account: "account",
            password: "password",
            username: "username"
        };
        const action = {
            type: "NOT_SUPPORTED"
        };
        expect(
            reducer(state, action)
        ).to.deep.equal(state);
    });
});
