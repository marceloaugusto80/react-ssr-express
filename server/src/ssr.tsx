import React from "react";
import App from "client/src/App";
import {renderToString} from "react-dom/server";
import {StaticRouter} from "react-router-dom/server";
import fs from "fs";

/**
 * Renders App component as a string.
 * @param htmlFileAbsolutePath the absolute path of the static html where our app will be rendered into.
 * @returns an string containing the rendered HTML
 */
export async function renderReactAppAsync(htmlFileAbsolutePath: string, requestUrl: string): Promise<string> {
    
    // In SSR, using react-router-dom/BrowserRouter will throw an exception.
    // Instead, we use react-router-dom/server/StaticRouter.
    // In the client side, we still use BrowserRouter (see: client/src/Index.tsx)
    
    const WrappedApp = (
        <StaticRouter location={requestUrl}>
            <App/>
        </StaticRouter>
    );

    // renders the react application as html

    const reactContent = renderToString(WrappedApp);
    
    // read the static html file contents

    const staticHtmlContent = await fs.promises.readFile(htmlFileAbsolutePath, { encoding: "utf-8"});
    
    // finally, concat both the static html content with our react application content
    // this root div is defined in client/src/index.html

    //const renderedHtml = baseHtml.replace(`<div id="root"></div>`, `<div id="root">${reactContent}</div>`);
    const renderedHtml = staticHtmlContent.replace(`<div id="root"></div>`, `<div id="root">${reactContent}</div>`);

    return renderedHtml;
}


