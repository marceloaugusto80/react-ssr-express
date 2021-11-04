import express from "express";
import path from "path";
import { renderReactAppAsync } from "./ssr";



const PORT = process.env.PORT ?? 9000;
const PUBLIC_DIR_PATH = path.resolve(__dirname, "public");
const STATIC_HTML_PATH = path.resolve(PUBLIC_DIR_PATH, "index.html");



const app = express();



app.use(express.static(PUBLIC_DIR_PATH, {
    index: false // we don want the static middleware to server index.html
}));



app.get("*", async (req, res)=> {
    
    try {
        
        const ssrContent: string = await renderReactAppAsync(STATIC_HTML_PATH, req.url);
        return res.set("content-type", "text/html").status(200).send(ssrContent);

    } catch (e) {

        const error = e as Error;
        return res.status(500).send(error.stack); // IMPORTANT dont send the stack to the client in production!

    }

});



app.listen(PORT, ()=> {
    console.log(`Server listening to port ${PORT}`);
});