import { getCollectionMember } from "./utils";
import { IMember } from "./interfaces/member";
import { setCollection } from ".";

export const DELETE = (
  key: string,
  id: IMember["id"],
  debug = false,
  timeout = 0
): Promise<{ data: {} }> =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("DELETE", { key, id });
    }
    try {
      getCollectionMember(key, id, (member, index, collection) =>
        setCollection(key, [
          ...collection.slice(0, index),
          ...collection.slice(index + 1)
        ])
      );
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
