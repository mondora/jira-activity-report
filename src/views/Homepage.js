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
import {LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    AreaChart,
    Area
} from "recharts";
import {logout} from "../actions/auth";
import {getBoard} from "../actions/board";
import {getProject} from "../actions/project";
import {getSprint} from "../actions/sprint";
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
        fontSize: 14,
        textAlign: "center"
    },
    drawer: {
        position: "fixed",
        top: 65
    },
    list: {
        textAlign: "left"
    },
    chartContainer: {
        position: "relative",
        top: 75,
        left: 100,
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    }
};

class Homepage extends Component {

    static propTypes = {
        auth: PropTypes.shape({
            // username: PropTypes.string.isRequired,
            // password: PropTypes.string.isRequired
        }).isRequired,
        // board: PropTypes.array.isRequired,
        getBoard: PropTypes.func.isRequired,
        getProject: PropTypes.func.isRequired,
        getSprint: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
        project: PropTypes.array.isRequired,
        sprint: PropTypes.array.isRequired
    }

    constructor (props) {
        super(props);
        this.state = {
            open: true,
            selectedProject: null
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
        this.renderCheckboxProject = this.renderCheckboxProject.bind(this);
        this.renderCheckboxIssue = this.renderCheckboxIssue.bind(this);
    }

    componentWillMount () {
        const {auth: {account, jwt}} = this.props;
        this.props.getProject(account, jwt);
        // this.props.getBoard(account, username, password);
    }

    componentWillReceiveProps (nextProps) {
        const {project} = this.props;
        if (nextProps.project && nextProps.project !== project) {
            this.setState({selectedProject: nextProps.project[0] && nextProps.project[0].id});
        }
    }

    handleLogout () {
        const {auth: {account, cookie}} = this.props;
        this.props.logout(account, cookie);
    }

    openDrawer () {
        this.setState({open: !this.state.open});
    }

    onSelectProject (element) {
        this.setState({
            selectedProject: element.id
        });
        console.log(element.id);
        console.log(element.key);
        console.log(element.name);
    }

    renderCheckboxProject (element) {
        return (
            <ListItem key={element.id}>
                <Checkbox
                    checked={element.id === this.state.selectedProject}
                    iconStyle={styles.checkbox}
                    label={element.name}
                    labelPosition="left"
                    onCheck={this.onSelectProject.bind(this, element)}
                    style={styles.checkBoxLabel}
                />
            </ListItem>
        );
    }

    renderCheckboxIssue (element) {
        return (
            <ListItem key={element.id}>
                <Checkbox
                    iconStyle={styles.checkbox}
                    label={element.fields.customfield_10004}
                    labelPosition="left"
                    style={styles.checkBoxLabel}
                />
            </ListItem>
        );
    }

    render () {
        const {auth, project, sprint} = this.props;
        const sprintIssue = {
            "expand": "schema,names",
            "startAt": 0,
            "maxResults": 50,
            "total": 2,
            "issues": [
                {
                    "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
                    "id": "35003",
                    "self": "https://mondora.atlassian.net/rest/agile/1.0/issue/35003",
                    "key": "JIR-4",
                    "fields": {
                        "issuetype": {
                            "self": "https://mondora.atlassian.net/rest/api/2/issuetype/10001",
                            "id": "10001",
                            "description": "A user story. Created by JIRA Software - do not edit or delete.",
                            "iconUrl": "https://mondora.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10415&avatarType=issuetype",
                            "name": "Story",
                            "subtask": false,
                            "avatarId": 10415
                        },
                        "timespent": null,
                        "sprint": {
                            "id": 206,
                            "self": "https://mondora.atlassian.net/rest/agile/1.0/sprint/206",
                            "state": "active",
                            "name": "JIR Sprint 2",
                            "startDate": "2017-06-08T10:06:39.337+02:00",
                            "endDate": "2017-06-15T10:06:00.000+02:00",
                            "originBoardId": 104,
                            "goal": ""
                        },
                        "project": {
                            "self": "https://mondora.atlassian.net/rest/api/2/project/14000",
                            "id": "14000",
                            "key": "JIR",
                            "name": "jira-activity-report",
                            "avatarUrls": {
                                "48x48": "https://mondora.atlassian.net/secure/projectavatar?pid=14000&avatarId=10205",
                                "24x24": "https://mondora.atlassian.net/secure/projectavatar?size=small&pid=14000&avatarId=10205",
                                "16x16": "https://mondora.atlassian.net/secure/projectavatar?size=xsmall&pid=14000&avatarId=10205",
                                "32x32": "https://mondora.atlassian.net/secure/projectavatar?size=medium&pid=14000&avatarId=10205"
                            },
                            "projectCategory": {
                                "self": "https://mondora.atlassian.net/rest/api/2/projectCategory/10300",
                                "id": "10300",
                                "description": "All projects related to mondora",
                                "name": "mondora"
                            }
                        },
                        "customfield_11000": null,
                        "fixVersions": [],
                        "aggregatetimespent": null,
                        "customfield_11200": null,
                        "resolution": null,
                        "customfield_11401": null,
                        "customfield_11400": null,
                        "customfield_10500": null,
                        "customfield_10900": null,
                        "resolutiondate": null,
                        "workratio": -1,
                        "watches": {
                            "self": "https://mondora.atlassian.net/rest/api/2/issue/JIR-4/watchers",
                            "watchCount": 1,
                            "isWatching": true
                        },
                        "lastViewed": "2017-06-13T09:41:47.018+0200",
                        "created": "2017-05-24T10:39:54.000+0200",
                        "customfield_10020": null,
                        "customfield_10021": null,
                        "epic": null,
                        "customfield_10100": null,
                        "priority": {
                            "self": "https://mondora.atlassian.net/rest/api/2/priority/2",
                            "iconUrl": "https://mondora.atlassian.net/images/icons/priorities/critical.svg",
                            "name": "Silver",
                            "id": "2"
                        },
                        "customfield_10101": null,
                        "customfield_10300": null,
                        "customfield_10102": null,
                        "customfield_10103": null,
                        "labels": [],
                        "customfield_10016": null,
                        "customfield_11501": null,
                        "customfield_10017": null,
                        "customfield_10018": null,
                        "customfield_10019": null,
                        "aggregatetimeoriginalestimate": null,
                        "timeestimate": null,
                        "versions": [],
                        "issuelinks": [],
                        "assignee": {
                            "self": "https://mondora.atlassian.net/rest/api/2/user?username=emanuele.paci",
                            "name": "emanuele.paci",
                            "key": "emanuele.paci",
                            "accountId": "557058:9b5cc429-4e3c-49c1-98a5-06b2aab0829b",
                            "emailAddress": "emanuele.paci@mondora.com",
                            "avatarUrls": {
                                "48x48": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue",
                                "24x24": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
                                "16x16": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
                                "32x32": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue"
                            },
                            "displayName": "Emanuele Paci",
                            "active": true,
                            "timeZone": "Europe/Berlin"
                        },
                        "updated": "2017-06-13T09:41:49.000+0200",
                        "status": {
                            "self": "https://mondora.atlassian.net/rest/api/2/status/3",
                            "description": "This issue is being actively worked on at the moment by the assignee.",
                            "iconUrl": "https://mondora.atlassian.net/images/icons/statuses/inprogress.png",
                            "name": "In Progress",
                            "id": "3",
                            "statusCategory": {
                                "self": "https://mondora.atlassian.net/rest/api/2/statuscategory/4",
                                "id": 4,
                                "key": "indeterminate",
                                "colorName": "yellow",
                                "name": "In Progress"
                            }
                        },
                        "components": [],
                        "timeoriginalestimate": null,
                        "description": "- recuperare da jira tramite query gli sprint\r\n- creare componente grafico per mostrare gli sprint recuperati",
                        "customfield_11100": "{}",
                        "customfield_10012": null,
                        "customfield_11300": null,
                        "customfield_10013": null,
                        "customfield_11500": null,
                        "customfield_10014": null,
                        "timetracking": {},
                        "customfield_10015": null,
                        "customfield_11414": null,
                        "customfield_10005": null,
                        "customfield_10600": [],
                        "customfield_11413": null,
                        "customfield_10007": [
                            "com.atlassian.greenhopper.service.sprint.Sprint@14703c9[id=206,rapidViewId=104,state=ACTIVE,name=JIR Sprint 2,goal=,startDate=2017-06-08T10:06:39.337+02:00,endDate=2017-06-15T10:06:00.000+02:00,completeDate=<null>,sequence=206]"
                        ],
                        "customfield_11416": null,
                        "customfield_11415": null,
                        "customfield_10008": null,
                        "customfield_10800": null,
                        "customfield_10801": null,
                        "customfield_11418": null,
                        "aggregatetimeestimate": null,
                        "attachment": [],
                        "flagged": false,
                        "customfield_11417": null,
                        "summary": "Come utente loggato voglio poter vedere la lista degli sprint a cui ho partecipato",
                        "creator": {
                            "self": "https://mondora.atlassian.net/rest/api/2/user?username=emanuele.paci",
                            "name": "emanuele.paci",
                            "key": "emanuele.paci",
                            "accountId": "557058:9b5cc429-4e3c-49c1-98a5-06b2aab0829b",
                            "emailAddress": "emanuele.paci@mondora.com",
                            "avatarUrls": {
                                "48x48": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue",
                                "24x24": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
                                "16x16": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
                                "32x32": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue"
                            },
                            "displayName": "Emanuele Paci",
                            "active": true,
                            "timeZone": "Europe/Berlin"
                        },
                        "subtasks": [],
                        "reporter": {
                            "self": "https://mondora.atlassian.net/rest/api/2/user?username=emanuele.paci",
                            "name": "emanuele.paci",
                            "key": "emanuele.paci",
                            "accountId": "557058:9b5cc429-4e3c-49c1-98a5-06b2aab0829b",
                            "emailAddress": "emanuele.paci@mondora.com",
                            "avatarUrls": {
                                "48x48": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue",
                                "24x24": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
                                "16x16": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
                                "32x32": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue"
                            },
                            "displayName": "Emanuele Paci",
                            "active": true,
                            "timeZone": "Europe/Berlin"
                        },
                        "customfield_10000": null,
                        "aggregateprogress": {
                            "progress": 0,
                            "total": 0
                        },
                        "customfield_10001": null,
                        "customfield_11410": null,
                        "customfield_10002": null,
                        "customfield_10200": "1|i00riz:",
                        "customfield_11412": null,
                        "customfield_10003": null,
                        "customfield_10004": 13,
                        "customfield_11411": null,
                        "customfield_11403": null,
                        "customfield_11402": null,
                        "environment": null,
                        "customfield_11405": null,
                        "customfield_11404": null,
                        "customfield_11407": null,
                        "customfield_11406": null,
                        "customfield_11409": null,
                        "duedate": null,
                        "customfield_11408": null,
                        "progress": {
                            "progress": 0,
                            "total": 0
                        },
                        "comment": {
                            "comments": [
                                {
                                    "self": "https://mondora.atlassian.net/rest/api/2/issue/35003/comment/27100",
                                    "id": "27100",
                                    "author": {
                                        "self": "https://mondora.atlassian.net/rest/api/2/user?username=emanuele.paci",
                                        "name": "emanuele.paci",
                                        "key": "emanuele.paci",
                                        "accountId": "557058:9b5cc429-4e3c-49c1-98a5-06b2aab0829b",
                                        "emailAddress": "emanuele.paci@mondora.com",
                                        "avatarUrls": {
                                            "48x48": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue",
                                            "24x24": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
                                            "16x16": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
                                            "32x32": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue"
                                        },
                                        "displayName": "Emanuele Paci",
                                        "active": true,
                                        "timeZone": "Europe/Berlin"
                                    },
                                    "body": "Capire come filtrare in base organizzazione",
                                    "updateAuthor": {
                                        "self": "https://mondora.atlassian.net/rest/api/2/user?username=emanuele.paci",
                                        "name": "emanuele.paci",
                                        "key": "emanuele.paci",
                                        "accountId": "557058:9b5cc429-4e3c-49c1-98a5-06b2aab0829b",
                                        "emailAddress": "emanuele.paci@mondora.com",
                                        "avatarUrls": {
                                            "48x48": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue",
                                            "24x24": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
                                            "16x16": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
                                            "32x32": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue"
                                        },
                                        "displayName": "Emanuele Paci",
                                        "active": true,
                                        "timeZone": "Europe/Berlin"
                                    },
                                    "created": "2017-05-24T10:40:13.363+0200",
                                    "updated": "2017-05-24T10:40:13.363+0200"
                                }
                            ],
                            "maxResults": 1,
                            "total": 1,
                            "startAt": 0
                        },
                        "votes": {
                            "self": "https://mondora.atlassian.net/rest/api/2/issue/JIR-4/votes",
                            "votes": 0,
                            "hasVoted": false
                        },
                        "worklog": {
                            "startAt": 0,
                            "maxResults": 20,
                            "total": 0,
                            "worklogs": []
                        }
                    }
                },
                {
                    "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
                    "id": "35004",
                    "self": "https://mondora.atlassian.net/rest/agile/1.0/issue/35004",
                    "key": "JIR-5",
                    "fields": {
                        "issuetype": {
                            "self": "https://mondora.atlassian.net/rest/api/2/issuetype/10001",
                            "id": "10001",
                            "description": "A user story. Created by JIRA Software - do not edit or delete.",
                            "iconUrl": "https://mondora.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10415&avatarType=issuetype",
                            "name": "Story",
                            "subtask": false,
                            "avatarId": 10415
                        },
                        "timespent": null,
                        "sprint": {
                            "id": 206,
                            "self": "https://mondora.atlassian.net/rest/agile/1.0/sprint/206",
                            "state": "active",
                            "name": "JIR Sprint 2",
                            "startDate": "2017-06-08T10:06:39.337+02:00",
                            "endDate": "2017-06-15T10:06:00.000+02:00",
                            "originBoardId": 104,
                            "goal": ""
                        },
                        "project": {
                            "self": "https://mondora.atlassian.net/rest/api/2/project/14000",
                            "id": "14000",
                            "key": "JIR",
                            "name": "jira-activity-report",
                            "avatarUrls": {
                                "48x48": "https://mondora.atlassian.net/secure/projectavatar?pid=14000&avatarId=10205",
                                "24x24": "https://mondora.atlassian.net/secure/projectavatar?size=small&pid=14000&avatarId=10205",
                                "16x16": "https://mondora.atlassian.net/secure/projectavatar?size=xsmall&pid=14000&avatarId=10205",
                                "32x32": "https://mondora.atlassian.net/secure/projectavatar?size=medium&pid=14000&avatarId=10205"
                            },
                            "projectCategory": {
                                "self": "https://mondora.atlassian.net/rest/api/2/projectCategory/10300",
                                "id": "10300",
                                "description": "All projects related to mondora",
                                "name": "mondora"
                            }
                        },
                        "customfield_11000": null,
                        "fixVersions": [],
                        "aggregatetimespent": null,
                        "customfield_11200": null,
                        "resolution": null,
                        "customfield_11401": null,
                        "customfield_11400": null,
                        "customfield_10500": null,
                        "customfield_10900": null,
                        "resolutiondate": null,
                        "workratio": -1,
                        "watches": {
                            "self": "https://mondora.atlassian.net/rest/api/2/issue/JIR-5/watchers",
                            "watchCount": 1,
                            "isWatching": true
                        },
                        "lastViewed": null,
                        "created": "2017-05-24T10:40:52.000+0200",
                        "customfield_10020": null,
                        "customfield_10021": null,
                        "epic": null,
                        "priority": {
                            "self": "https://mondora.atlassian.net/rest/api/2/priority/2",
                            "iconUrl": "https://mondora.atlassian.net/images/icons/priorities/critical.svg",
                            "name": "Silver",
                            "id": "2"
                        },
                        "customfield_10100": null,
                        "customfield_10101": null,
                        "customfield_10300": null,
                        "customfield_10102": null,
                        "labels": [],
                        "customfield_10103": null,
                        "customfield_10016": null,
                        "customfield_10017": null,
                        "customfield_11501": null,
                        "customfield_10018": null,
                        "customfield_10019": null,
                        "timeestimate": null,
                        "aggregatetimeoriginalestimate": null,
                        "versions": [],
                        "issuelinks": [],
                        "assignee": null,
                        "updated": "2017-06-08T10:06:08.000+0200",
                        "status": {
                            "self": "https://mondora.atlassian.net/rest/api/2/status/10000",
                            "description": "",
                            "iconUrl": "https://mondora.atlassian.net/images/icons/subtask.gif",
                            "name": "To Do",
                            "id": "10000",
                            "statusCategory": {
                                "self": "https://mondora.atlassian.net/rest/api/2/statuscategory/2",
                                "id": 2,
                                "key": "new",
                                "colorName": "blue-gray",
                                "name": "To Do"
                            }
                        },
                        "components": [],
                        "timeoriginalestimate": null,
                        "description": null,
                        "customfield_11100": "{}",
                        "customfield_10012": null,
                        "customfield_11300": null,
                        "customfield_10013": null,
                        "customfield_10014": null,
                        "customfield_11500": null,
                        "customfield_10015": null,
                        "timetracking": {},
                        "customfield_11414": null,
                        "customfield_10005": null,
                        "customfield_11413": null,
                        "customfield_10600": [],
                        "customfield_10007": [
                            "com.atlassian.greenhopper.service.sprint.Sprint@14703c9[id=206,rapidViewId=104,state=ACTIVE,name=JIR Sprint 2,goal=,startDate=2017-06-08T10:06:39.337+02:00,endDate=2017-06-15T10:06:00.000+02:00,completeDate=<null>,sequence=206]"
                        ],
                        "customfield_11416": null,
                        "customfield_11415": null,
                        "customfield_10800": null,
                        "customfield_10008": null,
                        "customfield_10801": null,
                        "attachment": [],
                        "customfield_11418": null,
                        "aggregatetimeestimate": null,
                        "flagged": false,
                        "customfield_11417": null,
                        "summary": "Come utente voglio poter scegliere quali sprint visualizzare ",
                        "creator": {
                            "self": "https://mondora.atlassian.net/rest/api/2/user?username=emanuele.paci",
                            "name": "emanuele.paci",
                            "key": "emanuele.paci",
                            "accountId": "557058:9b5cc429-4e3c-49c1-98a5-06b2aab0829b",
                            "emailAddress": "emanuele.paci@mondora.com",
                            "avatarUrls": {
                                "48x48": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue",
                                "24x24": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
                                "16x16": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
                                "32x32": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue"
                            },
                            "displayName": "Emanuele Paci",
                            "active": true,
                            "timeZone": "Europe/Berlin"
                        },
                        "subtasks": [],
                        "reporter": {
                            "self": "https://mondora.atlassian.net/rest/api/2/user?username=emanuele.paci",
                            "name": "emanuele.paci",
                            "key": "emanuele.paci",
                            "accountId": "557058:9b5cc429-4e3c-49c1-98a5-06b2aab0829b",
                            "emailAddress": "emanuele.paci@mondora.com",
                            "avatarUrls": {
                                "48x48": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue",
                                "24x24": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
                                "16x16": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
                                "32x32": "https://avatar-cdn.atlassian.com/6a68675ec63057e594eebdd2ba5f4f5b?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F6a68675ec63057e594eebdd2ba5f4f5b%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue"
                            },
                            "displayName": "Emanuele Paci",
                            "active": true,
                            "timeZone": "Europe/Berlin"
                        },
                        "customfield_10000": null,
                        "aggregateprogress": {
                            "progress": 0,
                            "total": 0
                        },
                        "customfield_10001": null,
                        "customfield_11410": null,
                        "customfield_10200": "1|i00rj7:",
                        "customfield_10002": null,
                        "customfield_11412": null,
                        "customfield_10003": null,
                        "customfield_11411": null,
                        "customfield_10004": 3,
                        "customfield_11403": null,
                        "customfield_11402": null,
                        "environment": null,
                        "customfield_11405": null,
                        "customfield_11404": null,
                        "customfield_11407": null,
                        "customfield_11406": null,
                        "customfield_11409": null,
                        "duedate": null,
                        "customfield_11408": null,
                        "progress": {
                            "progress": 0,
                            "total": 0
                        },
                        "comment": {
                            "comments": [],
                            "maxResults": 0,
                            "total": 0,
                            "startAt": 0
                        },
                        "votes": {
                            "self": "https://mondora.atlassian.net/rest/api/2/issue/JIR-5/votes",
                            "votes": 0,
                            "hasVoted": false
                        },
                        "worklog": {
                            "startAt": 0,
                            "maxResults": 20,
                            "total": 0,
                            "worklogs": []
                        }
                    }
                }
            ]
        };
        const sprintData = {
            "maxResults": 50,
            "startAt": 0,
            "isLast": true,
            "values": [
                {
                    "id": 200,
                    "self": "https://mondora.atlassian.net/rest/agile/1.0/sprint/200",
                    "state": "closed",
                    "name": "JIR Sprint 1",
                    "startDate": "2017-05-24T11:17:42.314+02:00",
                    "endDate": "2017-06-01T10:30:00.000+02:00",
                    "completeDate": "2017-06-08T10:04:23.429+02:00",
                    "originBoardId": 104,
                    "goal": ""
                },
                {
                    "id": 206,
                    "self": "https://mondora.atlassian.net/rest/agile/1.0/sprint/206",
                    "state": "active",
                    "name": "JIR Sprint 2",
                    "startDate": "2017-06-08T10:06:39.337+02:00",
                    "endDate": "2017-06-15T10:06:00.000+02:00",
                    "originBoardId": 104,
                    "goal": ""
                }
            ]
        };
        const dataArea = [
            {name: "Sprint 1", uv: 4000, pv: 2400, amt: 2400},
            {name: "Sprint 2", uv: 3000, pv: 1398, amt: 2210},
            {name: "Sprint 3", uv: 2000, pv: 9800, amt: 2290},
            {name: "Sprint 4", uv: 2780, pv: 3908, amt: 2000},
            {name: "Sprint 5", uv: 1890, pv: 4800, amt: 2181},
            {name: "Sprint 6", uv: 2390, pv: 3800, amt: 2500},
            {name: "Sprint 7", uv: 3490, pv: 4300, amt: 2100}
        ];
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
                                <MenuItem onTouchTap={this.handleLogout} primaryText="Sign Out" />
                            </IconMenu>
                        </div>
                    }
                    onLeftIconButtonTouchTap={this.openDrawer}
                    style={styles.appBar}
                    title="Jira Activity Report"
                />
                <Drawer containerStyle={styles.drawer} open={this.state.open}>
                    <List>
                        <ListItem
                            disabled={true}
                            key={1}
                            nestedItems={project.map(this.renderCheckboxProject)}
                            primaryText="Projects"
                            style={styles.list}
                        />
                        <Divider />
                        <ListItem
                            disabled={true}
                            key={2}
                            nestedItems={sprintData.values.map(this.renderCheckboxProject)}
                            primaryText="Sprints"
                            style={styles.list}
                        />
                        <Divider />
                        <ListItem
                            disabled={true}
                            key={3}
                            nestedItems={sprint.map(this.renderCheckboxProject)}
                            primaryText="Users"
                            style={styles.list}
                        />
                        <Divider />
                        <ListItem
                            disabled={true}
                            key={4}
                            nestedItems={sprintIssue.issues.map(this.renderCheckboxIssue)}
                            primaryText="Epics"
                            style={styles.list}
                        />
                        <Divider />
                        <ListItem
                            disabled={true}
                            key={5}
                            nestedItems={sprint.map(this.renderCheckboxProject)}
                            primaryText="Stories"
                            style={styles.list}
                        />
                    </List>
                </Drawer>
                <div id="chart-container" style={styles.chartContainer}>
                    <LineChart data={dataArea} height={300} margin={{top: 5, right: 20, bottom: 5, left: 0}} width={600} >
                        <Line dataKey="uv" stroke="#8884d8" type="monotone" />
                        <Line dataKey="pv" stroke="#82ca9d" type="monotone" />
                        <Line dataKey="amt" stroke="#ffc658" type="monotone" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                    <AreaChart data={dataArea} height={400} margin={{top: 10, right: 30, left: 0, bottom: 0}} width={600} >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area dataKey="uv" fill="#8884d8" stackId="1" stroke="#8884d8" type="monotone" />
                        <Area dataKey="pv" fill="#82ca9d" stackId="1" stroke="#82ca9d" type="monotone" />
                        <Area dataKey="amt" fill="#ffc658" stackId="1" stroke="#ffc658" type="monotone" />
                    </AreaChart>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        auth: state.auth,
        board: state.board,
        project: state.project,
        sprint: state.sprint
    };
}
function mapDispatchToProps (dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch),
        getBoard: bindActionCreators(getBoard, dispatch),
        getProject: bindActionCreators(getProject, dispatch),
        getSprint: bindActionCreators(getSprint, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
