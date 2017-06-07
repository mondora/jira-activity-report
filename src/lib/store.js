import {applyMiddleware, compose, createStore} from "redux";
import {createLogger} from "redux-logger";
import {persistStore, autoRehydrate} from "redux-persist";
import ReduxThunk from "redux-thunk";

import rootReducer from "../reducers";

const middleware = applyMiddleware(
    ReduxThunk,
    createLogger({collapsed: true})
);

const store = compose(
    middleware,
    autoRehydrate()
)(createStore)(rootReducer);

persistStore(store, {whitelist: ["auth"]});

export default store;
