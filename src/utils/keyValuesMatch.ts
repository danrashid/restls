interface IWhere {
  [key: string]: any;
}

export const keyValuesMatch = (where: IWhere, negate = false) => (
  member: Object
): Boolean => {
  const result = Object.keys(where).every(
    prop =>
      prop.split(".").reduce((a: IWhere, b: string) => a[b], member) ===
      where[prop]
  );
  return negate ? !result : result;
};
