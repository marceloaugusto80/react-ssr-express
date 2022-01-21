declare global {
    interface Window {
        prerenderData: unknown;
    }
}

/**
 * Prerendered data utility function.
 */
namespace PrerenderData {
  
    /**
     * In the server side, saves an abitrary object into the dom. This data can be retrieved in the client.
     * @param data An object or any data you want to pass down to the client.
     * @param domString The html string that will be rendered in the client.
     * @returns A new html tag string containing the injected data.
     */
    export function saveToDom(data: unknown):string {
        
        const jsonDataElement = `<script>window.prerenderData = ${JSON.stringify(data)};</script>`;
        
        return jsonDataElement;
    }

    /**
     * In the client side, reads any arbitrary object injected by the server.
     * @param disposeData True if you want to save some memory and clear the data after reading it. False, otherwise.
     * @returns The data, if any.
     */    
    export function readFromDom<T>(disposeData?: boolean): T | null {
        
        if(typeof window == "undefined" || !window.prerenderData) return null;
        
        const data = window.prerenderData as T;
        
        if(disposeData) window.prerenderData = null;
        
        return data;
    }

}

export { PrerenderData };