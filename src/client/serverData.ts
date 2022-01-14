import { createContext, useContext } from "react";
import { PrerenderData } from "shared/PrerenderedData";

const ServerDataContext = createContext<unknown>(null);

/** Set prerender data as context. */
const ServerDataProvider = ServerDataContext.Provider;

/**
 * Get server prerendered data, if any.
 * @returns The prerendered data if defined. Null otherwise.
 */
const useServerData = <T>() => {
    const contextData = useContext(ServerDataContext);
    if (contextData) return contextData as T;
    
     // beware, using React.StrictMode will render the document twice and the data will be null.
     // Use readFromDom(false) if you're having problems with this hook returning null values.
    const prerenderData =  PrerenderData.readFromDom<T>(true);
    return prerenderData;
}

export { ServerDataProvider, useServerData };