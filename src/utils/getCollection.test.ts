import { getCollection } from "./getCollection";

afterEach(() => {
  window.localStorage.clear();
});

it("Gets and parses a collection", () => {
  const foo = { foo: "foo", bar: 1, baz: { baz: true } };
  window.localStorage.setItem("foo", JSON.stringify(foo));
  expect(getCollection("foo", () => {})).toEqual(foo);
});

it("Rejects with an error if the specified collection was not found", () => {
  const reject = jest.fn();
  getCollection("foo", reject);
  expect(reject.mock.calls[0][0] instanceof Error).toBe(true);
});

it("Rejects with an error if the specified collection cannot be parsed", () => {
  window.localStorage.setItem("foo", "foo");
  const reject = jest.fn();
  getCollection("foo", reject);
  expect(reject.mock.calls[0][0] instanceof Error).toBe(true);
});
