import {expect} from "chai";

import {
    LOGIN,
    LOGOUT,
    login,
    logout
} from "actions/auth";

describe("auth actions", () => {

    describe("login action", () => {

        it("returns the correct object", () => {
            const ret = login("account", "username", "password");
            expect(ret).to.deep.equal({
                type: LOGIN,
                payload: {
                    account: "account",
                    username: "username",
                    password: "password"
                }
            });
        });

    });

    describe("logout action", () => {
        it("returns the correct object", () => {
            const ret = logout();
            expect(ret).to.deep.equal({
                type: LOGOUT
            });
        });
    });

});
