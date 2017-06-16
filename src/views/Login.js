import {RaisedButton, TextField, CircularProgress, Dialog} from "material-ui";
import * as colors from "material-ui/styles/colors";
import PropTypes from "prop-types";
import {isEmpty} from "ramda";
import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import logo from "../assets/images/logo.png";
import {login} from "../actions/auth";

const styles = {
    appContainer: {
        textAlign: "center",
        height: "100vh",
        backgroundColor: colors.grey50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        paddingBottom: 50,
        color: colors.grey600,
        fontSize: 35,
        top: "20%"
    },
    loginBox: {
        border: `1px solid ${colors.grey400}`,
        color: colors.grey900,
        margin: "0px auto 30px auto",
        textAlign: "left",
        minHeight: 300,
        maxWidth: 275,
        padding: 15,
        backgroundColor: colors.white,
        fontSize: 15,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative"
    },
    loginButton: {
        position: "absolute",
        bottom: 20,
        width: 175
    },
    dialog: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative"
    },
    progress: {
        background: "transparent",
        color: colors.blue700
    },
    logoContainer: {
        fontSize: 12,
        color: colors.grey600,
        paddingTop: 50
    },
    logo: {
        cursor: "pointer",
        width: 40,
        height: 40
    }
};

class Login extends Component {

    static propTypes = {
        auth: PropTypes.shape({
            isLoggingIn: PropTypes.bool.isRequired,
            isLoggedIn: PropTypes.bool.isRequired
        }).isRequired,
        history: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props);
        this.state = {
            account: "",
            username: "",
            password: "",
            errorAccountMsg: "",
            errorUsernameMsg: "",
            errorPasswordMsg: "",
            unauthorized: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnterKeyPressSubmit = this.handleEnterKeyPressSubmit.bind(this);
        this.handleEnterKeyPressUsername = this.handleEnterKeyPressUsername.bind(this);
        this.handleEnterKeyPressAccount = this.handleEnterKeyPressAccount.bind(this);
        this.handleAccount = this.handleAccount.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
    }

    handleUsername (event) {
        this.setState({username: event.target.value});
        event.preventDefault();
    }

    handleAccount (event) {
        this.setState({account: event.target.value});
        event.preventDefault();
    }

    handlePassword (event) {
        this.setState({password: event.target.value});
        event.preventDefault();
    }
    handleLink () {
        window.open("https://mondora.com/#!/", "_blank");
    }

    handleEnterKeyPressAccount (event) {
        if (event.charCode === 13){
            document.getElementById("username").focus();
        }
    }

    handleEnterKeyPressUsername (event) {
        if (event.charCode === 13){
            document.getElementById("password").focus();
        }
    }

    handleEnterKeyPressSubmit (event) {
        if (event.charCode === 13){
            this.handleSubmit();
        }
    }

    setAccountErrorMessage () {
        this.setState({
            errorAccountMsg: "Account non valido"
        });
    }

    resetAccountErrorMessage () {
        this.setState({
            errorAccountMsg: ""
        });
    }

    setUsernameErrorMessage () {
        this.setState({
            errorUsernameMsg: "Username non valida"
        });
    }

    resetUsernameErrorMessage () {
        this.setState({
            errorUsernameMsg: ""
        });
    }

    setPasswordErrorMessage () {
        this.setState({
            errorPasswordMsg: "Inserire una password"
        });
    }

    resetPasswordErrorMessage () {
        this.setState({
            errorPasswordMsg: ""
        });
    }

    handleSubmit () {
        const {account, password, username} = this.state;
        if (isEmpty(account)){
            this.setAccountErrorMessage();
        } else {
            this.resetAccountErrorMessage();
        }
        if (isEmpty(username)){
            this.setUsernameErrorMessage();
        } else {
            this.resetUsernameErrorMessage();
        }
        if (isEmpty(password)){
            this.setPasswordErrorMessage();
        } else {
            this.resetPasswordErrorMessage();
        }
        if (!isEmpty(account) && !isEmpty(username) && !isEmpty(password)) {
            this.props.login(account, username, password);
        }
    }

    renderSpinner () {
        return (
            <Dialog
                contentStyle={styles.dialog}
                modal={true}
                open={true}
            >
                <CircularProgress color={colors.blue700} size={100} style={styles.progress} thickness={5} />
            </Dialog>
        );
    }
    credentialError () {
        return (
            <Dialog
                contentStyle={styles.dialog}
                open={true}
                title="Utente non autorizzato"
            />
        );
    }
    render () {
        const {auth} = this.props;
        return (
            <div style={styles.appContainer}>
                {auth.isLoggingIn ? this.renderSpinner() : null}
                <div>
                    <div style={styles.title}>
                        {"Jira Activity Report"}
                    </div>
                    <div style={styles.loginBox}>
                        <TextField
                            errorText={this.state.errorAccountMsg}
                            floatingLabelText="Account"
                            hintText="Account"
                            id="account"
                            onChange={this.handleAccount}
                            onKeyPress={this.handleEnterKeyPressAccount}
                            style={{width: "100%"}}
                        />
                        <TextField
                            errorText={this.state.errorUsernameMsg}
                            floatingLabelText="Username"
                            hintText="Username"
                            id="username"
                            onChange={this.handleUsername}
                            onKeyPress={this.handleEnterKeyPressUsername}
                            style={{width: "100%"}}
                        />
                        <TextField
                            errorText={this.state.errorPasswordMsg}
                            floatingLabelText="Password"
                            hintText="Password"
                            id="password"
                            onChange={this.handlePassword}
                            onKeyPress={this.handleEnterKeyPressSubmit}
                            style={{width: "100%"}}
                            type="password"

                        />
                        <RaisedButton
                            backgroundColor={colors.blue700}
                            label="LOGIN"
                            labelColor={colors.white}
                            labelStyle={{height: 80}}
                            onTouchTap={this.handleSubmit}
                            style={styles.loginButton}
                        />
                    </div>
                    <figure style={styles.logoContainer}>
                        <img
                            alt="Logo Mondora"
                            onClick={this.handleLink}
                            src={logo}
                            style={styles.logo}
                        />
                        <figcaption>
                            {":mondora"}
                        </figcaption>
                    </figure>
                </div>
            </div>
        );

    }
}

function mapStateToProps (state) {
    return {
        auth: state.auth
    };
}
function mapDispatchToProps (dispatch) {
    return {
        login: bindActionCreators(login, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
