import { getCollection } from ".";
import { getCollectionMember } from "./utils";
import { IMember } from "./interfaces/member";
import { Where } from "./types/where";

export const GET = <T extends IMember>(
  collectionName: string,
  where?: Where | IMember["id"],
  debug = false,
  timeout = 0
): Promise<{ data: Array<T> | T }> =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("GET", { collectionName, where: where.toString(), timeout });
    }
    window.setTimeout(() => {
      try {
        let data;
        if (typeof where === "function" || !where) {
          const collection = getCollection(collectionName);
          data = where ? collection.filter(where) : collection;
        } else {
          data = getCollectionMember(collectionName, where);
        }
        resolve({
          data
        });
      } catch (e) {
        reject(e);
      }
    }, timeout);
  });
