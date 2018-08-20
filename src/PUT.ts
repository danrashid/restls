import { getCollectionMember } from "./utils";
import { IMember } from "./interfaces/member";
import { setCollection } from ".";

export const PUT = <T extends IMember>(
  collectionName: string,
  body: T,
  debug = false,
  timeout = 0
): Promise<{ data: T }> =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("PUT", { collectionName, body, timeout });
    }
    window.setTimeout(() => {
      try {
        getCollectionMember(
          collectionName,
          body.id,
          (member, index, collection) => {
            collection[index] = body;
            setCollection(collectionName, collection);
          }
        );
        resolve({
          data: body
        });
      } catch (e) {
        reject(e);
      }
    }, timeout);
  });
