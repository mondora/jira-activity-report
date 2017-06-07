import PropTypes from "prop-types";
import React, {Component} from "react";
import {Route} from "react-router-dom";

import Login from "../views/Login";

export default class PrivateRoot extends Component {

    static propTypes = {
        auth: PropTypes.shape({
            account: PropTypes.string,
            password: PropTypes.string,
            username: PropTypes.string
        }).isRequired,
        component: PropTypes.func,
        name: PropTypes.string,
        path: PropTypes.string
    }

    constructor (props) {
        super(props);
        this.isLoggedIn = this.isLoggedIn.bind(this);
    }

    isLoggedIn () {
        const {auth} = this.props;
        return !!auth.account && !!auth.password && !!auth.username;
    }

    render () {
        const {
            component: ChildComponent,
            name,
            path
        } = this.props;
        if (this.isLoggedIn()) {
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
