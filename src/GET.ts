import { getCollectionMember } from "./utils";

export const GET = (key: string, where: Object, debug = false, timeout = 0) =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("GET", { key, where });
    }
    try {
      const data = getCollectionMember(key, where);
      window.setTimeout(() => resolve({ data }), timeout);
    } catch (e) {
      reject(e);
    }
  });
