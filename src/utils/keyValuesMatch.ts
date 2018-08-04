import { IQuery } from "../interfaces/query";

export const keyValuesMatch = (where: IQuery, negate = false) => (
  member: Object
): boolean => {
  const result = Object.keys(where).every(
    prop =>
      prop.split(".").reduce((a: IQuery, b: string) => a[b], member) ===
      where[prop]
  );
  return negate ? !result : result;
};
