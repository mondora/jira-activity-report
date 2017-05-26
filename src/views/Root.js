import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";

import Login from "./Login";

const styles = {
    container: {
        height: "100%",
        width: "100%"
    }
};

export default class Root extends Component {

    render () {
        return (
            <div className="v-Root" style={styles.container}>
                <Route
                    exact={true}
                    path="/"
                    render={() => <Redirect to="/login/" />}
                    strict={true}
                />
                <Route
                    component={Login}
                    exact={true}
                    path="/login/"
                    strict={false}
                />
            </div>
        );
    }

}
