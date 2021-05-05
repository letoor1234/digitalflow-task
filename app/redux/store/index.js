import { combineReducers, createStore } from "redux";

import token from "../reducers/auth.js";

const reducers = combineReducers({
    auth: token,
});

export default () => {
    return {
        ...createStore(reducers),
    };
};
