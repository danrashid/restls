export const keyValuesMatch = (
  where: { [key: string]: any },
  negate = false
) => (member: Object): Boolean => {
  const result = Object.keys(where).every(
    prop =>
      prop
        .split(".")
        .reduce((a: { [key: string]: any }, b: string) => a[b], member) ===
      where[prop]
  );
  return negate ? !result : result;
};
