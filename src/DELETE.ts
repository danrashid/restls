import { getCollection, setCollection } from ".";
import { getCollectionMember, keyValuesMatch } from "./utils";

export const DELETE = (
  key: string,
  where: Object,
  debug = false,
  timeout = 0
) =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("DELETE", { key, where });
    }
    getCollectionMember(key, where, reject);
    const collection = getCollection(key, reject);
    setCollection(key, collection.filter(keyValuesMatch(where, true)));
    window.setTimeout(
      () =>
        resolve({
          data: {}
        }),
      timeout
    );
  });
