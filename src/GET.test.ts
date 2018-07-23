import { GET } from "./GET";

afterEach(() => {
  window.localStorage.clear();
});

it("Resolves with the first matching member of a collection", () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      { id: "bar", index: 0 },
      { id: "foo", index: 1 },
      { id: "foo", index: 2 }
    ])
  );
  expect(GET("foo", { id: "foo" })).resolves.toBe({
    data: { id: "foo", index: 1 }
  });
});

it("Rejects with an error if no matching member was found", () => {});

it("Rejects with an error if the specified collection was not found", () => {});

it("Outputs debugging information if specified", () => {});

it("Supports faking latency with a timeout", () => {});
