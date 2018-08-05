import { getCollection } from "..";
import { IMember } from "../interfaces/member";

export const getCollectionMember = <T extends IMember>(
  key: string,
  id: IMember["id"],
  callback?: (member: T, index: number, collection: Array<T>) => void
) => {
  const collection = getCollection(key);
  const index = collection.findIndex((member: T) => member.id === id);
  if (index > -1) {
    const member = collection[index];
    return callback ? callback(member, index, collection) : member;
  } else {
    throw new Error(
      `No member of collection "${key}" was found with id "${id}".`
    );
  }
};
