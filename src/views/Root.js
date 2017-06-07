import PropTypes from "prop-types";
import React, {Component} from "react";
import {connect} from "react-redux";

import Homepage from "./Homepage";
import PrivateRoot from "../components/PrivateRoute";

const styles = {
    container: {
        height: "100%",
        width: "100%"
    }
};

class Root extends Component {

    static propTypes = {
        auth: PropTypes.shape({
            account: PropTypes.string,
            password: PropTypes.string,
            username: PropTypes.string
        }).isRequired
    }

    render () {
        const {auth} = this.props;
        return (
            <div className="v-Root" style={styles.container}>
                <PrivateRoot
                    auth={auth}
                    component={Homepage}
                    exact={true}
                    path="/"
                    strict={false}
                />
            </div>
        );
    }

}

function mapStateToProps (state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Root);
