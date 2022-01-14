import { Express } from "express";
import { ExampleModel } from "shared/models";
import { renderReactAsync } from "../ssr/renderReact";

export function useRouting(app: Express) {

    app.get("/sample-page-1", async (req, res) => {

        const model: ExampleModel = {
            id: 123,
            message: "This data came from the server"
        };

        const html = await renderReactAsync(req.url, model);

        return res.status(200).contentType("text/html").send(html);

    });

    /**
     * put other routes here like:
     * 
     * app.post("/foobar", (req, res) => {
     *      
     *     ...stuff
     * 
     * })
     * 
     */

}