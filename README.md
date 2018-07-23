# restls

A REST-like interface for localStorage

## What do I _really_ need to know about using this?

- reponse.**data** is probably what you care about. `response` is an object with a `data` property.
- DELETES is designed for cascading deletes of related data. Use DELETE for deleting a first-class item.
- Like DELETES, DELETE will delete all matching items (not just one). But unlike DELETES, it will reject with an error if nothing matches.

## Why are the function names in all-caps?

### A couple reasons:

1.  Names in all-caps kinda align with the HTTP spec.
2.  (The real reason) `delete` is a reserved word and I thought any other word would be confusing.

## Dev commands

### Compile as I change source files

`yarn watch`

### Run tests as I change them

`yarn test --watch`

### Generate a report about test coverage

`yarn test --coverage`

This generates a truly lovely HTML report in your ./coverage folder.
