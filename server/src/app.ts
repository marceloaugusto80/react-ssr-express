import { createServer } from "./server";
import path from "path";

const PORT = process.env.PORT ?? 9000;
const PUBLIC_DIR_PATH = path.resolve(__dirname, "public");

const server = createServer(PUBLIC_DIR_PATH);

server.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});