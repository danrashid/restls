import { setCollection } from "./setCollection";

afterEach(() => {
  window.localStorage.clear();
});

it("Stores an arrayed collection by key as JSON", () => {
  const foo = [{ foo: "foo" }, { bar: "bar" }];
  setCollection("foo", foo);
  expect(window.localStorage.getItem("foo")).toBe(JSON.stringify(foo));
});

it("Stores a mapped collection by key as JSON", () => {
  const foo = { foo: "foo", bar: "bar" };
  setCollection("foo", foo);
  expect(window.localStorage.getItem("foo")).toBe(JSON.stringify(foo));
});
