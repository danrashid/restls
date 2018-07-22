export const setCollection = (key: string, value: Array<Object> | Object) => {
  localStorage.setItem(key, JSON.stringify(value));
};
