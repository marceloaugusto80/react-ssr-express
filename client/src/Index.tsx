import React from "react";
import {hydrate} from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";

function WrappedApp(): JSX.Element {
    return (
        <div>
            <BrowserRouter >
                <App/>
            </BrowserRouter>
        </div>
    );
}

hydrate(<WrappedApp/>, document.getElementById("root"));