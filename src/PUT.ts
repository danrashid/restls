import { getCollectionMember } from "./utils";
import { IMember } from "./interfaces/member";
import { setCollection } from ".";

export const PUT = <T extends IMember>(
  key: string,
  body: T,
  debug = false,
  timeout = 0
): Promise<{ data: T }> =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("PUT", { key, body });
    }
    try {
      getCollectionMember(key, body.id, (member, index, collection) => {
        collection[index] = body;
        setCollection(key, collection);
      });
      window.setTimeout(
        () =>
          resolve({
            data: body
          }),
        timeout
      );
    } catch (e) {
      reject(e);
    }
  });
