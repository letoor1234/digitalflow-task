import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import storeFn from "./redux/store";
import { Provider } from "react-redux";

const store = storeFn();

render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById("app")
);
