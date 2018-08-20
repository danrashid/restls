import { getCollectionMember } from "./utils";
import { IMember } from "./interfaces/member";
import { setCollection } from ".";

export const PATCH = (
  collectionName: string,
  body: IMember,
  debug = false,
  timeout = 0
): Promise<{ data: {} }> =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("PATCH", { collectionName, body, timeout });
    }
    window.setTimeout(() => {
      try {
        getCollectionMember(
          collectionName,
          body.id,
          (member, index, collection) => {
            collection[index] = { ...member, ...body };
            setCollection(collectionName, collection);
          }
        );
        resolve({ data: {} });
      } catch (e) {
        reject(e);
      }
    }, timeout);
  });
