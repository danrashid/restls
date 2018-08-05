import { IMember } from "./interfaces/member";

export const setCollection = (key: string, value: Array<IMember>) =>
  localStorage.setItem(key, JSON.stringify(value));
