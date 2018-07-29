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
      { id: "foo", name: "foo", index: 0 },
      { id: "bar", name: "bar", index: 1 }
    ])
  );
  await PUT("foo", { id: "foo", name: "baz", index: 0 });
  expect(window.localStorage.getItem("foo")).toBe(
    JSON.stringify([
      { id: "foo", name: "baz", index: 0 },
      { id: "bar", name: "bar", index: 1 }
    ])
  );
});

it("Rejects with an error if no matching member id was found", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([{ id: "foo", name: "foo", index: 0 }])
  );
  await expect(
    PUT("foo", { id: "bar", name: "bar", index: 0 })
  ).rejects.toThrow();
});

it("Resolves with the updated member", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([{ id: "foo", name: "foo", index: 0 }])
  );
  await expect(
    PUT("foo", { id: "foo", name: "bar", index: 0 })
  ).resolves.toEqual({
    data: { id: "foo", name: "bar", index: 0 }
  });
});

it("Rejects with an error if the specified collection was not found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  await expect(
    PUT("bar", { id: "foo", name: "bar", index: 0 })
  ).rejects.toThrow();
});

it("Outputs debugging information if specified", () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  const key = "foo";
  const body = { id: "foo", name: "foo", index: 0 };
  PUT(key, body, true);
  expect(console.info).toHaveBeenCalledWith("PUT", {
    key,
    body
  });
});

it("Supports faking latency with a timeout", async () => {
  jest.useFakeTimers();
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      { id: "foo", name: "foo", index: 0 },
      { id: "bar", name: "bar", index: 1 }
    ])
  );
  const promise = PUT(
    "foo",
    { id: "foo", name: "baz", index: 0 },
    undefined,
    10000
  );
  jest.advanceTimersByTime(10000);
  await expect(promise).resolves.toHaveProperty("data");
  jest.useRealTimers();
});
