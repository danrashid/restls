import { GET } from "./GET";

beforeEach(() => {
  console.info = jest.fn();
});

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

it("Rejects with an error if no matching member was found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  await expect(GET("bar", { id: "foo" })).rejects.toThrow();
});

it("Rejects with an error if the specified collection was not found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  await expect(GET("bar", { id: "foo" })).rejects.toThrow();
});

it("Outputs debugging information if specified", () => {
  const key = "foo";
  const where = { id: "foo" };
  GET(key, where, true);
  expect(console.info).toHaveBeenCalledWith("GET", {
    key,
    where
  });
});

it("Supports faking latency with a timeout", () => {});
