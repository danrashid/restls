export const getLocalStorageItem = (collectionName: string) => {
  const json = localStorage.getItem(collectionName);
  if (json) {
    return json;
  } else {
    throw new Error(
      `Collection "${collectionName}" not found in localStorage.`
    );
  }
};
