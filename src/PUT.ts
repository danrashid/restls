import { getCollection, setCollection } from ".";
import { getCollectionMember } from "./utils";
import { IMember } from "./interfaces/member";

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
        if (body.id) {
          getCollectionMember(
            collectionName,
            body.id,
            (member, index, collection) => {
              collection[index] = body;
              setCollection(collectionName, collection);
            }
          );
        } else {
          const collection = getCollection(collectionName);
          setCollection(collectionName, [...collection, body], false);
        }
        resolve({
          data: body
        });
      } catch (e) {
        reject(e);
      }
    }, timeout);
  });
