import express from "express";
import path from "path";
import { errorMiddleware } from "./errorMiddleware";
import { reactMiddleware } from "./reactMiddleware";

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


