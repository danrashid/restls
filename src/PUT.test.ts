import { PUT } from "./PUT";

beforeEach(() => {
  console.info = jest.fn();
});

afterEach(() => {
  window.localStorage.clear();
});

it('Expects a "request body" with an id property', () => {});

it("Updates a member of a collection by id", () => {});

it("Rejects with an error if no matching member was found", () => {});

it("Resolves with the updated member", () => {});

it("Rejects with an error if the specified collection was not found", () => {});

it("Outputs debugging information if specified", () => {});

it("Supports faking latency with a timeout", () => {});
