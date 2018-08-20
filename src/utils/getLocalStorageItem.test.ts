import { getLocalStorageItem } from "./getLocalStorageItem";

afterEach(() => {
  window.localStorage.clear();
});

it("Gets an item out of localStorage by key", () => {
  const foo = JSON.stringify({
    id: "foo",
    index: 0
  });
  window.localStorage.setItem("foo", foo);
  expect(getLocalStorageItem("foo")).toBe(foo);
});

it("Throws if no item in localStorage has the specified key", done => {
  const foo = JSON.stringify({
    id: "foo",
    index: 0
  });
  window.localStorage.setItem("foo", foo);
  try {
    getLocalStorageItem("bar");
  } catch (e) {
    done();
  }
});
