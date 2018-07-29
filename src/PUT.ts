import { getCollection, setCollection } from ".";
import { getCollectionMember } from "./utils";

export const PUT = (
  key: string,
  body: { id: string; [key: string]: any },
  debug = false,
  timeout = 0
) =>
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
