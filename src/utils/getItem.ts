export const getItem = (key: string) => {
  const json = localStorage.getItem(key);
  if (json) {
    return json;
  } else {
    throw new Error(`"${key}" not found in localStorage`);
  }
};
