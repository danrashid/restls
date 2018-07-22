import { getCollection, keyValuesMatch } from "./utils";

export const GETS = (
  key: string,
  where: Object | undefined,
  debug = false,
  timeout = 0
) =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("GETS", { key, where });
    }
    const collection = getCollection(key, reject);
    window.setTimeout(
      () =>
        resolve({
          data: where ? collection.filter(keyValuesMatch(where)) : collection
        }),
      timeout
    );
  });
