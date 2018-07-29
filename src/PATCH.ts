import { getCollection, setCollection } from ".";
import { getCollectionMember } from "./utils";
import { IBody } from "./interfaces/body";

export const PATCH = (key: string, body: IBody, debug = false, timeout = 0) =>
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
