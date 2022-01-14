import express from "express";
import { errorMiddleware } from "server/middleware/errorMiddleware";
import { reactMiddleware } from "server/middleware/reactMiddleware";
import { useRouting } from "./middleware/routing";

// we split the express app definition in a module separated from the entry point module
// because its easier to parameterize and test.

export function createServer(publicDirAbsolutePath: string) {
    
    const server = express();

    server.use(express.static(publicDirAbsolutePath, {
        index: false // we don want the static middleware to serve index.html. The ssr content won't be serverd otherwise.
    }));

    useRouting(server);

    server.use(/.*/, reactMiddleware());

    server.use(errorMiddleware());

    return server;
}


