import { DELETES } from "./DELETES";

beforeEach(() => {
  console.info = jest.fn();
});

afterEach(() => {
  window.localStorage.clear();
});

it("Deletes all matching members of a collection", () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      { id: "foo", index: 0 },
      { id: "foo", index: 1 },
      { id: "bar", index: 2 }
    ])
  );
  DELETES("foo", { id: "foo" });
  expect(window.localStorage.getItem("foo")).toBe(
    JSON.stringify([{ id: "bar", index: 2 }])
  );
});

it("Changes no data and emits no error if no matching members were found", async () => {});

it("Resolves with an empty object", () => {});

it("Rejects with an error if the specified collection was not found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  await expect(DELETES("bar", { id: "foo" })).rejects.toThrow();
});

it("Outputs debugging information if specified", async () => {
  const key = "foo";
  const where = { id: "foo" };
  DELETES(key, where, true);
  expect(console.info).toHaveBeenCalledWith("DELETES", {
    key,
    where
  });
});

it("Supports faking latency with a timeout", () => {});
