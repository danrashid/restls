# restls

## A REST-like interface for localStorage

## Why are the function names all-caps?

### AKA: why are you shouting at me?! Two reasons:

1.  All-caps function names kinda align with the HTTP spec
2.  (The real reason) `delete` is a reserved word in JavaScript and I thought any other name would be confusing

## Dev commands

### Compile TypeScript to JavaScript as I change files, so I can catch compilation errors right away

`yarn watch`

### Run tests as I change them

`yarn test --watch`

### Generate a report about test coverage

`yarn test --coverage`
