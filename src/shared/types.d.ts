// static files declarations

declare module "*.jpg";
declare module "*.png";
declare module "*.gif";
declare module "*.svg";

/** Indicates we are in a server (node) environment. Injected via webpack's DefinePlugin. */
declare const __SERVER__: boolean;

/** Indicates we are in a production build. Injected via webpack's DefinePlugin. */
declare const __PRODUCTION__: boolean;

// server environment vars
declare namespace NodeJS {
    interface Process {
        env: {
            /** The port the server will be listening to. */
            PORT?: number | string;
            /** Absolute path to the public directory where static the files will be served */
            PUBLIC_DIR_PATH?: string;
            /** Absolute path to the html template file witch will be used by the react ssr */
            HTML_TEMPLATE_PATH: string;
        }
    }
}

