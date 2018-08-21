import { GET } from "./GET";
import { IMember } from "./interfaces/member";

beforeEach(() => {
  console.info = jest.fn();
});

afterEach(() => {
  window.localStorage.clear();
});

it("Resolves with all matching members of a collection if a filter method was specified", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      { id: "foo", value: 0 },
      { id: "bar", value: 0 },
      { id: "baz", value: 2 }
    ])
  );
  await expect(
    GET<{ id: string; value: number }>(
      "foo",
      ({ value }: IMember) => value === 0
    )
  ).resolves.toEqual({
    data: [{ id: "foo", value: 0 }, { id: "bar", value: 0 }]
  });
});

it("Resolves with an entire collection if no match criteria were specified", async () => {
  const collection = [
    { id: "foo", value: 0 },
    { id: "bar", value: 1 },
    { id: "baz", value: 2 }
  ];
  window.localStorage.setItem("foo", JSON.stringify(collection));
  await expect(GET<{ id: string; value: number }>("foo")).resolves.toEqual({
    data: collection
  });
});

it("Resolves with the first matching member of a collection for a singular request", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      { id: "foo", value: 0 },
      { id: "bar", value: 1 },
      { id: "baz", value: 2 }
    ])
  );
  await expect(GET("foo", "bar")).resolves.toEqual({
    data: { id: "bar", value: 1 }
  });
});

it("Rejects with an error if no matching member was found for a singular request", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  await expect(GET("foo", "bar")).rejects.toThrow();
});

it("Rejects with an error if the specified collection was not found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  await expect(GET("bar", "bar")).rejects.toThrow();
});

it("Outputs debugging information if specified", () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  const collectionName = "foo";
  const where = "foo";
  GET(collectionName, where, true, 500);
  expect(console.info).toHaveBeenCalledWith("GET", {
    collectionName,
    where,
    timeout: 500
  });
});

it("Supports faking latency with a timeout", async () => {
  jest.useFakeTimers();
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 1 }]));
  const promise = GET("foo", "foo", undefined, 10000);
  jest.advanceTimersByTime(10000);
  await expect(promise).resolves.toHaveProperty("data");
  jest.useRealTimers();
});

it("Applies fake latency even if rejecting", async () => {
  jest.useFakeTimers();
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 1 }]));
  const promise = GET("bar", "foo", undefined, 10000);
  jest.advanceTimersByTime(10000);
  await expect(promise).rejects.toThrow();
  jest.useRealTimers();
});
