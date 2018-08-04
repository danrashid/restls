import { getCollection, setCollection } from ".";
import { getCollectionMember, keyValuesMatch } from "./utils";
import { IQuery } from "./interfaces/query";

export const DELETE = (
  key: string,
  where: IQuery,
  debug = false,
  timeout = 0
): Promise<{ data: {} }> =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("DELETE", { key, where });
    }
    try {
      getCollectionMember(key, where);
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
