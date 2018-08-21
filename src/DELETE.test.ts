import { DELETE } from "./DELETE";
import { IMember } from "./interfaces/member";

beforeEach(() => {
  console.info = jest.fn();
});

afterEach(() => {
  window.localStorage.clear();
});

it("Deletes all matching members of a collection if a filter method was specified", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      { id: "foo", value: 0 },
      { id: "bar", value: 0 },
      { id: "baz", value: 2 }
    ])
  );
  await DELETE<{ id: string; value: number }>(
    "foo",
    ({ value }: IMember) => value === 0
  );
  expect(window.localStorage.getItem("foo")).toBe(
    JSON.stringify([{ id: "baz", value: 2 }])
  );
});

it("Changes no data and emits no error if a filter method was specified and no matching members were found", async () => {
  const collection = JSON.stringify([
    { id: "foo", value: 0 },
    { id: "bar", value: 1 },
    { id: "baz", value: 2 }
  ]);
  window.localStorage.setItem("foo", collection);
  await DELETE("foo", ({ value }: IMember) => value === 3);
  expect(window.localStorage.getItem("foo")).toBe(collection);
});

it("Deletes the first matching member of a collection for a singular request", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      { id: "foo", value: 0 },
      { id: "bar", value: 1 },
      { id: "baz", value: 2 }
    ])
  );
  await DELETE("foo", "foo");
  expect(window.localStorage.getItem("foo")).toBe(
    JSON.stringify([{ id: "bar", value: 1 }, { id: "baz", value: 2 }])
  );
});

it("Rejects with an error if no matching member was found for a singular request", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  await expect(DELETE("foo", "bar")).rejects.toThrow();
});

it("Resolves with an empty object", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  await expect(DELETE("foo", "foo")).resolves.toEqual({ data: {} });
});

it("Rejects with an error if the specified collection was not found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  await expect(DELETE("bar", "foo")).rejects.toThrow();
});

it("Outputs debugging information if specified", () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  const collectionName = "foo";
  const where = "foo";
  DELETE(collectionName, where, true, 500);
  expect(console.info).toHaveBeenCalledWith("DELETE", {
    collectionName,
    where,
    timeout: 500
  });
});

it("Supports faking latency with a timeout", async () => {
  jest.useFakeTimers();
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  const promise = DELETE("foo", "foo", undefined, 10000);
  jest.advanceTimersByTime(10000);
  await expect(promise).resolves.toHaveProperty("data");
  jest.useRealTimers();
});

it("Applies fake latency even if rejecting", async () => {
  jest.useFakeTimers();
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  const promise = DELETE("bar", "foo", undefined, 10000);
  jest.advanceTimersByTime(10000);
  await expect(promise).rejects.toThrow();
  jest.useRealTimers();
});
