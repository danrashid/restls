import { GETS } from "./GETS";

beforeEach(() => {
  console.info = jest.fn();
});

afterEach(() => {
  window.localStorage.clear();
});

it("Resolves with all matching members of a collection", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      { id: "foo", value: 0 },
      { id: "bar", value: 0 },
      { id: "baz", value: 2 }
    ])
  );
  await expect(GETS("foo", ({ value }) => value === 0)).resolves.toEqual({
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
  await expect(GETS("foo")).resolves.toEqual({ data: collection });
});

it("Emits no error if no matching members were found", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      { id: "foo", value: 0 },
      { id: "bar", value: 1 },
      { id: "baz", value: 2 }
    ])
  );
  await expect(GETS("foo", ({ value }) => value === 3)).resolves.toEqual({
    data: []
  });
});

it("Rejects with an error if the specified collection was not found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  await expect(GETS("bar", ({ id }) => id === "foo")).rejects.toThrow();
});

it("Outputs debugging information if specified", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  const key = "foo";
  const where = ({ id, value }) => value === 0;
  GETS(key, where, true);
  expect(console.info).toHaveBeenCalledWith("GETS", {
    key,
    where
  });
});

it("Supports faking latency with a timeout", async () => {
  jest.useFakeTimers();
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  const promise = GETS("foo", ({ value }) => value === 0, undefined, 10000);
  jest.advanceTimersByTime(10000);
  await expect(promise).resolves.toHaveProperty("data");
  jest.useRealTimers();
});

it("Applies fake latency even if rejecting", async () => {
  jest.useFakeTimers();
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", value: 0 }]));
  const promise = GETS("bar", ({ value }) => value === 0, undefined, 10000);
  jest.advanceTimersByTime(10000);
  await expect(promise).rejects.toThrow();
  jest.useRealTimers();
});
