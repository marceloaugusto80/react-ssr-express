import { createServer } from "server/server";
import { PORT } from "server/configuration";

const server = createServer();

server.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});