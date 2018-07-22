import { DELETES } from "./DELETES";
import { getCollectionMember } from "./utils";

export const DELETE = (
  key: string,
  where: Object,
  debug = false,
  timeout = 0
) =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("DELETE", { key, where });
    }
    getCollectionMember(key, where, reject);
    return DELETES(key, where, false, timeout);
  });
