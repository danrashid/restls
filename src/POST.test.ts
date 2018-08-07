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
    JSON.stringify([{ id: "foo", name: "Foo", value: 0 }])
  );
  await POST("foo", { name: "Bar", value: 1 });
  const collection = JSON.parse(window.localStorage.getItem("foo"));
  expect(collection[0]).toEqual({ id: "foo", name: "Foo", value: 0 });
  expect(collection[1].id.length).toBe(36);
  expect(collection[1].name).toBe("Bar");
  expect(collection[1].value).toBe(1);
});

it("Supports a custom id generator", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([{ id: "foo", name: "Foo", value: 0 }])
  );
  await POST(
    "foo",
    { name: "Bar", value: 1 },
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
    JSON.stringify([{ id: "foo", name: "Foo", value: 0 }])
  );
  await expect(
    POST("foo", { name: "Bar", value: 1 }, undefined, undefined, () => "bar")
  ).resolves.toEqual({ data: { id: "bar", name: "Bar", value: 1 } });
});

it("Rejects with an error if the generated id is not unique to the collection", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  await expect(
    POST("foo", {}, undefined, undefined, () => "foo")
  ).rejects.toThrow();
});

it("Rejects with an error if the specified collection was not found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  await expect(POST("bar", {})).rejects.toThrow();
});

it("Outputs debugging information if specified", () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  const key = "foo";
  const body = { value: 0 };
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
    JSON.stringify([{ id: "foo", name: "Foo", value: 0 }])
  );
  const promise = POST("foo", { name: "Bar", value: 1 }, undefined, 10000);
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
  const promise = POST("bar", { name: "Bar", value: 1 }, undefined, 10000);
  jest.advanceTimersByTime(10000);
  await expect(promise).rejects.toThrow();
  jest.useRealTimers();
});
