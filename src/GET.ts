import { getCollectionMember } from "./utils";
import { IMember } from "./interfaces/member";

export const GET = <T extends IMember>(
  key: string,
  id: IMember["id"],
  debug = false,
  timeout = 0
): Promise<{ data: T }> =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("GET", { key, id });
    }
    try {
      const data = getCollectionMember(key, id);
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
