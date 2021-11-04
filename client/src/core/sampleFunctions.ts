
export interface BrowserProperties {
    location: string;
    windowSize: string;
    browser: string;
}

/**
 * This function access the window object, only available at client side.
 * 
 * Wrap this function in a dynamic import to garantee it will be called only at the client.
 * 
 * If this function runs at server side, you will get an error because theres no window object in node environment.
 * 
 * @returns some browser info.
 */
export function getBrowserInfoDefered(): BrowserProperties {

    console.log("getBrowserInfoDefered called!");

    return {
        location: window.location.pathname,
        windowSize: `${window.innerWidth} x ${window.innerHeight}`,
        browser: window.navigator.userAgent
    };
}


/**
 * Uses a compilation flag to check the runtime environment.
 * @returns some browser info.
 */
export function getBrowserInfoWithFlagCheck(): BrowserProperties {
    
    console.log("getBrowserInfoWithFlagCheck called!");
    
    if(__SERVER__) {
        return {
            browser: "not available...",
            location: "not available...",
            windowSize: "not available..."
        }
    }

    return {
        location: window.location.pathname,
        windowSize: `${window.innerWidth} x ${window.innerHeight}`,
        browser: window.navigator.userAgent
    };

}


/**
 * Checks if the window object is defined to infer the runtime environment.
 * @returns some browser info.
 */
export function getBrowserInfoWithUndefinedChecks(): BrowserProperties {
    
    console.log("getBrowserInfoWithUndefinedChecks called!");

    if(typeof window == "undefined") {
        return {
            browser: "not available",
            location: "not available",
            windowSize: "not available"
        }
    }

    return {
        location: window.location.pathname,
        windowSize: `${window.innerWidth} x ${window.innerHeight}`,
        browser: window.navigator.userAgent
    };

}