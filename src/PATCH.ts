import { getCollection, setCollection } from ".";
import { getCollectionMember } from "./utils";

export const PATCH = (
  key: string,
  body: { id: string; [key: string]: any },
  debug = false,
  timeout = 0
) =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("PATCH", { key, body });
    }
    try {
      const collection = getCollection(key);
      getCollectionMember(key, { id: body.id });
      setCollection(
        key,
        collection.map(
          (member: { id: "string" }) =>
            member.id === body.id ? { ...member, ...body } : member
        )
      );
      window.setTimeout(
        () =>
          resolve({
            data: {}
          }),
        timeout
      );
    } catch (e) {
      reject(e);
    }
  });
