import { parseJSON } from "./parseJSON";

it("Parses JSON", () => {
  const data = [
    {
      id: "foo",
      index: 0,
      bar: { baz: { bang: "foo" } }
    },
    {
      id: "bar",
      index: 1
    }
  ];
  expect(parseJSON(JSON.stringify(data), () => {})).toEqual(data);
});

it("Rejects with a parsing error when appropriate", () => {
  const reject = jest.fn();
  parseJSON("<<<", reject);
  expect(reject.mock.calls[0][0] instanceof Error).toBe(true);
});
