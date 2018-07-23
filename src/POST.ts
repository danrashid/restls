import { getCollection, setCollection } from ".";
import { v4 as uuid } from "uuid";

export const POST = (
  key: string,
  body: Object,
  debug = false,
  timeout = 0,
  idGenerator: () => string | number = uuid
) =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("POST", { key, body });
    }
    const collection = getCollection(key, reject);
    const data = { ...body, id: idGenerator() };
    setCollection(key, [...collection, data]);
    window.setTimeout(
      () =>
        resolve({
          data
        }),
      timeout
    );
  });
