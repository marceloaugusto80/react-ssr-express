import React from "react";
import App from "client/App";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import fs from "fs";
import { PrerenderData } from "shared/PrerenderedData";
import configuration from "server/configuration";

/**
 * Renders the react App as a html string.
 * @param url The render url. It will be injected in the react router.
 * @param prerenderedObject An object created in the server that can be accessed in the client side.
 * @returns A html string;
 */
export async function renderReactAsync<T>(url: string, prerenderedObject?: T) {

     // read the html template file

     let staticHtmlContent = await fs.promises.readFile(configuration.htmlTemplateFilePath, { encoding: "utf-8" });

     // inject prerender data into the dom
 
     if (prerenderedObject) {
         staticHtmlContent = PrerenderData.saveToDom(prerenderedObject, staticHtmlContent);
     }


    // In SSR, using react-router-dom/BrowserRouter will throw an exception.
    // Instead, we use react-router-dom/server/StaticRouter.
    // In the client compilation, we still use BrowserRouter (see: src/client/Index.tsx)

    const WrappedApp = (
        <StaticRouter location={url}>
            <App />
        </StaticRouter>
    );

    // renders the react application as a string to inject into the html template.

    const reactContent = renderToString(WrappedApp);

    // finally combine the template html and the react html

    const renderedHtml = staticHtmlContent.replace(`<div id="root"></div>`, `<div id="root">${reactContent}</div>`);

    return renderedHtml;
}