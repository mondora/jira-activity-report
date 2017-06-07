import PropTypes from "prop-types";
import {
    AppBar,
    Avatar,
    Checkbox,
    Divider,
    IconButton,
    IconMenu,
    MenuItem,
    Drawer,
    List,
    ListItem
} from "material-ui";
import * as colors from "material-ui/styles/colors";
import React, {Component} from "react";
import {logout} from "../actions/auth";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import logo from "../assets/images/logo.png";

const styles = {
    appContainer: {
        textAlign: "center",
        height: "100vh",
        backgroundColor: colors.grey50,
        alignItems: "center",
        justifyContent: "center"
    },
    appBar: {
        backgroundColor: colors.blue700,
        color: colors.white,
        position: "fixed",
        textAlign: "left",
        top: 0,
        left: 0,
        right: 0,
        width: "auto"
    },
    elementRight: {
        position: "relative"
    },
    usernameField: {
        fontSize: 13,
        position: "absolute",
        top: 15,
        right: 80,
        width: 300,
        textAlign: "right"
    },
    username: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    icon: {
        position: "absolute",
        right: 15,
        cursor: "pointer"
    },
    checkbox: {
        boxColor: colors.grey900,
        fill: colors.greenA700
    },
    checkBoxLabel: {
        padding: 7,
        fontSize: 14
    },
    drawer: {
        position: "fixed",
        top: 65
    },
    list: {
        textAlign: "left"
    }

};

class Homepage extends Component {

    static propTypes = {
        auth: PropTypes.shape({
            username: PropTypes.string.isRequired
        }).isRequired,
        history: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props);
        this.state = {
            open: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
    }

    handleSubmit () {
        this.props.logout();
    }

    openDrawer () {
        this.setState({open: !this.state.open});
    }

    render () {
        const {auth} = this.props;
        return (
            <div style={styles.appContainer}>
                <AppBar
                    iconElementRight={
                        <div style={styles.elementRight}>
                            <div style={styles.usernameField}>
                                <div style={styles.username}>{`Welcome, ${auth.username}`}</div>
                            </div>
                            <IconMenu
                                anchorOrigin={{horizontal: "left", vertical: "top"}}
                                iconButtonElement={<IconButton style={{padding: 0}}><Avatar src={logo} /></IconButton>}
                                style={styles.icon}
                                targetOrigin={{horizontal: "left", vertical: "top"}}
                            >
                                <MenuItem onTouchTap={this.handleSubmit} primaryText="Sign Out" />
                            </IconMenu>
                        </div>
                    }
                    onLeftIconButtonTouchTap={this.openDrawer}
                    style={styles.appBar}
                    title="Jira Activity Report"
                />
                <Drawer
                    containerStyle={styles.drawer}
                    open={this.state.open}
                >
                    <List>
                        <ListItem
                            disabled={true}
                            key={1}
                            nestedItems={[<Checkbox iconStyle={styles.checkbox} key={1} label="Project 1" labelPosition="left" style={styles.checkBoxLabel} />, <Checkbox iconStyle={styles.checkbox} key={2} label="Project 2" labelPosition="left" style={styles.checkBoxLabel} />
                            ]}
                            primaryText="Projects"
                            style={styles.list}
                        />
                        <Divider />
                        <ListItem
                            disabled={true}
                            key={2}
                            nestedItems={[<Checkbox iconStyle={styles.checkbox} key={1} label="Sprint 1" labelPosition="left" style={styles.checkBoxLabel} />, <Checkbox iconStyle={styles.checkbox} key={2} label="Sprint 2" labelPosition="left" style={styles.checkBoxLabel} />
                            ]}
                            primaryText="Sprints"
                            style={styles.list}
                        />
                        <Divider />
                        <ListItem
                            disabled={true}
                            key={3}
                            nestedItems={[<Checkbox iconStyle={styles.checkbox} key={1} label="User 1" labelPosition="left" style={styles.checkBoxLabel} />, <Checkbox iconStyle={styles.checkbox} key={2} label="User 2" labelPosition="left" style={styles.checkBoxLabel} />
                            ]}
                            primaryText="Users"
                            style={styles.list}
                        />
                        <Divider />
                        <ListItem
                            disabled={true}
                            key={4}
                            nestedItems={[<Checkbox iconStyle={styles.checkbox} key={1} label="Epic 1" labelPosition="left" style={styles.checkBoxLabel} />, <Checkbox iconStyle={styles.checkbox} key={2} label="Epic 2" labelPosition="left" style={styles.checkBoxLabel} />
                            ]}
                            primaryText="Epics"
                            style={styles.list}
                        />
                        <Divider />
                        <ListItem
                            disabled={true}
                            key={5}
                            nestedItems={[<Checkbox iconStyle={styles.checkbox} key={1} label="Story 1" labelPosition="left" style={styles.checkBoxLabel} />, <Checkbox iconStyle={styles.checkbox} key={2} label="Story 2" labelPosition="left" style={styles.checkBoxLabel} />
                            ]}
                            primaryText="Stories"
                            style={styles.list}
                        />
                    </List>
                </Drawer>
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
        logout: bindActionCreators(logout, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
