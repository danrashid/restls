import { getItem } from "./getItem";

afterEach(() => {
  window.localStorage.clear();
});

it("Gets an item out of localStorage by key", () => {
  const foo = JSON.stringify({
    id: "foo",
    index: 0
  });
  window.localStorage.setItem("foo", foo);
  expect(getItem("foo", () => {})).toBe(foo);
});

it("Rejects with an error if no item in localStorage has the specified key", () => {
  const reject = jest.fn();
  const foo = JSON.stringify({
    id: "foo",
    index: 0
  });
  window.localStorage.setItem("foo", foo);
  getItem("bar", reject);
  expect(reject.mock.calls[0][0] instanceof Error).toBe(true);
});
