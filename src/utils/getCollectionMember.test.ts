import { getCollectionMember } from "./getCollectionMember";

afterEach(() => {
  window.localStorage.clear();
});

it("Returns only the first matching member of a collection", () => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      {
        id: "foo",
        index: 0
      },
      {
        id: "foo",
        index: 1
      }
    ])
  );
  expect(getCollectionMember("foo", { id: "foo" }, () => {})).toEqual({
    id: "foo",
    index: 0
  });
});

it("Rejects with an error if no matching member was found", () => {
  const reject = jest.fn();
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      {
        id: "foo",
        index: 0
      }
    ])
  );
  getCollectionMember("foo", { id: "bar" }, reject);
  expect(reject.mock.calls[0][0] instanceof Error).toBe(true);
});
