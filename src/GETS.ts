import { getCollection } from ".";
import { IMember } from "./interfaces/member";

export const GETS = <T extends IMember>(
  key: string,
  where?: (member: T) => boolean,
  debug = false,
  timeout = 0
): Promise<{ data: Array<T> }> =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("GETS", { key, where });
    }
    window.setTimeout(() => {
      try {
        const collection = getCollection(key);
        const data = where ? collection.filter(where) : collection;
        resolve({
          data
        });
      } catch (e) {
        reject(e);
      }
    }, timeout);
  });
