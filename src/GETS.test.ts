import { GETS } from "./GETS";

beforeEach(() => {
  console.info = jest.fn();
});

afterEach(() => {
  window.localStorage.clear();
});

it("Resolves with all matching members of a collection", () => {});

it("Resolves with an entire collection if no match criteria were specified", () => {});

it("Emits no error if no matching members were found", () => {});

it("Rejects with an error if the specified collection was not found", async () => {
  window.localStorage.setItem("foo", JSON.stringify([{ id: "foo", index: 0 }]));
  await expect(GETS("bar", { id: "foo" })).rejects.toThrow();
});

it("Outputs debugging information if specified", async () => {
  const key = "foo";
  const where = { id: "foo" };
  GETS(key, where, true);
  expect(console.info).toHaveBeenCalledWith("GETS", {
    key,
    where
  });
});

it("Supports faking latency with a timeout", () => {});
