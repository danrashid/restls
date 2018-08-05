import { setCollection } from "./setCollection";

afterEach(() => {
  window.localStorage.clear();
});

it("Stores a collection by key as JSON", () => {
  const foo = [{ id: "foo" }, { id: "bar" }];
  setCollection("foo", foo);
  expect(window.localStorage.getItem("foo")).toBe(JSON.stringify(foo));
});
