import { getCollectionMember } from "./utils";
import { IMember } from "./interfaces/member";
import { setCollection } from ".";

export const PATCH = (
  key: string,
  body: IMember,
  debug = false,
  timeout = 0
): Promise<{ data: {} }> =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("PATCH", { key, body });
    }
    window.setTimeout(() => {
      try {
        getCollectionMember(key, body.id, (member, index, collection) => {
          collection[index] = { ...member, ...body };
          setCollection(key, collection);
        });
        resolve({ data: {} });
      } catch (e) {
        reject(e);
      }
    }, timeout);
  });
