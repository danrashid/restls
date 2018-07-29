import { getCollection, setCollection } from ".";
import { keyValuesMatch } from "./utils";

export const DELETES = (
  key: string,
  where: Object,
  debug = false,
  timeout = 0
) =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("DELETES", { key, where });
    }
    try {
      const collection = getCollection(key);
      setCollection(key, collection.filter(keyValuesMatch(where, true)));
      window.setTimeout(
        () =>
          resolve({
            data: {}
          }),
        timeout
      );
    } catch (e) {
      reject(e);
    }
  });
