import express from "express";
import path from "path";
import { errorMiddleware } from "./errorMiddleware";
import { reactMiddleware } from "./reactMiddleware";

// we split the express app definition in a module separated from the entry point module
// because its easier to parameterize and test.

export function createServer(publicDirAbsolutePath: string) {
    
    const server = express();

    server.use(express.static(publicDirAbsolutePath, {
        // we don want the static middleware to serve index.html. The ssr content won't be serverd otherwise.
        index: false
    }));

    server.use(reactMiddleware({
        templateHtmlAbsolutePath: path.resolve(publicDirAbsolutePath, "index.html")
    }));

    server.use(errorMiddleware());

    return server;
}


