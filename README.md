# Patrick McElhaney's Coding Exercise (higram)

## Installation

You should have Node.js installed.

```sh
npm install -g /path/to/directory/containing/this/readme/file
```

(Normally installation would just be `npm install higram`, but this package is not published to npm and you most likely have the code on your local machine.)

## Usage

Call higram and pass it a text file.

```sh
higram message.txt
```

Or pipe a stream into STDIN.

```sh
curl http://norvig.com/big.txt | higram
```

### Example

```sh
$ echo "The quick brown fox and the quick blue hare." | higram
2 the quick
1 quick brown
1 brown fox
1 fox and
1 and the
1 quick blue
1 blue hare
```

The output uses the same format as UNIX's [`uniq -c`](https://en.wikipedia.org/wiki/Uniq).

## Development

To run the tests:

```sh
npm test # run the tests once
npm run tdd # run the tests continuously while developing
```
See also [CONTRIBUTING.md](./CONTRIBUTING.md).

## Assumptions

- The input is ASCII text.
- The input is case-insenstiive ("The quick" matches "the quick").
- A word consists of letters, numbers, and hyphen (-). Anything else is a delimiter.
- Consecutive delimiters are collapsed to one ("the quick" matches "the      quick").
- Two consecutive words always make a higram, even if they cross a boundary such as a sentence or paragraph. 
