export const parseJSON = (json: string, reject: (e: Error) => void) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    reject(e);
  }
};
