export const getItem = (key: string, reject: (e: Error) => void) => {
  const json = localStorage.getItem(key);
  if (json) {
    return json;
  } else {
    reject(new Error(`"${key}" not found in localStorage`));
  }
};
