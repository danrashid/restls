import { getItem, parseJSON } from ".";

export const getCollection = (key: string, reject: (e: Error) => void) => {
  return parseJSON(getItem(key, reject), reject);
};
