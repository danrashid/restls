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
  expect(getCollectionMember("foo", { id: "foo" })).toEqual({
    id: "foo",
    index: 0
  });
});

it("Throws if no matching member was found", done => {
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
  try {
    getCollectionMember("foo", { id: "bar" });
  } catch (e) {
    done();
  }
});
