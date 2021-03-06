import { PATCH } from "./PATCH";

beforeEach(() => {
  console.info = jest.fn();
});

afterEach(() => {
  window.localStorage.clear();
});

it("Patches a member of a collection by id", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      { id: "foo", name: "Foo", value: 0 },
      { id: "bar", name: "Bar", value: 1 }
    ])
  );
  await PATCH("foo", { id: "foo", name: "Baz" });
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
  await expect(PATCH("foo", { id: "bar", name: "Bar" })).rejects.toThrow();
});

it("Resolves with an empty object", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([{ id: "foo", name: "Foo", value: 0 }])
  );
  await expect(PATCH("foo", { id: "foo", name: "Bar" })).resolves.toEqual({
    data: {}
  });
});

it("Rejects with an error if the specified collection was not found", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([{ id: "foo", name: "Foo", value: 0 }])
  );
  await expect(PATCH("bar", { id: "foo", name: "Bar" })).rejects.toThrow();
});

it("Outputs debugging information if specified", () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  const collectionName = "foo";
  const body = { id: "foo", name: "Foo", value: 0 };
  PATCH(collectionName, body, true, 500);
  expect(console.info).toHaveBeenCalledWith("PATCH", {
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
  const promise = PATCH("foo", { id: "foo", name: "Baz" }, undefined, 10000);
  jest.advanceTimersByTime(10000);
  await expect(promise).resolves.toHaveProperty("data");
  jest.useRealTimers();
});

it("Applies fake latency even if rejecting", async () => {
  jest.useFakeTimers();
  window.localStorage.setItem(
    "bar",
    JSON.stringify([{ id: "foo", name: "Foo", value: 0 }])
  );
  const promise = PATCH("foo", { id: "foo", name: "Baz" }, undefined, 10000);
  jest.advanceTimersByTime(10000);
  await expect(promise).rejects.toThrow();
  jest.useRealTimers();
});
