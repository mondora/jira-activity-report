import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import injectTapEventPlugin from "react-tap-event-plugin";

import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import Root from "./views/Root";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = (
    <BrowserRouter>
        <MuiThemeProvider>
            <Root />
        </MuiThemeProvider>
    </BrowserRouter>
);

ReactDOM.render(App, document.getElementById("root"));
registerServiceWorker();
