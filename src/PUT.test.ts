import { PUT } from "./PUT";

beforeEach(() => {
  console.info = jest.fn();
});

afterEach(() => {
  window.localStorage.clear();
});

it("Updates a member of a collection by id", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      { id: "foo", name: "Foo", value: 0 },
      { id: "bar", name: "Bar", value: 1 }
    ])
  );
  await PUT("foo", { id: "foo", name: "Baz", value: 0 });
  expect(window.localStorage.getItem("foo")).toBe(
    JSON.stringify([
      { id: "foo", name: "Baz", value: 0 },
      { id: "bar", name: "Bar", value: 1 }
    ])
  );
});

it("Rejects with an error if no matching member id was found", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([{ id: "foo", name: "Foo", value: 0 }])
  );
  await expect(
    PUT("foo", { id: "bar", name: "Bar", value: 0 })
  ).rejects.toThrow();
});

it("Resolves with the updated member", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([{ id: "foo", name: "Foo", value: 0 }])
  );
  await expect(
    PUT("foo", { id: "foo", name: "Bar", value: 0 })
  ).resolves.toEqual({
    data: { id: "foo", name: "Bar", value: 0 }
  });
});

it("Rejects with an error if the specified collection was not found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  await expect(
    PUT("bar", { id: "foo", name: "Bar", value: 0 })
  ).rejects.toThrow();
});

it("Outputs debugging information if specified", () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  const collectionName = "foo";
  const body = { id: "foo", name: "Foo", value: 0 };
  PUT(collectionName, body, true, 500);
  expect(console.info).toHaveBeenCalledWith("PUT", {
    collectionName,
    body,
    timeout: 500
  });
});

it("Supports faking latency with a timeout", async () => {
  jest.useFakeTimers();
  window.localStorage.setItem(
    "foo",
    JSON.stringify([{ id: "foo", name: "Foo", value: 0 }])
  );
  const promise = PUT(
    "foo",
    { id: "foo", name: "Baz", value: 0 },
    undefined,
    10000
  );
  jest.advanceTimersByTime(10000);
  await expect(promise).resolves.toHaveProperty("data");
  jest.useRealTimers();
});

it("Applies fake latency even if rejecting", async () => {
  jest.useFakeTimers();
  window.localStorage.setItem(
    "foo",
    JSON.stringify([{ id: "foo", name: "Foo", value: 0 }])
  );
  const promise = PUT(
    "bar",
    { id: "foo", name: "Baz", value: 0 },
    undefined,
    10000
  );
  jest.advanceTimersByTime(10000);
  await expect(promise).rejects.toThrow();
  jest.useRealTimers();
});
