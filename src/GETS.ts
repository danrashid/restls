import { getCollection } from ".";
import { IMember } from "./interfaces/member";
import { IQuery } from "./interfaces/query";
import { keyValuesMatch } from "./utils";

export const GETS = <T extends IMember>(
  key: string,
  where?: IQuery,
  debug = false,
  timeout = 0
): Promise<{ data: Array<T> }> =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("GETS", { key, where });
    }
    try {
      const collection = getCollection(key);
      window.setTimeout(() => {
        const data = where
          ? collection.filter(keyValuesMatch(where))
          : collection;
        resolve({
          data
        });
      }, timeout);
    } catch (e) {
      reject(e);
    }
  });
