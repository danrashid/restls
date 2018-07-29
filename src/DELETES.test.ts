import { DELETES } from "./DELETES";

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
  await DELETES("foo", { id: "foo" });
  expect(window.localStorage.getItem("foo")).toBe(
    JSON.stringify([{ id: "bar", index: 2 }])
  );
});

it("Changes no data and emits no error if no matching members were found", async () => {
  const collection = JSON.stringify([
    { id: "foo", index: 0 },
    { id: "foo", index: 1 },
    { id: "bar", index: 2 }
  ]);
  window.localStorage.setItem("foo", collection);
  await DELETES("foo", { id: "baz" });
  expect(window.localStorage.getItem("foo")).toBe(collection);
});

it("Resolves with an empty object", async () => {
  window.localStorage.setItem("foo", "[]");
  await expect(DELETES("foo", { id: "foo" })).resolves.toEqual({ data: {} });
});

it("Rejects with an error if the specified collection was not found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  await expect(DELETES("bar", { id: "foo" })).rejects.toThrow();
});

it("Outputs debugging information if specified", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  const key = "foo";
  const where = { id: "foo" };
  DELETES(key, where, true);
  expect(console.info).toHaveBeenCalledWith("DELETES", {
    key,
    where
  });
});

it("Supports faking latency with a timeout", async () => {
  jest.useFakeTimers();
  window.localStorage.setItem("foo", "[]");
  const promise = DELETES("foo", { id: "foo" }, undefined, 10000);
  jest.advanceTimersByTime(10000);
  await expect(promise).resolves.toHaveProperty("data");
  jest.useRealTimers();
});
