import { getCollection, setCollection } from ".";
import { getCollectionMember, keyValuesMatch } from "./utils";
import { IBody } from "./interfaces/body";

export const DELETE = (key: string, where: IBody, debug = false, timeout = 0) =>
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
