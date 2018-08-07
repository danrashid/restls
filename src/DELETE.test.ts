import { DELETE } from "./DELETE";

beforeEach(() => {
  console.info = jest.fn();
});

afterEach(() => {
  window.localStorage.clear();
});

it("Deletes the first matching member of a collection", async () => {
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

it("Rejects with an error if no matching member was found", async () => {
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
  const key = "foo";
  const id = "foo";
  DELETE(key, id, true);
  expect(console.info).toHaveBeenCalledWith("DELETE", {
    key,
    id
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
