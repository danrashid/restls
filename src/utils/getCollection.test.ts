import { getCollection } from "./getCollection";

it("Gets and parses a collection", () => {
  const foo = { foo: "foo", bar: 1, baz: { baz: true } };
  window.localStorage.setItem("foo", JSON.stringify(foo));
  expect(getCollection("foo", () => {})).toEqual(foo);
});
