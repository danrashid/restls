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
      { id: "bar", index: 0 },
      { id: "foo", index: 1 },
      { id: "foo", index: 2 }
    ])
  );
  await expect(GETS("foo", ({ id }) => id === "foo")).resolves.toEqual({
    data: [{ id: "foo", index: 1 }, { id: "foo", index: 2 }]
  });
});

it("Resolves with an entire collection if no match criteria were specified", async () => {
  const collection = [
    { id: "bar", index: 0 },
    { id: "foo", index: 1 },
    { id: "foo", index: 2 }
  ];
  window.localStorage.setItem("foo", JSON.stringify(collection));
  await expect(GETS("foo")).resolves.toEqual({ data: collection });
});

it("Emits no error if no matching members were found", async () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      { id: "bar", index: 0 },
      { id: "foo", index: 1 },
      { id: "foo", index: 2 }
    ])
  );
  await expect(GETS("foo", ({ id }) => id === "baz")).resolves.toEqual({
    data: []
  });
});

it("Rejects with an error if the specified collection was not found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  await expect(GETS("bar", ({ id }) => id === "foo")).rejects.toThrow();
});

it("Outputs debugging information if specified", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  const key = "foo";
  const where = ({ id }) => id === "foo";
  GETS(key, where, true);
  expect(console.info).toHaveBeenCalledWith("GETS", {
    key,
    where
  });
});

it("Supports faking latency with a timeout", async () => {
  jest.useFakeTimers();
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      { id: "bar", index: 0 },
      { id: "foo", index: 1 },
      { id: "foo", index: 2 }
    ])
  );
  const promise = GETS("foo", ({ id }) => id === "foo", undefined, 10000);
  jest.advanceTimersByTime(10000);
  await expect(promise).resolves.toHaveProperty("data");
  jest.useRealTimers();
});
