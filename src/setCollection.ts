import { IMember } from "./interfaces/member";

export const setCollection = (
  collectionName: string,
  value: Array<IMember>,
  enforceUniqueIds: boolean = true
) => {
  if (
    enforceUniqueIds &&
    !value
      .map(({ id }) => id)
      .every((id, index, ids) => ids.indexOf(id) === index)
  ) {
    throw new Error(
      `Failed to set collection "${collectionName}" because it contains duplicate IDs.`
    );
  } else {
    localStorage.setItem(collectionName, JSON.stringify(value));
  }
};
