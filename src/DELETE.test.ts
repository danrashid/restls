import { DELETE } from "./DELETE";

jest.useFakeTimers();

afterEach(() => {
  window.localStorage.clear();
});

it("Deletes all matching members of a collection", () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      { id: "foo", index: 0 },
      { id: "foo", index: 1 },
      { id: "bar", index: 2 }
    ])
  );
  DELETE("foo", { id: "foo" });
  expect(window.localStorage.getItem("foo")).toBe(
    JSON.stringify([{ id: "bar", index: 2 }])
  );
});

it("Rejects with an error if no matching member was found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  await expect(DELETE("bar", { id: "foo" })).rejects.toThrow();
});

it("Resolves with an empty object", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  await expect(DELETE("foo", { id: "foo" })).resolves.toBe({ data: {} });
});

it("Rejects with an error if the specified collection was not found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  await expect(DELETE("bar", { id: "foo" })).rejects.toThrow();
});

it("Outputs debugging information if specified", () => {});

it("Supports faking latency with a timeout", () => {});
