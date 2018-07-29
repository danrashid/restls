import { getCollection } from ".";
import { keyValuesMatch } from "./utils";

export const GETS = (key: string, where?: Object, debug = false, timeout = 0) =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("GETS", { key, where });
    }
    try {
      const collection = getCollection(key);
      window.setTimeout(
        () =>
          resolve({
            data: where ? collection.filter(keyValuesMatch(where)) : collection
          }),
        timeout
      );
    } catch (e) {
      reject(e);
    }
  });
