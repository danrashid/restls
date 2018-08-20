import { getCollection } from "..";
import { IMember } from "../interfaces/member";
import { Where } from "../types/where";

export const getCollectionMember = <T extends IMember>(
  collectionName: string,
  where: Where | IMember["id"],
  callback?: (member: T, index: number, collection: Array<T>) => void
) => {
  const collection = getCollection(collectionName);
  const index = collection.findIndex(
    typeof where === "function" ? where : (member: T) => member.id === where
  );
  if (index > -1) {
    const member = collection[index];
    return callback ? callback(member, index, collection) : member;
  } else {
    throw new Error(
      `No member of collection "${collectionName}" was found matching "${where.toString()}".`
    );
  }
};
