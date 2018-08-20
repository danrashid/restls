[![Build Status](https://travis-ci.org/danrashid/restls.svg?branch=master)](https://travis-ci.org/danrashid/restls) [![Coverage Status](https://coveralls.io/repos/github/danrashid/restls/badge.svg?branch=master)](https://coveralls.io/github/danrashid/restls?branch=master)

# restls

### A REST-like interface for localStorage

`restls` is designed as a temporary replacement for actual API calls through XHR libraries like [axios](https://github.com/axios/axios). It’s most useful while developing single-page applications in isolation.

#### Complete example with live demo

[https://github.com/danrashid/restls-demo](https://github.com/danrashid/restls-demo)

#### Installation

`yarn add restls`

#### Rundown

Data is seeded by giving `setCollection` a key for localStorage (i.e. entity name), and `Array<T>`.

The following fake HTTP methods are supported:

- `GET` will accept an id (singular response), a filter function (plural response), or nothing at all (plural response with the whole collection)
- `POST` generates `{id: [UUIDv4], ...body}` by default, but will accept an id generator that returns a string or number
- `PUT` expects an id and body
- `PATCH` expects an id and a partial body
- `DELETE` will accept an id or a filter function (plural operation, useful for cascading deletes of child entities)

All return a Promise that resolves with `{ data: T | Array<T> | {} }`, or rejects with an error.

Where an id is expected, it can be a string or a number and must be unique to that collection.

For more information, see the [test specs](https://www.danrashid.com/restls/test/) and [generated docs](https://www.danrashid.com/restls/typedoc/).

Better yet, try it out with a TypeScript-aware editor like [Visual Studio Code](https://code.visualstudio.com/).

#### Usage example

1\. Seed some data

```
setCollection("books", [
  {
    id: "b04ef13e-41bc-458c-abdd-7b1ae4bbece3",
    title: "Redburn: His First Voyage",
    author: "Herman Melville"
  },
  {
    id: "21c9ca51-089b-4816-90a0-56a1cc6534c1",
    title: "The Narrative of Arthur Gordon Pym of Nantucket",
    author: "Edgar Allan Poe"
  },
  {
    id: "327d1c1b-2c48-4e21-8d5d-493c3de9071a",
    title: "Moby-Dick; or, The Whale",
    author: "Herman Melville"
  }
]);
```

2\. Fetch some data

```
GETS("books", ({ author }) => author === "Herman Melville");
```

3\. Receive a Promise that resolves with:

```
{
  data: [
    {
      id: "b04ef13e-41bc-458c-abdd-7b1ae4bbece3",
      title: "Redburn: His First Voyage",
      author: "Herman Melville"
    },
    {
      id: "327d1c1b-2c48-4e21-8d5d-493c3de9071a",
      title: "Moby-Dick; or, The Whale",
      author: "Herman Melville"
    }
  ]
}
```

#### Why are the function names in all-caps?

A couple reasons:

1.  Names in all-caps kinda align with the HTTP spec.
2.  (The real reason) `delete` is a (case-sensitive) reserved word and I thought any other word would be confusing.

### Dev commands

#### Compile as I change source files

`yarn watch`

#### Run tests as I change them

`yarn test --watch`

#### Generate a report about test coverage

`yarn test --coverage`

This generates a truly lovely HTML report in your ./coverage/lcov-report folder.
