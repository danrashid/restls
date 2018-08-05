import { GET } from "./GET";

beforeEach(() => {
  console.info = jest.fn();
});

afterEach(() => {
  window.localStorage.clear();
});

it("Resolves with the first matching member of a collection", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      { id: "bar", index: 0 },
      { id: "foo", index: 1 },
      { id: "foo", index: 2 }
    ])
  );
  await expect(GET("foo", "foo")).resolves.toEqual({
    data: { id: "foo", index: 1 }
  });
});

it("Rejects with an error if no matching member was found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  await expect(GET("foo", "bar")).rejects.toThrow();
});

it("Rejects with an error if the specified collection was not found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  await expect(GET("bar", "bar")).rejects.toThrow();
});

it("Outputs debugging information if specified", () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  const key = "foo";
  const id = "foo";
  GET(key, id, true);
  expect(console.info).toHaveBeenCalledWith("GET", {
    key,
    id
  });
});

it("Supports faking latency with a timeout", async () => {
  jest.useFakeTimers();
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 1 }]));
  const promise = GET("foo", "foo", undefined, 10000);
  jest.advanceTimersByTime(10000);
  await expect(promise).resolves.toHaveProperty("data");
  jest.useRealTimers();
});
