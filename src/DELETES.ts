import { getCollection, setCollection } from ".";
import { IMember } from "./interfaces/member";

export const DELETES = <T extends IMember>(
  key: string,
  where: (member: T) => boolean,
  debug = false,
  timeout = 0
): Promise<{ data: {} }> =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("DELETES", { key, where: where.toString() });
    }
    window.setTimeout(() => {
      try {
        const collection = getCollection(key);
        setCollection(key, collection.filter((member: T) => !where(member)));
        resolve({
          data: {}
        });
      } catch (e) {
        reject(e);
      }
    }, timeout);
  });
