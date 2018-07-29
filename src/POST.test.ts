import { POST } from "./POST";

beforeEach(() => {
  console.info = jest.fn();
});

afterEach(() => {
  window.localStorage.clear();
});

it("Adds a new member to a collection with a uuid", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([{ id: "foo", name: "foo", index: 0 }])
  );
  await POST("foo", { name: "bar", index: 1 });
  const collection = JSON.parse(window.localStorage.getItem("foo"));
  expect(collection[0]).toEqual({ id: "foo", name: "foo", index: 0 });
  expect(collection[1].id.length).toBe(36);
  expect(collection[1].name).toBe("bar");
  expect(collection[1].index).toBe(1);
});

it("Supports a custom id generator", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([{ id: "foo", name: "foo", index: 0 }])
  );
  await POST(
    "foo",
    { name: "bar", index: 1 },
    undefined,
    undefined,
    () => "bar"
  );
  const collection = JSON.parse(window.localStorage.getItem("foo"));
  expect(collection[1].id).toBe("bar");
});

it("Resolves with the new member, with an id", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([{ id: "foo", name: "foo", index: 0 }])
  );
  await expect(
    POST("foo", { name: "bar", index: 1 }, undefined, undefined, () => "bar")
  ).resolves.toEqual({ data: { id: "bar", name: "bar", index: 1 } });
});

it("Rejects with an error if the specified collection was not found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  await expect(POST("bar", { id: "foo" })).rejects.toThrow();
});

it("Outputs debugging information if specified", () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  const key = "foo";
  const body = { id: "foo", index: 0 };
  POST(key, body, true);
  expect(console.info).toHaveBeenCalledWith("POST", {
    key,
    body
  });
});

it("Supports faking latency with a timeout", async () => {
  jest.useFakeTimers();
  window.localStorage.setItem(
    "foo",
    JSON.stringify([{ id: "foo", name: "foo", index: 0 }])
  );
  const promise = POST("foo", { name: "bar", index: 1 }, undefined, 10000);
  jest.advanceTimersByTime(10000);
  await expect(promise).resolves.toHaveProperty("data");
  jest.useRealTimers();
});
