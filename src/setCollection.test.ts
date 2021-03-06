import { setCollection } from "./setCollection";

afterEach(() => {
  window.localStorage.clear();
});

it("Stores a collection by key as JSON", () => {
  const foo = [{ id: "foo" }, { id: "bar" }];
  setCollection("foo", foo);
  expect(window.localStorage.getItem("foo")).toBe(JSON.stringify(foo));
});

it("Throws if a collection contains duplicate ids", done => {
  const foo = [{ id: "foo" }, { id: "foo" }, { id: "bar" }];
  try {
    setCollection("foo", foo);
  } catch (e) {
    done();
  }
});

it("Supports storing collection members without ids", () => {
  const foo = [{ a: "foo", b: "bar" }, { a: "bar", b: "foo" }];
  setCollection("foo", foo, false);
  expect(window.localStorage.getItem("foo")).toBe(JSON.stringify(foo));
});
