import { getCollection, keyValuesMatch, setCollection } from "./utils";

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
    const collection = getCollection(key, reject);
    setCollection(key, collection.filter(keyValuesMatch(where, true)));
    return new Promise(resolve =>
      window.setTimeout(
        () =>
          resolve({
            data: {}
          }),
        timeout
      )
    );
  });
