import { keyValuesMatch } from "./keyValuesMatch";

it("Returns true if an object matches on a property", () => {
  expect(keyValuesMatch({ id: "foo" })({ id: "foo", index: 0 })).toBe(true);
});

it("Returns true if an object matches on a nested property", () => {
  expect(
    keyValuesMatch({ "bar.baz.bang": "foo" })({
      id: "foo",
      index: 0,
      bar: { baz: { bang: "foo" } }
    })
  ).toBe(true);
});

it("Returns true if an object matches on a set of properties", () => {
  expect(
    keyValuesMatch({ id: "foo", index: 0 })({ id: "foo", index: 0, bar: "bar" })
  ).toBe(true);
});

it("Returns false if an object doesn't match on a set of properties", () => {
  expect(
    keyValuesMatch({ id: "foo", index: 0, bar: "bar" })({
      id: "foo",
      index: 0,
      bar: "bang"
    })
  ).toBe(false);
});

it("Returns false if an object matches on a set of properties and the negate flag was set", () => {
  expect(keyValuesMatch({ id: "foo" }, true)({ id: "foo", index: 0 })).toBe(
    false
  );
});
