import React from "react";
import {hydrate} from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";

function WrappedApp(): JSX.Element {
    return (
        <BrowserRouter >
            <App />
        </BrowserRouter>
    );
}

hydrate(<WrappedApp/>, document.getElementById("root"));