import PropTypes from "prop-types";
import React, {Component} from "react";
import {Route} from "react-router-dom";

import Login from "../views/Login";

export default class PrivateRoot extends Component {

    static propTypes = {
        auth: PropTypes.shape({
            isLoggedIn: PropTypes.bool.isRequired
        }).isRequired,
        component: PropTypes.func,
        name: PropTypes.string,
        path: PropTypes.string
    }

    render () {
        const {auth} = this.props;
        const {
            component: ChildComponent,
            name,
            path
        } = this.props;
        if (auth.isLoggedIn) {
            return (
                <Route
                    exact={true}
                    name={name}
                    path={path}
                    render={props => <ChildComponent {...props} />}
                    strict={false}
                />
            );
        }
        return (
            <Route
                component={Login}
                exact={true}
                name={name}
                path={"/"}
                strict={false}
            />
        );
    }
}
