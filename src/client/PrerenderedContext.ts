import { createContext } from "react";

interface PrerenderData {
    data: unknown;
}

export const PrerenderedContext = createContext<Partial<PrerenderData>>({});
