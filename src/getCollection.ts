import { getItem, parseJSON } from "./utils";

export const getCollection = (key: string, reject: (e: Error) => void) => {
  return parseJSON(getItem(key, reject), reject);
};
