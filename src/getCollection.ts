import { getItem } from "./utils";

export const getCollection = (key: string) => {
  const item = getItem(key);
  return JSON.parse(item);
};
