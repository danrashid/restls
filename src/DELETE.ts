import { getCollection, setCollection } from ".";
import { getCollectionMember } from "./utils";
import { IMember } from "./interfaces/member";
import { Where } from "./types/where";

export const DELETE = <T extends IMember>(
  collectionName: string,
  where: Where | IMember["id"],
  debug = false,
  timeout = 0
): Promise<{ data: {} }> =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("DELETE", {
        collectionName,
        where: where.toString(),
        timeout
      });
    }
    window.setTimeout(() => {
      try {
        if (typeof where === "function") {
          const collection = getCollection(collectionName);
          setCollection(
            collectionName,
            collection.filter((member: T) => !where(member))
          );
        } else {
          getCollectionMember(
            collectionName,
            where,
            (member, index, collection) =>
              setCollection(collectionName, [
                ...collection.slice(0, index),
                ...collection.slice(index + 1)
              ])
          );
        }
        resolve({
          data: {}
        });
      } catch (e) {
        reject(e);
      }
    }, timeout);
  });
