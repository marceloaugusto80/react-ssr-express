import { createServer } from "server/server";
import configuration from "server/configuration";

const server = createServer();

server.listen(configuration.port, () => {
    console.log(`Server listening to port ${configuration.port}`);
});