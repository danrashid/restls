import { getCollection } from "./getCollection";

afterEach(() => {
  window.localStorage.clear();
});

it("Gets and parses a collection", () => {
  const foo = { foo: "foo", bar: 1, baz: { baz: true } };
  window.localStorage.setItem("foo", JSON.stringify(foo));
  expect(getCollection("foo")).toEqual(foo);
});

it("Throws if the specified collection was not found", done => {
  try {
    getCollection("foo");
  } catch (e) {
    done();
  }
});

it("Throws if the specified collection cannot be parsed", done => {
  window.localStorage.setItem("foo", "<<<");
  try {
    getCollection("foo");
  } catch (e) {
    done();
  }
});
