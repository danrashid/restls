import { GET, getCollection, setCollection } from ".";
import { IBody } from "./interfaces/body";
import { v4 as uuid } from "uuid";

export const POST = (
  key: string,
  body: Object,
  debug = false,
  timeout = 0,
  idGenerator: () => IBody["id"] = uuid
) =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("POST", { key, body });
    }
    try {
      const id = idGenerator();
      const collection = getCollection(key);
      if (collection.some((member: IBody) => member.id === id)) {
        throw new Error(
          `Collection "${key}" already has a member with id "${id}"`
        );
      }
      const data = { ...body, id };
      setCollection(key, [...collection, data]);
      window.setTimeout(
        () =>
          resolve({
            data
          }),
        timeout
      );
    } catch (e) {
      reject(e);
    }
  });
