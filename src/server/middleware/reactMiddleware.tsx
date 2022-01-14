import { NextFunction, Request, Response } from "express";
import { renderReactAsync } from "server/ssr/renderReact";

/**
 * Options for the react ssr middleware.
 */
interface ReactMiddlewareOptions {
    /**
     * The absolute path for the html file where the rendered react main component will be rendered into. 
     */
    templateHtmlAbsolutePath: string;
}

/**
 * Creates a React Server Side Rendering middleware. 
 * 
 * Install it right after the static files middleware.
 * 
 * @param options options for this middleware.
 * @returns The react SSR middleware function.
 */
export function reactMiddleware(options: ReactMiddlewareOptions) {

    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const reactHtml = await renderReactAsync(req.url, options.templateHtmlAbsolutePath)
            res.set("content-type", "text/html").status(200).send(reactHtml);
        }
        catch (error) {
            next(error);
        }
    
    }


}