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
      { id: "foo", name: "foo", index: 0 },
      { id: "bar", name: "bar", index: 1 }
    ])
  );
  await PATCH("foo", { id: "foo", name: "baz" });
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
  await expect(PATCH("foo", { id: "bar", name: "bar" })).rejects.toThrow();
});

it("Resolves with an empty object", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([{ id: "foo", name: "foo", index: 0 }])
  );
  await expect(PATCH("foo", { id: "foo", name: "bar" })).resolves.toEqual({
    data: {}
  });
});

it("Rejects with an error if the specified collection was not found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  await expect(PATCH("bar", { id: "foo", name: "bar" })).rejects.toThrow();
});

it("Outputs debugging information if specified", () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  const key = "foo";
  const body = { id: "foo", name: "foo", index: 0 };
  PATCH(key, body, true);
  expect(console.info).toHaveBeenCalledWith("PATCH", {
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
  const promise = PATCH("foo", { id: "foo", name: "baz" }, undefined, 10000);
  jest.advanceTimersByTime(10000);
  await expect(promise).resolves.toHaveProperty("data");
  jest.useRealTimers();
});
