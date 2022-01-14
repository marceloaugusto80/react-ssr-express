import { NextFunction, Request, Response } from "express";
import { renderReactAsync } from "server/ssr/renderReactAsync";

/**
 * Creates a React Server Side Rendering middleware. 
 * 
 * Install it right after the static files middleware.
 * 
 * @returns The react SSR middleware function.
 */
export function reactMiddleware() {

    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            // TODO some caching, maybe?
            const reactHtml = await renderReactAsync(req.url)
            res.set("content-type", "text/html").status(200).send(reactHtml);
        }
        catch (error) {
            next(error);
        }
    
    }


}