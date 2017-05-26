import React, {Component} from "react";

import logo from "./logo.svg";
import "./Login.css";

const styles = {
    appContainer: {
        textAlign: "center"
    }
};

class Root extends Component {

    render () {
        return (
            <div style={styles.appContainer}>
                <div className="App-header">
                    <img alt="logo" className="App-logo" src={logo} />
                    <h2>{"Welcome to React"}</h2>
                </div>
                <p className="App-intro">
                    {"To get started, edit"} <code>{"src/App.js"}</code> {"and save to reload."}
                </p>
            </div>
        );
    }

}

export default Root;
