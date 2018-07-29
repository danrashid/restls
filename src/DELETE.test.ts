import { DELETE } from "./DELETE";

beforeEach(() => {
  console.info = jest.fn();
});

afterEach(() => {
  window.localStorage.clear();
});

it("Deletes all matching members of a collection", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      { id: "foo", index: 0 },
      { id: "foo", index: 1 },
      { id: "bar", index: 2 }
    ])
  );
  await DELETE("foo", { id: "foo" });
  expect(window.localStorage.getItem("foo")).toBe(
    JSON.stringify([{ id: "bar", index: 2 }])
  );
});

it("Rejects with an error if no matching member was found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  await expect(DELETE("foo", { id: "bar" })).rejects.toThrow();
});

it("Resolves with an empty object", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  await expect(DELETE("foo", { id: "foo" })).resolves.toEqual({ data: {} });
});

it("Rejects with an error if the specified collection was not found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  await expect(DELETE("bar", { id: "foo" })).rejects.toThrow();
});

it("Outputs debugging information if specified", () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  const key = "foo";
  const where = { id: "foo" };
  DELETE(key, where, true);
  expect(console.info).toHaveBeenCalledWith("DELETE", {
    key,
    where
  });
});

it("Supports faking latency with a timeout", async () => {
  jest.useFakeTimers();
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      { id: "foo", index: 0 },
      { id: "foo", index: 1 },
      { id: "bar", index: 2 }
    ])
  );
  const promise = DELETE("foo", { id: "foo" }, undefined, 10000);
  jest.advanceTimersByTime(10000);
  await expect(promise).resolves.toHaveProperty("data");
  jest.useRealTimers();
});
