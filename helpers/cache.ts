import NodeCache from "node-cache";

export const myCache: NodeCache = new NodeCache({
    stdTTL: 86400, //24h
    useClones: true,
    checkperiod: 86400, //24h
    deleteOnExpire: false,
});

