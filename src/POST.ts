import { getCollection, setCollection } from ".";
import { IMember } from "./interfaces/member";
import { v4 as uuid } from "uuid";

export const POST = <T extends IMember>(
  collectionName: string,
  body: object,
  debug = false,
  timeout = 0,
  idGenerator: () => IMember["id"] = uuid
): Promise<{ data: T }> =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("POST", { collectionName, body, timeout });
    }
    window.setTimeout(() => {
      try {
        const id = idGenerator();
        const collection = getCollection(collectionName);
        if (collection.some((member: IMember) => member.id === id)) {
          throw new Error(
            `Collection "${collectionName}" already has a member with id "${id}".`
          );
        }
        const data = { ...body, id } as any;
        setCollection(collectionName, [...collection, data]);
        resolve({
          data
        });
      } catch (e) {
        reject(e);
      }
    }, timeout);
  });
