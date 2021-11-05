import express from "express";
import path from "path";
import { renderReactAppAsync } from "./ssr";

export function createServer(publicDirAbsolutePath: string) {
    
    const staticHtmlPath = path.resolve(publicDirAbsolutePath, "index.html");

    const server = express();

    server.use(express.static(publicDirAbsolutePath, {
        // we don want the static middleware to serve index.html. The ssr content won't be serverd otherwise.
        index: false
    }));

    server.get("*", async (req, res) => {

        try {

            const ssrContent: string = await renderReactAppAsync(staticHtmlPath, req.url);
            return res.set("content-type", "text/html").status(200).send(ssrContent);

        } catch (e) { 
            if (!__PRODUCTION__) {
                const error = e as Error;
                return res.status(500).send(error.stack);
            }
            else {
                console.error(e);
            }

        }

    });

    return server;
}


