import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import Root from "./views/Root";
import store from "./lib/store";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = (
    <Provider store={store}>
        <BrowserRouter>
            <MuiThemeProvider>
                <Root />
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(App, document.getElementById("root"));
registerServiceWorker();
