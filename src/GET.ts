import { getCollectionMember } from "./utils";
import { IMember } from "./interfaces/member";
import { IQuery } from "./interfaces/query";

export const GET = <T extends IMember>(
  key: string,
  where: IQuery,
  debug = false,
  timeout = 0
): Promise<{ data: T }> =>
  new Promise((resolve, reject) => {
    if (debug) {
      console.info("GET", { key, where });
    }
    try {
      const data = getCollectionMember(key, where);
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
