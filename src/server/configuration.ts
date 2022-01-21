import path from "path";

/*  
    Environment configuration. 
    You can replace or adapt this logic to use .env files 
*/

export const PORT = process.env.PORT ?? 9000;
    
export const PUBLIC_DIR_PATH = process.env.PUBLIC_DIR_PATH ?? path.join(__dirname, "public");
    
export const HTML_TEMPLATE_PATH = process.env.HTML_TEMPLATE_PATH ?? path.join(__dirname, "public", "index.html");
