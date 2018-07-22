import { getCollection, keyValuesMatch } from ".";

export const getCollectionMember = (
  key: string,
  where: Object,
  reject: (e: Error) => void
) => {
  const member = getCollection(key, reject).find(keyValuesMatch(where));
  if (!member) {
    reject(
      new Error(
        `No member of "${key}" was found matching ${JSON.stringify(where)}`
      )
    );
  } else {
    return member;
  }
};
