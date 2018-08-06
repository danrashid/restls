import { IMember } from "./interfaces/member";

export const setCollection = (key: string, value: Array<IMember>) => {
  if (
    value
      .map(({ id }) => id)
      .every((id, index, ids) => ids.indexOf(id) === index)
  ) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    throw new Error(
      `Failed to set collection "${key}" because it contains duplicate IDs.`
    );
  }
};
