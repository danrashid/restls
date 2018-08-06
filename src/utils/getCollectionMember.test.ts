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
        value: 0
      },
      {
        id: "foo",
        value: 1
      }
    ])
  );
  expect(getCollectionMember("foo", "foo")).toEqual({
    id: "foo",
    value: 0
  });
});

it("Throws if no matching member was found", done => {
  window.localStorage.setItem(
    "foo",
    JSON.stringify([
      {
        id: "foo",
        value: 0
      }
    ])
  );
  try {
    getCollectionMember("foo", "bar");
  } catch (e) {
    done();
  }
});
