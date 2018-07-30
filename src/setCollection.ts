import { IBody } from "./interfaces/body";

export const setCollection = (key: string, value: Array<IBody> | Object) => {
  localStorage.setItem(key, JSON.stringify(value));
};
