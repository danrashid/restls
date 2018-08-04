import { getCollection } from "..";
import { IQuery } from "../interfaces/query";
import { keyValuesMatch } from ".";

export const getCollectionMember = (key: string, where: IQuery) => {
  const member = getCollection(key).find(keyValuesMatch(where));
  if (member) {
    return member;
  } else {
    throw new Error(
      `No member of "${key}" was found matching ${JSON.stringify(where)}`
    );
  }
};
