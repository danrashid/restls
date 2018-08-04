import { getCollection, setCollection } from ".";
import { getCollectionMember } from "./utils";
import { IMember } from "./interfaces/member";

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
      const collection = getCollection(key);
      getCollectionMember(key, { id: body.id });
      setCollection(
        key,
        collection.map(
          (member: { id: "string" }) => (member.id === body.id ? body : member)
        )
      );
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
