declare module "*.jpg";
declare module "*.png";
declare module "*.gif";
declare module "*.svg";

// Variables here are injected via webpack's DefinePlugin.

/** Indicates we are in a server (node) environment. */
declare const __SERVER__: boolean;

/** Indicates we are in a production build */
declare const __PRODUCTION__: boolean;


// server environment vars
declare namespace NodeJS {
    interface Process {
        env: {
            /** The port the server will listen. */
            PORT?: number | string;
            /** Absolute path to the public directory, where static files will be served */
            PUBLIC_DIR?: string;
            /** Absolute path to the html template file witch will be used to the react ssr */
            HTML_TEMPLATE_PATH: string;
        }
    }
}

