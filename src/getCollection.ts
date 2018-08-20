import { getLocalStorageItem } from "./utils";

export const getCollection = (collectionName: string) => {
  const item = getLocalStorageItem(collectionName);
  return JSON.parse(item);
};
