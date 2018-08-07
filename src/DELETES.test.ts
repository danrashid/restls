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
      { id: "foo", value: 0 },
      { id: "bar", value: 0 },
      { id: "baz", value: 2 }
    ])
  );
  await DELETES("foo", ({ value }) => value === 0);
  expect(window.localStorage.getItem("foo")).toBe(
    JSON.stringify([{ id: "baz", value: 2 }])
  );
});

it("Changes no data and emits no error if no matching members were found", async () => {
  const collection = JSON.stringify([
    { id: "foo", value: 0 },
    { id: "bar", value: 1 },
    { id: "baz", value: 2 }
  ]);
  window.localStorage.setItem("foo", collection);
  await DELETES("foo", ({ value }) => value === 3);
  expect(window.localStorage.getItem("foo")).toBe(collection);
});

it("Resolves with an empty object", async () => {
  window.localStorage.setItem("foo", "[]");
  await expect(DELETES("foo", ({ value }) => value === 0)).resolves.toEqual({
    data: {}
  });
});

it("Rejects with an error if the specified collection was not found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  await expect(DELETES("bar", ({ id }) => id === "foo")).rejects.toThrow();
});

it("Outputs debugging information if specified", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  const key = "foo";
  const where = ({ id, value }) => value === 0;
  DELETES(key, where, true);
  expect(console.info).toHaveBeenCalledWith("DELETES", {
    key,
    where
  });
});

it("Supports faking latency with a timeout", async () => {
  jest.useFakeTimers();
  window.localStorage.setItem("foo", "[]");
  const promise = DELETES("foo", ({ id }) => id === "foo", undefined, 10000);
  jest.advanceTimersByTime(10000);
  await expect(promise).resolves.toHaveProperty("data");
  jest.useRealTimers();
});

it("Applies fake latency even if rejecting", async () => {
  jest.useFakeTimers();
  window.localStorage.setItem("foo", "[]");
  const promise = DELETES("bar", ({ id }) => id === "foo", undefined, 10000);
  jest.advanceTimersByTime(10000);
  await expect(promise).rejects.toThrow();
  jest.useRealTimers();
});
