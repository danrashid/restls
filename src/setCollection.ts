import { IMember } from "./interfaces/member";

export const setCollection = (
  collectionName: string,
  value: Array<IMember>
) => {
  if (
    value
      .map(({ id }) => id)
      .every((id, index, ids) => ids.indexOf(id) === index)
  ) {
    localStorage.setItem(collectionName, JSON.stringify(value));
  } else {
    throw new Error(
      `Failed to set collection "${collectionName}" because it contains duplicate IDs.`
    );
  }
};
