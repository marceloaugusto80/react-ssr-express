import path from "path";

export interface ServerConfig {
    port: number | string;
    publicDirPath: string;
    htmlTemplateFilePath: string;
}

/** Environment configuration */
const configuration: ServerConfig = {

    port: process.env.PORT ?? 9000,
    
    publicDirPath: process.env.PUBLIC_DIR ?? path.join(__dirname, "public"),
    
    htmlTemplateFilePath: process.env.HTML_TEMPLATE_PATH ?? path.join(__dirname, "public", "index.html"),

};

export default configuration;