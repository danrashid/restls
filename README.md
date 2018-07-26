# restls

### A REST-like interface for localStorage

`restls` is designed as a temporary replacement for actual API calls through XHR libraries like [axios](https://github.com/axios/axios). It’s most useful while developing single-page applications in isolation.

#### What do I _really_ need to know about using this?

- reponse.**data** is probably what you care about. `response` is an object with a `data` property.
- DELETES is designed for cascading deletes of related data. Use DELETE for deleting a first-class item.
- Like DELETES, DELETE will delete all matching items, _not just one_. But unlike DELETES, DELETE will reject with an error if nothing matches.

#### Why are the function names in all-caps?

A couple reasons:

1.  Names in all-caps kinda align with the HTTP spec
2.  (The real reason) `delete` is a (case-sensitive) reserved word and I thought any other word would be confusing

### Dev commands

#### Compile as I change source files

`yarn watch`

#### Run tests as I change them

`yarn test --watch`

#### Generate a report about test coverage

`yarn test --coverage`

This generates a truly lovely HTML report in your ./coverage folder.
