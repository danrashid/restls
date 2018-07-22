import { getCollection, getCollectionMember, setCollection } from "./utils";

export const PUT = (
  key: string,
  body: { id: string },
  debug = false,
  timeout = 0
) =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("PUT", { key, body });
    }
    const collection = getCollection(key, reject);
    getCollectionMember(key, { id: body.id }, reject);
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
  });
